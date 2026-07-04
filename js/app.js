/* ================================================================
   CulturAI — App Core
   Navigation, Animations, Gemini Live AI, Shared Utilities
   ================================================================ */

/* ── Navigation ────────────────────────────────────────────── */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });
}

/* ── Scroll Reveal ─────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── Counter Animations ────────────────────────────────────── */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target).toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

/* ── Particle Canvas (Hero) ────────────────────────────────── */
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  function makeParticle() {
    return { x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.5+0.3,
      vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3, alpha: Math.random()*0.5+0.1 };
  }
  function init() { resize(); particles = Array.from({length:120}, makeParticle); }
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x<0) p.x=W; if (p.x>W) p.x=0;
      if (p.y<0) p.y=H; if (p.y>H) p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(201,169,110,${p.alpha})`; ctx.fill();
    });
    for (let i=0;i<particles.length;i++) for (let j=i+1;j<particles.length;j++) {
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if (d<100) { ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y);
        ctx.strokeStyle=`rgba(201,169,110,${0.06*(1-d/100)})`; ctx.lineWidth=0.5; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  init(); draw();
}

/* ── Whisper Typewriter ────────────────────────────────────── */
function typewriterEffect(el, text, speed = 18) {
  el.textContent = '';
  el.classList.remove('done');
  const cursor = document.createElement('span');
  cursor.className = 'whisper-cursor';
  el.appendChild(cursor);
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      cursor.before(text[i]); i++;
      if (el.parentElement) el.parentElement.scrollTop = el.parentElement.scrollHeight;
    } else { clearInterval(interval); cursor.remove(); el.classList.add('done'); }
  }, speed);
  return interval;
}

/* ── Render Whisper (paragraph by paragraph) ───────────────── */
function renderWhisper(container, paragraphs) {
  container.innerHTML = '';
  paragraphs.forEach((text, idx) => {
    const p = document.createElement('p');
    container.appendChild(p);
    setTimeout(() => typewriterEffect(p, text, 10), idx * 3000);
  });
}

/* ════════════════════════════════════════════════════════════
   JSON parser — strips markdown fences Gemini sometimes returns
   ════════════════════════════════════════════════════════════ */
function parseGeminiJSON(text) {
  // Extract content between the first [ or { and the last ] or }
  const match = text.match(/[\{\[][\s\S]*[\}\]]/);
  if (match) {
    text = match[0];
  }
  text = text.replace(/,\s*([\]\}])/g, '$1'); // Fix trailing commas
  return JSON.parse(text);
}

/* ════════════════════════════════════════════════════════════
   GEMINI — Live AI Engine
   ════════════════════════════════════════════════════════════ */
const GEMINI = {
  apiKey: localStorage.getItem('culturai_gemini_key') || null,
  model: 'gemini-2.5-flash',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/',

  setKey(key) { this.apiKey = key; localStorage.setItem('culturai_gemini_key', key); },
  clearKey()  { this.apiKey = null; localStorage.removeItem('culturai_gemini_key'); },

  /* ── Core generate ─────────────────────────────────────── */
  async generate(prompt, maxTokens = 8192, isJson = false) {
    if (!this.apiKey) return null;
    try {
      const config = { temperature: 0.85, maxOutputTokens: maxTokens };
      if (isJson) config.responseMimeType = 'application/json';
      
      const res = await fetch(`${this.baseUrl}${this.model}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: config
        })
      });
      const data = await res.json();
      if (data.error) {
        console.warn('Gemini error:', data.error.message);
        showToast('AI error: ' + data.error.message.slice(0, 80), 'error');
        return null;
      }
      
      const candidate = data.candidates?.[0];
      if (candidate && candidate.finishReason !== 'STOP') {
        console.warn('Gemini stopped early:', candidate.finishReason);
        showToast(`AI Blocked Request (Reason: ${candidate.finishReason})`, 'error');
        return null;
      }
      
      const text = candidate?.content?.parts?.[0]?.text;
      if (!text) {
        showToast('AI returned an empty response.', 'error');
        return null;
      }
      
      return text;
    } catch (e) {
      console.warn('Gemini fetch failed:', e.message);
      showToast('Network/Fetch Error: ' + e.message.slice(0, 80), 'error');
      return null;
    }
  },

  /* ── 1. Whisper of the Place ───────────────────────────── */
  async getWhisper(placeId, placeName, destination, shortDesc) {
    if (!placeName && placeId) {
      const p = findPlaceById(placeId);
      if (p) { placeName = p.name; shortDesc = p.shortDesc; destination = destination || 'India'; }
    }

    if (this.apiKey && placeName) {
      const prompt = `You are a travel guide AI for CulturAI.
Generate a brief summary for "${placeName}" (in ${destination || 'India'}).

Rules:
- Exactly 2 or 3 paragraphs.
- Include its history, cultural importance, and why it is significant.
- Include practical suggestions on what to do or see there.
- Keep the tone informative, engaging, and welcoming.
- No markdown formatting or extra conversational text.

Return ONLY the 3 paragraphs separated by a blank line. No titles, no labels, no markdown.`;
      const result = await this.generate(prompt, 900);
      if (result) {
        const paras = result.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 30);
        if (paras.length >= 1) return paras;
      }
    }
    const p = findPlaceById(placeId);
    return p?.whisper || [`I am ${placeName || 'this place'}, and I have been waiting for you.`];
  },

  /* ── 2. Full cultural trail for ANY destination ────────── */
  async generateTrail(destination, vibe = '') {
    if (!this.apiKey) return null;
    const vibeNote = vibe ? ` Prioritise "${vibe}" cultural experiences.` : '';
    const prompt = `You are CulturAI. Generate a cultural trail for "${destination}".${vibeNote}

Return a JSON array of exactly 6 places. Each object:
{
  "id": "lowercase-hyphen-slug",
  "name": "Place Name",
  "location": "City, Region",
  "emoji": "one relevant emoji",
  "lat": accurate_latitude_number,
  "lng": accurate_longitude_number,
  "type": "Heritage Fort|Sacred Temple|Living Ritual|Ancient Ruins|Village|Bazaar|etc",
  "vibes": ["mystical"],
  "tags": ["Cultural Tag","Historical Fact","Unique Feature","Art Form"],
  "shortDesc": "One evocative sentence describing the cultural soul of this place",
  "isHiddenGem": false
}

Rules:
- 4 well-known cultural sites + 2 lesser-known hidden gems (set isHiddenGem:true for those)
- Accurate GPS coordinates are critical for the map
- vibes array: values from mystical|art|culinary|forgotten|festivals|colonial only
- No trailing commas

Return ONLY valid JSON array. No markdown fences, no explanation.`;
    const result = await this.generate(prompt, 8192, true);
    if (!result) return null;
    try { return parseGeminiJSON(result); }
    catch(e) { 
      console.warn('Trail JSON parse error:', e.message, '\nRaw:', result.slice(0,300)); 
      showToast('AI returned invalid data format.', 'error');
      return null; 
    }
  },

  /* ── 3. Hidden gems for any destination ────────────────── */
  async generateHiddenGems(destination) {
    if (!this.apiKey) return null;
    const prompt = `Generate 4 hidden cultural gems near "${destination}" unknown to most tourists.

Return JSON array only:
[{"id":"slug","name":"Place — Subtitle","emoji":"emoji","lat":number,"lng":number,"desc":"One sentence on why this matters culturally"}]

No markdown, no explanation, no trailing commas.`;
    const result = await this.generate(prompt, 600, true);
    if (!result) return null;
    try { return parseGeminiJSON(result); }
    catch(e) { console.warn('Gems JSON parse error:', e.message); return null; }
  },

  /* ── 4. Events for any destination ─────────────────────── */
  async generateEvents(destination) {
    if (!this.apiKey) return null;
    const prompt = `Generate 10 real top cultural festivals, rituals, or events happening throughout "${destination}".

Return JSON array:
[{
  "id":"slug",
  "name":"Event Name",
  "location":"City, Region",
  "emoji":"emoji",
  "date":"Month Year or season",
  "vibe":"festivals|mystical|art|culinary|colonial|forgotten",
  "badge":"badge-gold|badge-purple|badge-teal|badge-rose|badge-sage|badge-amber",
  "context":"3-4 sentences: what happens, why it matters culturally, what makes it unique, what a traveler experiences",
  "category":"Annual Festival|Living Ritual|Heritage Event|etc",
  "attendance":"scale or number"
}]

No markdown, no explanation, no trailing commas.`;
    const result = await this.generate(prompt, 2400, true);
    if (!result) return null;
    try { return parseGeminiJSON(result); }
    catch(e) { console.warn('Events JSON parse error:', e.message); return null; }
  },

  /* ── 5. Place detail: timeline, tags, guides, type ─────── */
  async generatePlaceDetail(placeName, destination) {
    if (!this.apiKey) return null;
    const prompt = `Generate accurate cultural and historical details for "${placeName}" in ${destination}.

Return ONLY this JSON structure:
{
  "type": "Heritage Fort|Sacred Site|Living Ritual|Ancient Ruins|etc",
  "googleRating": "4.8",
  "tags": ["Cultural Tag 1","Historical Fact","Unique Feature","Art Form","Ritual Name","Architecture Style"],
  "timeline": [
    {"year":"Earliest known date CE","text":"Founding or earliest cultural significance (1-2 sentences)"},
    {"year":"Key historical period","text":"Most important event or peak era"},
    {"year":"Major turning point","text":"Conflict, conquest, or transformation"},
    {"year":"Modern era","text":"Restoration, recognition, or cultural revival"},
    {"year":"Today","text":"Current role in local life and cultural significance"}
  ],
  "guides": [
    {"name":"Authentic local name","role":"Specific expertise (e.g. 4th-generation temple priest, oral historian, master craftsperson)","rating":"4.9 ⭐","avatar":"👨"},
    {"name":"Authentic local name","role":"Different specialty","rating":"4.8 ⭐","avatar":"👩"}
  ]
}

No markdown, no trailing commas.`;
    const result = await this.generate(prompt, 1200, true);
    if (!result) return null;
    try { return parseGeminiJSON(result); }
    catch(e) { console.warn('Detail JSON parse error:', e.message); return null; }
  },

  /* ── Legacy static trail fallback ──────────────────────── */
  async getTrail(destination, vibe) {
    const places = CULTURAI_DATA.places[destination];
    if (!places) return [];
    return vibe && vibe !== 'all' ? places.filter(p => p.vibes.includes(vibe)) : places;
  }
};

