#!/usr/bin/env node
// board.mjs — a zero-dependency local web view for a folder-kanban board.
// A card is a markdown file; the folder it sits in is its status. This serves a
// columns view you can read and drag cards in; a drag does `git mv` in a repo,
// else a plain rename. Polls the disk so cards an agent moves show up live.
//
//   node board.mjs [root] [--port 4321]
//
// `root` defaults to ./kanban if it exists, else the current directory. Any
// directory containing recognised column subfolders (todo/doing/done/…) is a
// board; boards can be nested (e.g. kanban/builds/<board>/{todo,doing,done}).

import http from 'node:http';
import { readFileSync, readdirSync, statSync, existsSync, renameSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const args = process.argv.slice(2);
const portFlag = args.indexOf('--port');
const PORT = portFlag !== -1 ? Number(args[portFlag + 1]) : 4321;
const rootArg = args.find((a, i) => !a.startsWith('--') && (i === 0 || args[i - 1] !== '--port'));
const ROOT = path.resolve(rootArg || (existsSync('kanban') ? 'kanban' : '.'));

// Column ordering: known names sort by rank; anything else lands after, alphabetical.
const RANK = { backlog: 0, todo: 1, 'to-do': 1, doing: 2, 'in-progress': 2, wip: 2, review: 3, blocked: 3.5, done: 4, shipped: 4, archive: 5 };
const isColumn = (name) => name in RANK;

const isDir = (p) => { try { return statSync(p).isDirectory(); } catch { return false; } };
const listDirs = (p) => { try { return readdirSync(p).filter((n) => !n.startsWith('.') && isDir(path.join(p, n))); } catch { return []; } };
const listCards = (p) => { try { return readdirSync(p).filter((n) => n.endsWith('.md') && n.toLowerCase() !== 'board.md'); } catch { return []; } };

// Find the git work-tree root above a path, or null.
function gitRoot(start) {
  let dir = start;
  for (;;) {
    if (existsSync(path.join(dir, '.git'))) return dir;
    const up = path.dirname(dir);
    if (up === dir) return null;
    dir = up;
  }
}
const GIT = gitRoot(ROOT);

// A board is any directory that has at least one recognised column subfolder.
// Walk the tree from ROOT (bounded depth) collecting boards.
function findBoards(dir, depth = 0, acc = []) {
  if (depth > 4) return acc;
  const subs = listDirs(dir);
  if (subs.some(isColumn)) {
    acc.push(dir);
    return acc; // don't descend into a board's own columns
  }
  for (const s of subs) findBoards(path.join(dir, s), depth + 1, acc);
  return acc;
}

function parseCard(file) {
  let text = '';
  try { text = readFileSync(file, 'utf8'); } catch { return { title: path.basename(file, '.md'), meta: {} }; }
  const meta = {};
  let body = text;
  const fm = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (fm) {
    for (const line of fm[1].split('\n')) {
      const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (m && m[2].trim()) meta[m[1]] = m[2].trim();
    }
    body = fm[2];
  }
  const h = body.match(/^#\s+(.+)$/m);
  return { title: h ? h[1].trim() : path.basename(file, '.md'), meta };
}

function state() {
  const boards = findBoards(ROOT).map((bdir) => {
    const cols = listDirs(bdir).filter(isColumn)
      .sort((a, b) => (RANK[a] - RANK[b]) || a.localeCompare(b))
      .map((col) => ({
        name: col,
        cards: listCards(path.join(bdir, col)).sort().map((file) => ({
          file, ...parseCard(path.join(bdir, col, file)),
        })),
      }));
    return { name: path.relative(ROOT, bdir) || path.basename(bdir), rel: path.relative(ROOT, bdir), cols };
  }).filter((b) => b.cols.length);
  return { root: ROOT, git: !!GIT, boards };
}

// One path component: alphanumerics + . _ - only, never empty, never . / .. , never dot-prefixed
// (so `.git`, `.env` etc. are unreachable). board may be nested, so it's validated segment-wise.
const SAFE_SEG = /^[A-Za-z0-9._-]+$/;
const safeSeg = (s) => !!s && s !== '.' && s !== '..' && !s.startsWith('.') && SAFE_SEG.test(s);

// Resolve a (boardRel, col, file) to an absolute path, refusing anything outside ROOT,
// any traversal/hidden segment, and anything that isn't a .md card file.
function resolveCard(boardRel, col, file) {
  const boardSegs = String(boardRel).split('/').filter(Boolean);
  if (!boardSegs.every(safeSeg)) throw new Error('bad board name');
  if (!safeSeg(col)) throw new Error('bad column name');
  if (!safeSeg(file) || !file.endsWith('.md')) throw new Error('bad card name');
  const p = path.resolve(ROOT, ...boardSegs, col, file);
  if (p !== ROOT && !p.startsWith(ROOT + path.sep)) throw new Error('outside root');
  return p;
}

function move({ board, file, from, to }) {
  const src = resolveCard(board, from, file);
  const dst = resolveCard(board, to, file);
  if (!listCards(path.dirname(src)).includes(file)) throw new Error('card not found');
  if (existsSync(dst)) throw new Error('a card with that name already exists in the target column');
  if (GIT) {
    try { execFileSync('git', ['-C', GIT, 'mv', src, dst], { stdio: 'pipe' }); return; }
    catch { /* untracked or not a repo move — fall through to rename */ }
  }
  renameSync(src, dst);
}

function cardBody(boardRel, col, file) {
  const p = resolveCard(boardRel, col, file);
  // Only ever serve a file the board actually enumerates as a card (excludes board.md, dotfiles, non-.md).
  if (!listCards(path.dirname(p)).includes(file)) throw new Error('not a card');
  return readFileSync(p, 'utf8');
}

const HTML = `<!doctype html><html lang=en><meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<title>kanban</title>
<style>
:root{--bg:#0f1117;--panel:#171a23;--col:#1d212c;--line:#2a2f3c;--ink:#e7e9ee;--dim:#9aa3b2;--accent:#7aa2ff}
*{box-sizing:border-box}body{margin:0;font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--ink)}
header{padding:14px 18px;border-bottom:1px solid var(--line);display:flex;gap:12px;align-items:baseline}
header b{font-size:15px}header span{color:var(--dim);font-size:12px}
.board{padding:14px 18px}.board h2{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:var(--dim);margin:18px 0 8px}
.cols{display:flex;gap:12px;align-items:flex-start;overflow-x:auto;padding-bottom:6px}
.col{background:var(--col);border:1px solid var(--line);border-radius:10px;min-width:240px;width:240px;flex:0 0 auto}
.col>h3{margin:0;padding:10px 12px;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--dim);border-bottom:1px solid var(--line);display:flex;justify-content:space-between}
.col>h3 i{font-style:normal;background:var(--panel);border-radius:10px;padding:0 7px;color:var(--ink)}
.drop{min-height:48px;padding:8px;display:flex;flex-direction:column;gap:8px}
.drop.over{outline:2px dashed var(--accent);outline-offset:-6px;border-radius:8px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:9px 10px;cursor:grab}
.card:active{cursor:grabbing}.card.drag{opacity:.4}
.card .t{font-weight:600;margin-bottom:3px}.card .m{color:var(--dim);font-size:12px;display:flex;flex-wrap:wrap;gap:4px 10px}
.card .m b{color:var(--ink);font-weight:600}
.empty{color:var(--dim);font-size:12px;padding:6px 2px}
dialog{background:var(--panel);color:var(--ink);border:1px solid var(--line);border-radius:12px;max-width:760px;width:92vw;padding:0}
dialog::backdrop{background:rgba(0,0,0,.55)}dialog .h{padding:12px 16px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center}
dialog pre{margin:0;padding:16px;white-space:pre-wrap;word-wrap:break-word;max-height:65vh;overflow:auto;font:13px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace}
dialog button{background:none;border:1px solid var(--line);color:var(--ink);border-radius:7px;padding:4px 10px;cursor:pointer}
.toast{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:#3a1d1d;border:1px solid #6b2b2b;color:#ffd9d9;padding:8px 14px;border-radius:8px;display:none}
</style>
<header><b>kanban</b><span id=meta></span></header>
<div id=app class=board></div>
<dialog id=dlg><div class=h><b id=dlgt></b><button onclick="dlg.close()">close</button></div><pre id=dlgb></pre></dialog>
<div class=toast id=toast></div>
<script>
const app=document.getElementById('app'),meta=document.getElementById('meta'),dlg=document.getElementById('dlg');
let dragging=null,busy=false,lastJSON='';
const esc=s=>(s??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',3500)}
async function load(){
  if(busy||dragging)return;
  const r=await fetch('/api/state');const s=await r.json();
  const j=JSON.stringify(s);if(j===lastJSON)return;lastJSON=j;render(s);
}
function render(s){
  meta.textContent=s.root+(s.git?'  ·  git mv':'  ·  plain move');
  app.innerHTML='';
  if(!s.boards.length){app.innerHTML='<p class=empty>No boards found under this root. A board is a folder with todo/doing/done subfolders.</p>';return}
  for(const b of s.boards){
    const sec=document.createElement('div');
    sec.innerHTML='<h2>'+esc(b.name)+'</h2>';
    const cols=document.createElement('div');cols.className='cols';
    for(const c of b.cols){
      const col=document.createElement('div');col.className='col';
      col.innerHTML='<h3>'+esc(c.name)+' <i>'+c.cards.length+'</i></h3>';
      const drop=document.createElement('div');drop.className='drop';drop.dataset.board=b.rel;drop.dataset.col=c.name;
      drop.ondragover=e=>{e.preventDefault();drop.classList.add('over')};
      drop.ondragleave=()=>drop.classList.remove('over');
      drop.ondrop=e=>{e.preventDefault();drop.classList.remove('over');doMove(drop.dataset.board,drop.dataset.col)};
      if(!c.cards.length)drop.innerHTML='<div class=empty>—</div>';
      for(const card of c.cards){
        const el=document.createElement('div');el.className='card';el.draggable=true;
        const m=Object.entries(card.meta).map(([k,v])=>'<span><b>'+esc(k)+'</b> '+esc(v)+'</span>').join('');
        el.innerHTML='<div class=t>'+esc(card.title)+'</div>'+(m?'<div class=m>'+m+'</div>':'');
        el.ondragstart=()=>{dragging={board:b.rel,from:c.name,file:card.file};el.classList.add('drag')};
        el.ondragend=()=>{el.classList.remove('drag');dragging=null};
        el.onclick=()=>openCard(b.rel,c.name,card.file,card.title);
        drop.appendChild(el);
      }
      col.appendChild(drop);cols.appendChild(col);
    }
    sec.appendChild(cols);app.appendChild(sec);
  }
}
async function doMove(board,to){
  if(!dragging)return;const d=dragging;dragging=null;
  if(d.board!==board||d.from===to)return;
  busy=true;
  try{
    const r=await fetch('/api/move',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...d,to})});
    if(!r.ok){toast(await r.text())}
  }catch(e){toast(String(e))}
  busy=false;lastJSON='';load();
}
async function openCard(board,col,file,title){
  const r=await fetch('/api/card?board='+encodeURIComponent(board)+'&col='+encodeURIComponent(col)+'&file='+encodeURIComponent(file));
  document.getElementById('dlgt').textContent=title;
  document.getElementById('dlgb').textContent=r.ok?await r.text():'(could not read card)';
  dlg.showModal();
}
load();setInterval(load,3000);
</script>`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const send = (code, type, body) => { res.writeHead(code, { 'content-type': type }); res.end(body); };
  try {
    if (url.pathname === '/') return send(200, 'text/html; charset=utf-8', HTML);
    if (url.pathname === '/api/state') return send(200, 'application/json', JSON.stringify(state()));
    if (url.pathname === '/api/card') {
      const body = cardBody(url.searchParams.get('board') || '', url.searchParams.get('col'), url.searchParams.get('file'));
      return send(200, 'text/plain; charset=utf-8', body);
    }
    if (url.pathname === '/api/move' && req.method === 'POST') {
      // Guard the only mutating endpoint against CSRF and DNS-rebinding:
      //  - Host must be the loopback we bound to (rebinding sends an attacker name).
      //  - Origin, when the browser sends it, must be our own page. A cross-site
      //    page can forge neither header, and a same-origin fetch always carries
      //    a matching Origin; non-browser callers (curl) send none, which is fine.
      const host = (req.headers.host || '').split(':')[0];
      if (!['localhost', '127.0.0.1', '[::1]', '::1'].includes(host)) return send(403, 'text/plain', 'forbidden host');
      const origin = req.headers.origin;
      const allowed = [`http://localhost:${PORT}`, `http://127.0.0.1:${PORT}`, `http://[::1]:${PORT}`];
      if (origin && !allowed.includes(origin)) return send(403, 'text/plain', 'forbidden origin');
      let raw = '';
      req.on('data', (c) => { raw += c; });
      req.on('end', () => {
        try { move(JSON.parse(raw)); send(200, 'application/json', JSON.stringify(state())); }
        catch (e) { send(409, 'text/plain', e.message || 'move failed'); }
      });
      return;
    }
    send(404, 'text/plain', 'not found');
  } catch (e) { send(500, 'text/plain', e.message || 'error'); }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`kanban board → http://localhost:${PORT}`);
  console.log(`root: ${ROOT}${GIT ? '  (git mv enabled)' : '  (plain rename; not in a git repo)'}`);
  const n = state().boards.length;
  console.log(n ? `watching ${n} board(s)` : `no boards found yet — create <board>/{todo,doing,done}/ with a card .md`);
});