/* ── Utility: Find Place in static data or session ─────────── */
function findPlaceById(id) {
  for (const dest of Object.values(CULTURAI_DATA.places)) {
    const found = dest.find(p => p.id === id);
    if (found) return found;
  }
  try {
    const trail = JSON.parse(sessionStorage.getItem('culturai_trail') || '[]');
    const gems = JSON.parse(sessionStorage.getItem('culturai_gems') || '[]');
    const found = [...trail, ...gems].find(p => p.id === id);
    if (found) return found;
  } catch(e) {}
  return null;
}

/* ── URL Params ────────────────────────────────────────────── */
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* ── Stars HTML ────────────────────────────────────────────── */
function starsHtml(r) {
  return '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
}

/* ── Toast Notifications ───────────────────────────────────── */
function showToast(msg, type = 'info') {
  const colors = { info: '#C9A96E', success: '#7FB069', error: '#E8627A' };
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed; bottom:32px; left:50%; transform:translateX(-50%);
    background:#0D0D1A; border:1px solid ${colors[type]}40;
    color:#EAE0CC; padding:12px 24px; border-radius:9999px;
    font-size:0.875rem; z-index:99999; box-shadow:0 4px 20px rgba(0,0,0,0.5);
    animation:fadeInUp 0.3s ease both;
    display:flex; align-items:center; gap:10px; white-space:nowrap;
  `;
  t.innerHTML = `<span style="color:${colors[type]};font-size:1rem">${type==='success'?'✓':type==='error'?'✕':'◆'}</span> ${msg}`;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity 0.3s'; setTimeout(()=>t.remove(), 300); }, 3500);
}

/* ── API Key Modal ─────────────────────────────────────────── */
function initApiKeyModal() {
  const btn = document.getElementById('api-key-btn');
  const overlay = document.getElementById('api-modal');
  const closeBtn = document.getElementById('api-modal-close');
  const saveBtn = document.getElementById('api-key-save');
  const input   = document.getElementById('api-key-input');
  const status  = document.getElementById('api-key-status');
  if (!btn || !overlay) return;

  function updateBtn() {
    if (GEMINI.apiKey) {
      btn.textContent = '✦ Live AI On'; btn.className = 'btn btn-outline btn-sm';
      btn.style.color = 'var(--sage)'; btn.style.borderColor = 'rgba(127,176,105,0.4)';
    } else {
      btn.textContent = '+ Add API Key'; btn.className = 'btn btn-ghost btn-sm';
      btn.style.color = ''; btn.style.borderColor = '';
    }
  }
  updateBtn();

  btn.addEventListener('click', () => { overlay.classList.add('open'); input.value = GEMINI.apiKey || ''; if (status) status.textContent = ''; });
  if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

  if (saveBtn) saveBtn.addEventListener('click', () => {
    const key = input.value.trim();
    if (key.length > 10) {
      GEMINI.setKey(key);
      overlay.classList.remove('open');
      showToast('Gemini API key saved! Full AI is now active.', 'success');
      updateBtn();
      if (typeof onApiKeySet === 'function') onApiKeySet();
    } else if (key === '') {
      GEMINI.clearKey();
      overlay.classList.remove('open');
      showToast('API key removed. Using curated stories.', 'info');
      updateBtn();
    } else {
      if (status) { status.textContent = 'Please enter a valid API key from Google AI Studio.'; status.style.color = 'var(--rose)'; }
    }
  });
}

/* ── Waveform Animation ────────────────────────────────────── */
function initWaveform() {
  const wf = document.getElementById('waveform');
  if (!wf) return;
  for (let i = 0; i < 52; i++) {
    const bar = document.createElement('div');
    bar.className = 'wf-bar';
    bar.style.height = (20 + Math.random() * 70) + '%';
    wf.appendChild(bar);
  }
}

/* ── Audio Player ──────────────────────────────────────────── */
function initAudioPlayer() {
  let playing = false, progress = 0, interval = null;
  const playBtn = document.getElementById('play-btn');
  const progFill = document.getElementById('prog-fill');
  const timeEl = document.getElementById('current-time');
  const totalDuration = 8 * 60 + 32;
  if (!playBtn) return;

  const fmt = s => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;

  function updateBars(pct) {
    const bars = document.querySelectorAll('.wf-bar');
    const playedCount = Math.floor(pct / 100 * bars.length);
    bars.forEach((b, i) => {
      b.classList.toggle('played', i < playedCount);
      b.classList.toggle('playing', i === playedCount && playing);
    });
  }

  playBtn.addEventListener('click', () => {
    playing = !playing;
    playBtn.innerHTML = playing
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
    if (playing) {
      interval = setInterval(() => {
        progress += (100 / totalDuration);
        if (progress >= 100) { progress = 0; playing = false; clearInterval(interval); }
        if (progFill) progFill.style.width = progress + '%';
        if (timeEl) timeEl.textContent = fmt(progress / 100 * totalDuration);
        updateBars(progress);
      }, 1000);
    } else { clearInterval(interval); updateBars(progress); }
  });
}

/* ── Cultural DNA Radar Chart ──────────────────────────────── */
function drawDNARadar(canvasId, traits) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width = 340, H = canvas.height = 340;
  const cx = W/2, cy = H/2, r = 130, n = traits.length;
  const step = (Math.PI*2) / n;
  const pt = (angle, radius) => ({ x: cx + radius*Math.cos(angle-Math.PI/2), y: cy + radius*Math.sin(angle-Math.PI/2) });

  function drawGrid() {
    [0.25,0.5,0.75,1.0].forEach(s => {
      ctx.beginPath();
      for (let i=0;i<n;i++) { const p=pt(i*step,r*s); i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y); }
      ctx.closePath();
      ctx.strokeStyle = s===1.0?'rgba(201,169,110,0.15)':'rgba(255,255,255,0.05)';
      ctx.lineWidth = s===1.0?1:0.5; ctx.stroke();
    });
    for (let i=0;i<n;i++) { const p=pt(i*step,r); ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(p.x,p.y); ctx.strokeStyle='rgba(255,255,255,0.06)'; ctx.lineWidth=0.5; ctx.stroke(); }
  }

  let animPct = 0;
  function frame() {
    animPct = Math.min(animPct+0.035, 1);
    ctx.clearRect(0,0,W,H); drawGrid();
    ctx.beginPath();
    traits.forEach((t,i) => { const p=pt(i*step,(t.pct/100)*r*animPct); i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y); });
    ctx.closePath();
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
    g.addColorStop(0,'rgba(201,169,110,0.35)'); g.addColorStop(1,'rgba(139,124,246,0.15)');
    ctx.fillStyle=g; ctx.fill();
    ctx.strokeStyle='rgba(201,169,110,0.6)'; ctx.lineWidth=1.5; ctx.stroke();
    traits.forEach((t,i) => {
      const p=pt(i*step,(t.pct/100)*r*animPct), lp=pt(i*step,r+24);
      ctx.beginPath(); ctx.arc(p.x,p.y,4,0,Math.PI*2);
      ctx.fillStyle=t.color; ctx.fill(); ctx.strokeStyle='rgba(5,5,13,0.8)'; ctx.lineWidth=2; ctx.stroke();
      ctx.font='11px Inter,sans-serif'; ctx.fillStyle='rgba(176,164,154,0.85)';
      ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(t.emoji,lp.x,lp.y);
    });
    if (animPct < 1) requestAnimationFrame(frame);
  }

  const obs = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { animPct=0; frame(); obs.disconnect(); } }, { threshold:0.3 });
  obs.observe(canvas);
}

/* ── Trait Bars ────────────────────────────────────────────── */
function animateTraitBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.trait-fill').forEach(bar => { const p=bar.dataset.pct; setTimeout(()=>{bar.style.width=p+'%';},200); });
        obs.unobserve(e.target);
      }
    });
  }, { threshold:0.3 });
  document.querySelectorAll('.dna-card').forEach(el => obs.observe(el));
}

/* ── Loading skeleton HTML ─────────────────────────────────── */
function loadingHTML(lines = 3) {
  return `<div style="padding:8px 0">` +
    Array.from({length:lines}, (_,i) =>
      `<div class="skeleton" style="height:14px;margin-bottom:10px;border-radius:6px;opacity:${1-i*0.2}"></div>`
    ).join('') + `</div>`;
}

/* ── Generating spinner HTML ───────────────────────────────── */
function generatingHTML(msg = 'Generating with AI...') {
  return `<div class="generating">
    <div class="gen-dots"><div class="gen-dot"></div><div class="gen-dot"></div><div class="gen-dot"></div></div>
    ${msg}
  </div>`;
}

/* ── Init All ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initApiKeyModal();
});
