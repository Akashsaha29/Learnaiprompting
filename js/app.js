/* © 2026 Akash Saha. AI Design Mastery. All rights reserved. */


function buildSidebar(){
  let html='';
  PHASES.forEach((phase,pi)=>{
    const doneDays=phase.days.filter(d=>state.completedDays.includes(d)).length;
    const pct=Math.round((doneDays/phase.days.length)*100);
    const collapsed=state['phase_'+pi+'_collapsed'];
    html+=`<div class="phase-group ${collapsed?'collapsed':''}" id="pg-${pi}">
      <div class="phase-header" onclick="togglePhase(${pi})">
        <div class="phase-dot" style="background:${phase.dot}"></div>
        <div class="phase-name">${phase.short}</div>
        <div class="phase-count">${doneDays}/${phase.days.length}</div>
        <div class="phase-chevron">▼</div>
      </div>
      <div class="phase-prog-mini"><div class="phase-prog-mini-fill" style="background:${phase.dot};width:${pct}%"></div></div>
      <div class="phase-days">`;
    phase.days.forEach(d=>{
      const done=state.completedDays.includes(d);
      const active=d===state.currentDay;
      const lesson=LESSONS[d];
      html+=`<div class="sidebar-day ${done?'done':''} ${active?'active':''}" onclick="goToDay(${d});closeSidebar()">
        <div class="day-icon">${done?'✓':d}</div>
        <div class="day-label">${lesson.title.replace('Day '+d+': ','')||'Day '+d}</div>
      </div>`;
    });
    html+=`</div></div>`;
  });
  document.getElementById('sidebar-inner').innerHTML=html;
}

function togglePhase(pi){
  state[`phase_${pi}_collapsed`]=!state[`phase_${pi}_collapsed`];
  saveState();
  buildSidebar();
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  DASHBOARD                                                       ║
// ╚══════════════════════════════════════════════════════════════════╝
function buildDashboard(){
  const done=state.completedDays.length;
  const pct=Math.round((done/45)*100);
  // phase cards
  let phaseCards='';
  PHASES.forEach((p,i)=>{
    const pd=p.days.filter(d=>state.completedDays.includes(d)).length;
    const pp=Math.round((pd/p.days.length)*100);
    const icons=['📝','🖼','🎬','🏷','🚀'];
    phaseCards+=`<div class="phase-card" onclick="goToDay(${p.days[0]})">
      <div class="phase-card-icon">${icons[i]}</div>
      <div class="phase-card-name">${p.short}</div>
      <div class="phase-card-range">Days ${p.days[0]}–${p.days[p.days.length-1]}</div>
      <div class="phase-card-bar"><div class="phase-card-fill" style="background:${p.dot};width:${pp}%"></div></div>
      <div class="phase-card-stat" style="color:${p.dot}">${pd}/${p.days.length} days</div>
    </div>`;
  });
  // day map
  let dayMap='';
  for(let d=1;d<=45;d++){
    const isDone=state.completedDays.includes(d);
    const isActive=d===state.currentDay;
    dayMap+=`<div class="day-map-cell ${isDone?'done':''} ${isActive?'active':''}" onclick="goToDay(${d})" title="Day ${d}: ${LESSONS[d]?.title||''}">${d}</div>`;
  }

  document.getElementById('dash-inner').innerHTML=`
  <div class="dash-hero">
    <div class="dash-badge">✦ 45-DAY COURSE · 2026 EDITION</div>
    <h1>AI Design<br>Mastery</h1>
    <p>From above-beginner to portfolio-ready AI Designer. Every lesson, prompt, reference, and project — built to make you confident and hireable.</p>
    <div class="dash-cta-row">
      <button class="dash-cta primary" onclick="goToDay(${state.currentDay})">Continue Day ${state.currentDay} →</button>
      <button class="dash-cta outline" onclick="showView('vocab')">📚 Open Glossary</button>
      <button class="dash-cta outline" onclick="showView('builder')">⚡ Prompt Builder</button>
    </div>
  </div>

  <div class="dash-stats">
    <div class="stat-card"><div class="stat-num">${done}</div><div class="stat-label">Days Completed</div><div class="stat-sub">${45-done} remaining</div></div>
    <div class="stat-card"><div class="stat-num">${pct}%</div><div class="stat-label">Course Progress</div><div class="stat-sub">${done===0?'Start Day 1 →':done===45?'🎉 Complete!':'Keep going!'}</div></div>
    <div class="stat-card"><div class="stat-num">20</div><div class="stat-label">Portfolio Projects</div><div class="stat-sub">10 Posters + 10 Videos</div></div>
    <div class="stat-card"><div class="stat-num">30+</div><div class="stat-label">AI Tools Covered</div><div class="stat-sub">Image, Video, Audio, Design</div></div>
  </div>

  <div class="dash-section-title">Your 5 Learning Phases</div>
  <div class="phase-cards">${phaseCards}</div>

  <div class="dash-section-title">45-Day Map</div>
  <div style="background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow);">
    <div class="day-map-grid">${dayMap}</div>
    <div style="display:flex;gap:16px;font-size:12px;color:var(--muted);margin-top:10px;flex-wrap:wrap;">
      <span style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;border-radius:3px;background:var(--green-light);border:1.5px solid var(--green);display:inline-block;"></span>Completed</span>
      <span style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;border-radius:3px;background:var(--primary);display:inline-block;"></span>Current</span>
      <span style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;border-radius:3px;background:var(--bg2);border:1.5px solid var(--border);display:inline-block;"></span>Incomplete</span>
    </div>
  </div>`;
  updateTopbar();
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  LESSON BUILD                                                    ║
// ╚══════════════════════════════════════════════════════════════════╝
function buildLesson(day){
  const lesson=LESSONS[day];
  if(!lesson)return;

  // No phase lock — all days are accessible
  document.title='Day '+day+' of 45 — AI Design Pro';
  const done=state.completedDays.includes(day);
  const prevDay=day>1?day-1:null;
  const nextDay=day<45?day+1:null;
  const isBookmarked=state.bookmarks.includes(day);

  // TABS
  const tabDefs=[
    {id:'lesson',label:'📖 Lesson',always:true},
    {id:'refs',label:`📸 References (${lesson.imageRefs.length})`,show:lesson.imageRefs.length>0},
    {id:'videos',label:`🎬 Videos (${lesson.videos.length})`,show:lesson.videos.length>0},
    {id:'inspo',label:`💡 Inspiration (${lesson.inspiration.length})`,show:lesson.inspiration.length>0},
    {id:'assign',label:'🎯 Assignment',always:true},
  ];
  const tabs=tabDefs.filter(t=>t.always||t.show);
  const tabsHtml=tabs.map((t,i)=>`<button class="ltab ${i===0?'active':''}" data-panel="${t.id}-${day}" onclick="switchLearnTab(this,'${t.id}-${day}')">${t.label}</button>`).join('');
  document.getElementById('lesson-tabs-bar').innerHTML=tabsHtml;

  // Build refs
  const refsHtml=lesson.imageRefs.length?`
    <div style="margin-bottom:20px;">
      <h3 style="font-size:14px;font-weight:800;color:var(--text);margin-bottom:6px;">Image References with Copyable Prompts</h3>
      <p style="font-size:13px;color:var(--muted);margin-bottom:14px;">Each card shows a visual style target and the exact prompt to reproduce it. Copy and adapt for your own work.</p>
    </div>
    <div class="ref-grid">${lesson.imageRefs.map(r=>`
      <div class="ref-card">
        <div class="ref-visual" style="background:${r.bg||'linear-gradient(135deg,#667eea,#764ba2)'}">
          <span style="font-size:52px;">${r.emoji||'🖼'}</span>
        </div>
        <div class="ref-body">
          <div class="ref-title">${r.title}</div>
          <div class="ref-style">${r.style}</div>
          <div class="ref-prompt">${r.prompt}</div>
          <button class="ref-copy" onclick="copyPrompt(this, \`${r.prompt.replace(/`/g,"'")}\`)">📋 Copy Prompt</button>
        </div>
      </div>`).join('')}</div>`:'<p style="color:var(--muted)">References for this day will be added soon.</p>';

  // Build videos
  const videosHtml=lesson.videos.length?`
    <div style="margin-bottom:16px;"><h3 style="font-size:14px;font-weight:800;color:var(--text);margin-bottom:4px;">Watch These Alongside This Lesson</h3>
    <p style="font-size:13px;color:var(--muted);">Curated tutorials — click to open on YouTube.</p></div>
    <div class="video-list">${lesson.videos.map(v=>`
      <a class="video-card" href="${v.url}" target="_blank" rel="noopener">
        <div class="video-thumb-wrap">
          <img class="video-thumb-img" src="${getVideoThumb(v.title)}" alt="${v.title}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
          <div class="video-thumb-fallback" style="display:none;background:${v.bg||'linear-gradient(135deg,#667eea,#764ba2)'}"></div>
          <div class="video-thumb-overlay"></div>
          <div class="play-circle"><svg width="12" height="14" viewBox="0 0 12 14"><polygon points="0,0 12,7 0,14" fill="white"/></svg></div>
          <div class="video-dur">${v.duration}</div>
          <div class="video-yt-badge"><svg width="14" height="10" viewBox="0 0 24 17"><rect width="24" height="17" rx="3" fill="#FF0000"/><polygon points="9,4 19,8.5 9,13" fill="white"/></svg></div>
        </div>
        <div class="video-info-box"><div class="video-vtitle">${v.title}</div><div class="video-channel"><span class="yt-tag">YT</span>${v.channel}</div></div>
      </a>`).join('')}</div>`:'<p style="color:var(--muted)">Tutorial videos for this day will be added soon.</p>';

  // Build inspiration
  const inspoHtml=lesson.inspiration.length?`
    <div style="margin-bottom:16px;"><h3 style="font-size:14px;font-weight:800;color:var(--text);margin-bottom:4px;">Curated Inspiration Links</h3>
    <p style="font-size:13px;color:var(--muted);">Explore these to absorb professional aesthetics. Opens in new tab.</p></div>
    <div class="inspo-list">${lesson.inspiration.map(s=>{
      const iconMap={youtube:'yt',pinterest:'pin',website:'web',behance:'beh',dribbble:'drib'};
      const emojiMap={youtube:'▶️',pinterest:'📌',website:'🌐',behance:'💙',dribbble:'🏀'};
      return`<a class="inspo-card" href="${s.url}" target="_blank" rel="noopener">
        <div class="inspo-icon-box ${iconMap[s.type]||'web'}">${emojiMap[s.type]||'🌐'}</div>
        <div class="inspo-details">
          <div class="inspo-name">${s.name}</div>
          <div class="inspo-desc">${s.desc}</div>
          <div class="inspo-badges"><span class="inspo-badge">${s.type.toUpperCase()}</span>${s.tag?'<span class="inspo-badge" style="background:var(--green-light);color:var(--green);border-color:rgba(16,185,129,0.25);">'+s.tag+'</span>':''}</div>
        </div>
        <div class="inspo-arrow">↗</div>
      </a>`;}).join('')}</div>`:'<p style="color:var(--muted)">Inspiration links for this day will be added soon.</p>';

  // Build deliverables
  const delivs=lesson.assignment.deliverables.map(d=>`<div class="deliverable-row"><span class="chk">▸</span><span>${d}</span></div>`).join('');

  const toolChips=lesson.tools.map(t=>`<span class="meta-chip tool">🛠 ${t}</span>`).join('');
  const tagChips=(lesson.tags||[]).map(t=>`<span class="meta-chip">${t}</span>`).join('');

  document.getElementById('lesson-content-area').innerHTML=`
    <div class="lesson-header-card">
      <div class="lesson-phase-label">${lesson.phase} · Day ${day} of 45</div>
      <div class="lesson-title">${lesson.title}</div>
      <div class="lesson-meta-row">
        ${toolChips}
        ${lesson.time?'<span class="meta-chip time">⏱ '+lesson.time+'</span>':''}
        ${tagChips}
        <button class="bookmark-btn ${isBookmarked?'saved':''}" id="bm-${day}" onclick="toggleBookmark(${day})">${isBookmarked?'★ Saved':'☆ Save'}</button>
      </div>
    </div>

    <div id="panel-lesson-${day}" class="lesson-panel">${lesson.content}</div>
    <div id="panel-refs-${day}" class="lesson-panel" style="display:none;">${refsHtml}</div>
    <div id="panel-videos-${day}" class="lesson-panel" style="display:none;">${videosHtml}</div>
    <div id="panel-inspo-${day}" class="lesson-panel" style="display:none;">${inspoHtml}</div>
    <div id="panel-assign-${day}" class="lesson-panel" style="display:none;">
      <div class="assignment-card">
        <div class="assign-header">
          <div class="assign-icon">${lesson.assignment.emoji}</div>
          <div><div class="assign-label">📌 Day ${day} Assignment</div><div class="assign-title">${lesson.assignment.title}</div></div>
        </div>
        <div class="assign-desc">${lesson.assignment.desc}</div>
        <div class="deliverables-grid">${delivs}</div>
        <div class="submit-label">Your Written Submission</div>
        <textarea class="submit-textarea" id="sub-${day}" placeholder="${lesson.assignment.placeholder}"></textarea>
        <button class="submit-btn" id="sbtn-${day}" onclick="submitAssignment(${day})">✦ Submit for AI Instructor Feedback</button>
        <div class="feedback-card" id="fb-${day}">
          <div class="feedback-from">🤖 AI Instructor Feedback</div>
          <div class="feedback-text" id="fbt-${day}"></div>
        </div>
      </div>

      <!-- IMAGE FEEDBACK -->
      <div class="img-feedback-section">
  <div class="img-feedback-title">🖼 Drop Your Generated Image — Get Live Visual Feedback</div>
  <div class="img-feedback-sub">
    Upload the image made for this assignment. AI will check if it matches the brief, score it, and tell you exactly what to fix.
  </div>

  <div class="drop-zone" id="dz-${day}" ondragover="dzOver(event,${day})" ondragleave="dzLeave(${day})" ondrop="dzDrop(event,${day})">
    <input type="file" id="fi-${day}" accept="image/*" onchange="dzFile(event,${day})" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;">
    <div class="drop-icon">📥</div>
    <div class="drop-title">Drop your image here</div>
    <div class="drop-sub">PNG, JPG, WEBP supported · Click or drag & drop</div>
  </div>

  <div class="img-preview-box" id="ipb-${day}">
    <img id="ipr-${day}" src="" alt="Preview">
    <button class="remove-img" onclick="rmImg(${day})">✕ Remove</button>
  </div>

  <div class="img-note">
    <div class="submit-label">What do you want feedback on? (optional)</div>
    <textarea class="submit-textarea" id="inote-${day}" style="min-height:56px;" placeholder="e.g. Is the lighting professional enough? Does it match the assignment brief?"></textarea>
  </div>

  <button class="img-submit-btn" id="isbtn-${day}" type="button" onclick="submitImgFeedback(${day})">
    🔍 Analyze My Image — Get Expert Feedback
  </button>

  <div class="img-feedback-card" id="ifb-${day}">
    <div class="feedback-from" style="color:var(--purple);">🎨 Visual Analysis</div>
    <div class="feedback-text" id="ifbt-${day}" style="color:#4c1d95;"></div>
  </div>
</div>

      ${done?`<div style="text-align:center;padding:12px 16px;color:var(--green);font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;gap:10px;">✅ Day ${day} complete <button onclick="unmarkDone(${day})" style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:6px;border:1px solid #ef4444;background:none;color:#ef4444;cursor:pointer;margin-left:4px;">↩ Undo</button></div>`:''}
    </div>`;

  // Nav bar
  document.getElementById('lesson-nav-bar').innerHTML=`
    <button class="nav-btn" onclick="goToDay(${prevDay})" ${!prevDay?'disabled':''}>← Day ${prevDay||'-'}</button>
    ${done?`<button class="nav-btn done-btn" onclick="unmarkDone(${day})" title="Click to undo">✅ Completed — Undo?</button>`:'<button class="nav-btn primary" onclick="markDone('+day+')">Mark Complete ✓</button>'}
    <button class="nav-btn" onclick="goToDay(${nextDay})" ${!nextDay?'disabled':''}>Day ${nextDay||'-'} →</button>`;

  document.title=`Day ${day} of 45 — ${lesson.title} | AI Design Pro`;
  updateTopbar(); window.scrollTo(0,0);
}

function switchLearnTab(btn,panelId){
  const day=panelId.split('-').pop();
  document.querySelectorAll('#lesson-tabs-bar .ltab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.lesson-panel').forEach(p=>p.style.display='none');
  btn.classList.add('active');
  const el=document.getElementById(`panel-${panelId}`);
  if(el) el.style.display='block';
}

function switchCompare(id,which){
  document.getElementById(`${id}-bad`).classList.toggle('active',which==='bad');
  document.getElementById(`${id}-good`).classList.toggle('active',which==='good');
  document.getElementById(`${id}-bad-panel`).classList.toggle('active',which==='bad');
  document.getElementById(`${id}-good-panel`).classList.toggle('active',which==='good');
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  VOCAB GLOSSARY                                                  ║
// ╚══════════════════════════════════════════════════════════════════╝
let vocabFilter='all';
function buildVocab(){
  // Category pills
  const cats=document.getElementById('vocab-cats');
  cats.innerHTML=`<button class="vcat-pill active" data-cat="all" onclick="filterVocabCat(this,'all')">🌟 All (${VOCAB.length})</button>`+
    VOCAB_CATS.map(c=>`<button class="vcat-pill" data-cat="${c}" onclick="filterVocabCat(this,'${c}')">${c} (${VOCAB.filter(v=>v.cat===c).length})</button>`).join('');
  renderVocab();
}

function filterVocabCat(btn,cat){
  vocabFilter=cat;
  document.querySelectorAll('.vcat-pill').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  renderVocab();
}
function filterVocab(){
  renderVocab();
}
function toggleVocabHelp(){
  const body=document.getElementById('vocab-help-body');
  const chev=document.getElementById('vhp-chev');
  const isOpen=body.style.display!=='none';
  body.style.display=isOpen?'none':'block';
  if(chev) chev.classList.toggle('open',!isOpen);
}

function renderVocab(){
  const q=(document.getElementById('vocab-search')?.value||'').toLowerCase();
  let filtered=VOCAB.filter(v=>{
    const matchCat=vocabFilter==='all'||v.cat===vocabFilter;
    const matchQ=!q||v.term.toLowerCase().includes(q)||v.desc.toLowerCase().includes(q)||v.cat.toLowerCase().includes(q);
    return matchCat&&matchQ;
  });
  const bycat={};
  filtered.forEach(v=>{(bycat[v.cat]=bycat[v.cat]||[]).push(v);});
  let html='';
  if(!filtered.length){html='<p style="color:var(--muted);text-align:center;padding:40px;">No terms match your search.</p>';}
  Object.entries(bycat).forEach(([cat,terms])=>{
    html+=`<div class="vocab-section-title">${cat}</div><div class="vocab-grid">`;
    terms.forEach(v=>{
      html+=`<div class="vocab-card">
        <div class="vocab-visual" style="background:${v.visual}">
          <span style="font-size:13px;font-weight:900;color:rgba(255,255,255,0.9);text-shadow:0 2px 8px rgba(0,0,0,0.5);text-align:center;padding:10px;">${v.term}</span>
        </div>
        <div class="vocab-term">
          <div class="vocab-term-name">${v.term}</div>
          <div class="vocab-term-cat" style="background:${v.catColor}20;color:${v.catColor};border:1px solid ${v.catColor}30;">${v.cat}</div>
          <div class="vocab-term-desc">${v.desc}</div>
          <div class="vocab-term-example">📋 "${v.example}"</div>
        </div>
        <button class="vocab-copy-prompt" onclick="copyPrompt(this,'${v.example.replace(/'/g,"\\'")}')">Copy prompt term →</button>
      </div>`;
    });
    html+='</div>';
  });
  document.getElementById('vocab-grid-area').innerHTML=html;
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  PROMPT BUILDER                                                  ║
// ╚══════════════════════════════════════════════════════════════════╝
// ╔══════════════════════════════════════════════════════════════════╗
// ║  PROMPT BUILDER — 3 TOOLS                                        ║
// ╚══════════════════════════════════════════════════════════════════╝
function switchBuilderTool(tool){
  ['visual','video','fixer','imgprompt'].forEach(t=>{
    const btn=document.getElementById('btt-'+t);
    const panel=document.getElementById('btool-'+t);
    if(btn) btn.classList.toggle('active',t===tool);
    if(panel) panel.style.display=t===tool?'block':'none';
  });
  if(tool==='visual') buildBuilderUI();
  if(tool==='video') buildVideoBuilderUI();
}

// ── VIDEO BUILDER STATE ──
let vbTool='kling';
let vbMode='ttv';
let vbSelections={};

const VB_TOOL_TIPS={
  kling:[
    'Camera movement is #1 priority — always name the move (push-in, orbit, tracking)',
    'Always add a motion endpoint: "...then settles back into place" prevents 99% hangs',
    'Kling excels at fabric physics, liquid dynamics, and character walking',
    'For I2V: describe ONLY what moves, never redescribe the image',
    'Use 5-7 elements max — more causes overload and distortion',
    'Kling 2.6 natively generates audio — describe ambient sound in your prompt'
  ],
  runway:[
    'Runway is a "kinetic sculptor" — describe forces, not just visuals',
    'Director Mode recognizes cinematography terms: dolly, crane, arc shot',
    'Describe physics: "heavy object with momentum" not just "object moves"',
    'Use Motion Brush for different elements moving at different speeds',
    'Runway Gen-4.5 excels at product hero shots with camera arcs',
    'Opposing motion (foreground/background) creates depth and parallax'
  ],
  veo:[
    'Veo 3.1 is a rendering engine — loves structured, specific descriptions',
    'Treat it like JSON: define each element separately and precisely',
    'Veo excels at environmental realism and structured scene descriptions',
    'Specify audio: Veo 3.1 generates synchronized sound design',
    'Avoid mixing style descriptors — pick one tone and commit',
    'Reference images significantly improve Veo output consistency'
  ]
};

function setVideoTool(tool){
  vbTool=tool;
  document.querySelectorAll('.vts-btn[id^="vts-"]').forEach(b=>b.classList.remove('active'));
  const btn=document.getElementById('vts-'+tool);
  if(btn) btn.classList.add('active');
  const label={kling:'Kling 2.6',runway:'Runway Gen-4.5',veo:'Veo 3.1'}[tool];
  const el=document.getElementById('vb-tool-label');
  if(el) el.textContent=label||tool;
  updateVbTips();
  updateVideoPrompt();
}

function setVideoMode(mode){
  vbMode=mode;
  document.querySelectorAll('.vts-btn[id^="vmode-"]').forEach(b=>b.classList.remove('active'));
  const btn=document.getElementById('vmode-'+mode);
  if(btn) btn.classList.add('active');
  const label=document.getElementById('vb-mode-label');
  if(label) label.textContent=mode==='ttv'?'Text→Video':'Image→Video';
  const note=document.getElementById('i2v-note');
  if(note) note.style.display=mode==='i2v'?'block':'none';
  // Update scene placeholder
  const sceneInput=document.getElementById('vb-scene');
  if(sceneInput){
    sceneInput.placeholder=mode==='i2v'
      ? 'Describe the IMAGE you will upload (subject, composition, lighting already set)...'
      : 'e.g. Premium Boat headphones half-buried in desert sand, cinematic golden dunes...';
  }
  updateVideoPrompt();
}

function setVbScene(val){
  const inp=document.getElementById('vb-scene');
  if(inp){inp.value=val;updateVideoPrompt();}
}

function selectVbOpt(el){
  const step=el.dataset.step;
  const val=el.dataset.val;
  // Toggle
  if(vbSelections[step]===val){
    vbSelections[step]=null;
    el.classList.remove('selected');
  } else {
    // Deselect others in same step
    document.querySelectorAll('.vbs-opt[data-step="'+step+'"]').forEach(o=>o.classList.remove('selected'));
    vbSelections[step]=val;
    el.classList.add('selected');
  }
  updateVideoPrompt();
}

function buildVideoBuilderUI(){
  updateVbTips();
  updateVideoPrompt();
}

function updateVbTips(){
  const tips=VB_TOOL_TIPS[vbTool]||[];
  const title=document.getElementById('vb-tips');
  const titleEl=title&&title.querySelector('.vb-tips-title');
  const list=document.getElementById('vb-tips-list');
  const toolName={kling:'Kling 2.6',runway:'Runway Gen-4.5',veo:'Veo 3.1'}[vbTool];
  if(titleEl) titleEl.textContent='⚡ '+toolName+' Pro Tips';
  if(list) list.innerHTML=tips.map(t=>'<li>'+t+'</li>').join('');
}

function updateVideoPrompt(){
  const scene=(document.getElementById('vb-scene')||{}).value||'';
  const endpoint=(document.getElementById('vb-endpoint')||{}).value||'';
  const s=vbSelections;
  const isI2V=vbMode==='i2v';

  const parts=[];
  const score={scene:scene.trim().length>5?1:0};

  // Build prompt based on mode
  if(isI2V){
    // I2V: start with camera, then motion only
    if(s.camera){parts.push(s.camera);score.camera=1;}
    if(s.motion){parts.push(s.motion);score.motion=1;}
    if(endpoint.trim()) parts.push(endpoint.trim());
    if(s.vlight){parts.push('lighting: '+s.vlight);score.vlight=1;}
    if(s.vformat){parts.push(s.vformat);score.vformat=1;}
  } else {
    // TTV: full scene description
    if(scene.trim()) parts.push(scene.trim());
    if(s.camera){parts.push('Camera: '+s.camera);score.camera=1;}
    if(s.motion){parts.push(s.motion+(endpoint.trim()?', '+endpoint.trim():''));score.motion=1;}
    if(s.vlight){parts.push(s.vlight);score.vlight=1;}
    if(s.vstyle){parts.push(s.vstyle);score.vstyle=1;}
    if(s.vformat){parts.push(s.vformat);score.vformat=1;}
  }

  const filled=Object.values(score).filter(Boolean).length;
  const maxScore=isI2V?4:6;
  const scoreLabels=['Start typing ↑','Add camera move','Add motion','Add lighting','Strong!','Expert!','Master! 🏆'];
  const idx=Math.min(filled,6);

  const liveEl=document.getElementById('vb-live');
  if(liveEl){
    if(!parts.length){
      liveEl.innerHTML='<span style="color:#94a3b8;font-style:italic;">Type your scene above, then select camera and motion...</span>';
    } else {
      // Color-coded tokens
      const colorMap={camera:'#8b5cf6',motion:'#10b981',vlight:'#f59e0b',vstyle:'#2563eb',vformat:'#64748b'};
      let html='';
      if(scene.trim()) html+='<span style="background:#dbeafe;color:#1d4ed8;padding:2px 6px;border-radius:4px;margin:2px;font-size:12px;">'+scene.trim()+'</span> ';
      if(s.camera) html+='<span style="background:#ede9fe;color:#7c3aed;padding:2px 6px;border-radius:4px;margin:2px;font-size:12px;">📷 '+s.camera+'</span> ';
      if(s.motion){
        const motionText=s.motion+(endpoint.trim()?', '+endpoint.trim():'');
        html+='<span style="background:#d1fae5;color:#065f46;padding:2px 6px;border-radius:4px;margin:2px;font-size:12px;">🏃 '+motionText+'</span> ';
      }
      if(s.vlight) html+='<span style="background:#fef3c7;color:#92400e;padding:2px 6px;border-radius:4px;margin:2px;font-size:12px;">💡 '+s.vlight+'</span> ';
      if(s.vstyle) html+='<span style="background:#eff6ff;color:#1d4ed8;padding:2px 6px;border-radius:4px;margin:2px;font-size:12px;">🎬 '+s.vstyle+'</span> ';
      if(s.vformat) html+='<span style="background:#f8fafc;color:#64748b;padding:2px 6px;border-radius:4px;margin:2px;font-size:12px;">📐 '+s.vformat+'</span>';
      liveEl.innerHTML=html;
    }
  }

  const dots=document.querySelectorAll('#vb-score-dots .bp-score-dot');
  dots.forEach((d,i)=>{d.classList.toggle('filled',i<filled);});
  const scoreEl=document.getElementById('vb-score-label');
  if(scoreEl) scoreEl.textContent='Video Prompt Quality: '+scoreLabels[idx];
}

async function copyVideoPrompt(e){

  if(e){
    e.preventDefault();
    e.stopPropagation();
  }

  const scene =
    (document.getElementById('vb-scene') || {}).value || '';

  const endpoint =
    (document.getElementById('vb-endpoint') || {}).value || '';

  const s = vbSelections || {};

  const isI2V = vbMode === 'i2v';

  const parts = [];

  if(!isI2V && scene.trim()){
    parts.push(scene.trim());
  }

  if(s.camera){
    parts.push(
      (isI2V ? '' : 'Camera: ') + s.camera
    );
  }

  if(s.motion){

    parts.push(
      s.motion +
      (endpoint.trim() ? ', ' + endpoint.trim() : '')
    );

  }

  if(s.vlight){
    parts.push(s.vlight);
  }

  if(s.vstyle && !isI2V){
    parts.push(s.vstyle);
  }

  if(s.vformat){
    parts.push(s.vformat);
  }

  if(!parts.length){

    alert(
      'Add a scene description and select at least one video option.'
    );

    return;
  }

  const neg =
    'Negative: blurry, static shot, distorted limbs, low quality, watermark';

  const full =
    parts.join('. ') + '. ' + neg;

  try{

    await navigator.clipboard.writeText(full);

    const btn =
      (e && e.currentTarget) ? e.currentTarget : document.querySelector('#btool-video .bp-copy');

    if(btn){

      const original =
        btn.innerHTML;

      btn.innerHTML =
        '✅ Copied!';

      btn.style.opacity = '0.92';

      setTimeout(()=>{

        btn.innerHTML = original;

        btn.style.opacity = '1';

      },2000);

    }

  }catch(err){

    console.error(err);

    alert(
      'Clipboard copy failed. Browser blocked access.'
    );

  }
}

function clearVideoBuilder(e){

  if(e){
    e.preventDefault();
    e.stopPropagation();
  }

  vbSelections = {};

  document
    .querySelectorAll('.vbs-opt')
    .forEach(o => o.classList.remove('selected'));

  const sceneEl =
    document.getElementById('vb-scene');

  const epEl =
    document.getElementById('vb-endpoint');

  if(sceneEl){
    sceneEl.value = '';
  }

  if(epEl){
    epEl.value = '';
  }

  updateVideoPrompt();
}

function setSubject(val){
  const inp=document.getElementById('builder-subject');
  if(inp){inp.value=val;updateBuilderPrompt();}
}

function buildBuilderUI(){
  let html='';
  BUILDER_STEPS.forEach((step,si)=>{
    const sel=state.builderSelections[step.id];
    html+=`<div class="builder-step-card" id="bsc-${step.id}">
      <div class="bs-header">
        <div class="bs-num">${si+1}</div>
        <div><div class="bs-title">${step.title}</div><div class="bs-sub">${step.sub}</div></div>
        ${sel?'<div style="font-size:10px;font-weight:700;color:var(--green);margin-left:auto;padding:3px 8px;background:var(--green-light);border-radius:99px;white-space:nowrap;">✓ Selected</div>':''}
      </div>
      <div class="bs-options">
        ${step.options.map(o=>`
          <div class="bs-option ${sel===o.value?'selected':''}" onclick="selectBuilderOption('${step.id}','${o.value.replace(/'/g,"\\'")}')" title="${o.tip}">
            <div class="bs-option-emoji">${o.emoji}</div>
            <div class="bs-option-label">${o.label}</div>
            <div class="bs-option-tip">${o.tip}</div>
          </div>`).join('')}
      </div>
    </div>`;
  });
  document.getElementById('builder-steps').innerHTML=html;
  updateBuilderPrompt();
}

function updateBuilderPrompt(){
  const subject=(document.getElementById('builder-subject')||{}).value||'';
  const sels=state.builderSelections;
  const hasSubject=subject.trim().length>0;

  // Assemble prompt parts
  const parts=[];
  const ratio=sels.ratio||'';

  // Category — inject subject into value if it has {subject} placeholder
  if(sels.category){
    const catVal=sels.category.replace('{subject}', hasSubject?subject.trim():'[your subject]');
    parts.push(catVal);
  } else if(hasSubject){
    parts.push(subject.trim()); // no category selected yet, just subject
  }

  if(sels.lighting) parts.push(sels.lighting);
  if(sels.camera)   parts.push(sels.camera);
  if(sels.style)    parts.push(sels.style);
  if(sels.mood)     parts.push(sels.mood);
  if(sels.postprocess) parts.push(sels.postprocess);

  // Score: subject counts as 1 layer, each selection counts
  const selCount=Object.values(sels).filter(v=>v&&v!==ratio).length;
  const filled=(hasSubject?1:0)+selCount;

  const scoreLabels=['Start typing ↑','+ Choose category','+ Add lighting','+ Add camera','+ Add style','Strong Prompt!','Expert Prompt!','Master Level! 🏆'];
  const scoreIdx=Math.min(filled,7);

  if(!parts.length){
    document.getElementById('bp-live').innerHTML='<span style="color:#94a3b8;font-style:italic;">Type your subject above — e.g. "Boat wireless headphones"</span>';
  } else {
    // Build visual token display
    const tokenColors={
      category:'#2563eb', lighting:'#f59e0b', camera:'#8b5cf6',
      style:'#10b981', mood:'#ec4899', postprocess:'#6366f1'
    };
    let tokenHtml='';
    if(sels.category){
      const label=sels.category.replace('{subject}',hasSubject?'<strong style="color:#fff">'+subject.trim()+'</strong>':'<em>[add subject ↑]</em>');
      tokenHtml+=`<span style="display:inline;background:#dbeafe;color:#1d4ed8;padding:2px 6px;border-radius:4px;margin:2px;font-size:12px;">${label}</span>, `;
    } else if(hasSubject){
      tokenHtml+=`<span style="background:#dbeafe;color:#1d4ed8;padding:2px 6px;border-radius:4px;margin:2px;font-size:12px;display:inline;">${subject.trim()}</span>, `;
    }
    ['lighting','camera','style','mood','postprocess'].forEach(k=>{
      if(sels[k]){
        const col=tokenColors[k];
        tokenHtml+=`<span style="background:${col}22;color:${col};padding:2px 6px;border-radius:4px;margin:2px;font-size:12px;display:inline;">${sels[k]}</span>, `;
      }
    });
    if(ratio) tokenHtml+=`<span style="background:#f1f5f9;color:#64748b;padding:2px 6px;border-radius:4px;margin:2px;font-size:12px;display:inline;">${ratio}</span> `;
    tokenHtml+=`<span style="color:#94a3b8;font-size:11px;">--no blurry, deformed, text, watermark, low quality</span>`;
    document.getElementById('bp-live').innerHTML=tokenHtml;
  }

  const dots=document.querySelectorAll('.bp-score-dot');
  dots.forEach((d,i)=>{d.classList.toggle('filled',i<Math.min(filled,7));});
  document.getElementById('bp-score-label').textContent='Prompt Strength: '+scoreLabels[scoreIdx];

  // Update hint
  const hint=document.getElementById('bp-sub-hint');
  if(hint){
    if(!hasSubject) hint.textContent='⬆ Start by typing your subject above';
    else if(selCount===0) hint.textContent='Subject set! Now choose your style options below';
    else hint.textContent=selCount+' of 6 style layers selected';
  }
}

function selectBuilderOption(stepId,value){
  state.builderSelections[stepId]=state.builderSelections[stepId]===value?null:value;
  saveState();
  buildBuilderUI();
}

function copyBuilderPrompt(){
  const subject=(document.getElementById('builder-subject')||{}).value||'';
  const sels=state.builderSelections;
  const parts=[];
  if(sels.category) parts.push(sels.category.replace('{subject}',subject.trim()||'[subject]'));
  else if(subject.trim()) parts.push(subject.trim());
  if(sels.lighting) parts.push(sels.lighting);
  if(sels.camera)   parts.push(sels.camera);
  if(sels.style)    parts.push(sels.style);
  if(sels.mood)     parts.push(sels.mood);
  if(sels.postprocess) parts.push(sels.postprocess);
  if(!parts.length){alert('Add a subject and select at least one style option first!');return;}
  const ratio=sels.ratio||'--ar 4:5';
  const prompt=parts.join(', ')+' '+ratio+' --no blurry, deformed, text, watermark, low quality';
  navigator.clipboard.writeText(prompt).then(()=>{
    const btn=document.querySelector('.bp-copy');
    if(btn){btn.textContent='✅ Copied!';setTimeout(()=>{btn.textContent='📋 Copy Prompt';},2000);}
  });
}
function clearBuilder(){
  state.builderSelections={};
  saveState();
  const inp=document.getElementById('builder-subject');
  if(inp) inp.value='';
  buildBuilderUI();
}

// ── TOOL 2: PROMPT FIXER ──
let fixerStyle='Midjourney';
function setFixerStyle(btn){
  document.querySelectorAll('.fopt').forEach(b=>{
    if(b.closest('#btool-fixer'))b.classList.remove('active');
  });
  btn.classList.add('active');
  fixerStyle=btn.dataset.style;
}

async function runPromptFixer() {
  const input = document.getElementById('fixer-input').value.trim();
  const btn = document.getElementById('fixer-btn');
  const placeholder = document.getElementById('fixer-placeholder');
  const output = document.getElementById('fixer-output');
  const upgraded = document.getElementById('fixer-upgraded-text');
  const explanation = document.getElementById('fixer-explanation');

  if (!input || input.length < 5) {
    alert('Please paste a prompt first.');
    return;
  }

  btn.disabled = true;
  btn.textContent = '🔧 Upgrading your prompt...';

  placeholder.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;justify-content:center;">
      <div class="loading-dots"><span></span><span></span><span></span></div>
      <span style="color:var(--muted);font-size:13px;">
        AI is rewriting your prompt professionally...
      </span>
    </div>`;
    
  placeholder.style.display = 'flex';
  output.style.display = 'none';

  try {
    // ✅ USE ONLY ONE FUNCTION
    const data = await aiCall({
      model: 'openrouter/auto',
      messages: [
        {
          role: 'system',
          content: `You are a senior AI visual prompt engineer and commercial photographer.

Your role is to deeply understand the user's intent and convert it into a precise, production-ready AI image prompt.

STEP 1 — UNDERSTAND INTENT:
- Identify what the user is trying to create (ad, cinematic shot, product, portrait, mood)
- Infer missing details intelligently (style, emotion, environment)
- Do NOT stay literal — think like a creative director

STEP 2 — BUILD MASTER PROMPT USING THIS STRUCTURE:
Subject + Key Details,
Action or State,
Environment,
Lighting Setup (type, direction, intensity),
Composition & Camera (angle, lens, framing),
Style & Finish (photography style, realism, rendering quality)

STEP 3 — OUTPUT RULES:
- Output ONLY ONE clean prompt
- No explanations, no labels, no sections
- Keep it concise but visually powerful
- Must feel like a real professional photoshoot or cinematic frame

STEP 4 — QUALITY CONTROL:
- Avoid generic words like “beautiful” or “cool”
- Use precise visual language (e.g., rim lighting, soft diffused light, shallow depth of field, low angle, 85mm lens)
- Ensure the result looks premium, realistic, and intentional

STEP 5 — SMART REFINEMENT:
- If the input is vague → intelligently upgrade it
- If the input is already detailed → refine and sharpen it
- Always improve clarity, realism, and composition without overcomplicating

FINAL GOAL:
Create a prompt that produces a high-end, professional-level visual like a commercial ad or cinematic still.

If the user provides a refinement request, modify only the relevant part without rewriting everything.`
        },
        {
          role: 'user',
          content: `Upgrade this prompt:\n\n"${input}"`
        }
      ]
    });

    // ✅ Correct parsing
    const text = data?.choices?.[0]?.message?.content || '';

    if (!text) throw new Error("No response from AI");

    upgraded.textContent = text;

    explanation.innerHTML = "✨ Prompt optimized for better AI output";

    placeholder.style.display = 'none';
    output.style.display = 'block';

    window._fixedPrompt = text;

  } catch (e) {
    console.error(e);
    placeholder.innerHTML = '<span style="color:var(--red)">❌ Connection error. Try again.</span>';
  }

  btn.textContent = '🔧 Fix & Upgrade My Prompt';
  btn.disabled = false;
}

async function generateImagePrompt(){

  const fileInput = document.getElementById("imgp-fi");
  const file = fileInput.files[0];

  const output = document.getElementById("imgp-result");
  const btn = document.getElementById("imgp-btn");
  const context = document.getElementById("imgp-context").value.trim();

  if(!file){
    alert("Please upload an image");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Analyzing image...";

  // 🔄 Loading UI
  output.innerHTML = `
    <div class="fixer-placeholder">
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;">
        <div class="loading-dots"><span></span><span></span><span></span></div>
        <span style="color:var(--muted);font-size:13px;">
          Processing... Please wait, generating best result...
        </span>
      </div>
    </div>
  `;

  try{

    const base64 = await toBase64(file);

    let result = null;
    let attempts = 0;
    const maxAttempts = 3;

    while(!result && attempts < maxAttempts){

      const res = await fetch("https://ai-proxy.akashsaha-rock666.workers.dev",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"openrouter/free",
          messages:[
            {
              role:"system",
              content:`You are a senior visual AI analyst and commercial prompt engineer.

You MUST deeply analyze the image and produce a HIGH-QUALITY result.

DO NOT leave anything blank.
DO NOT give generic answers.
DO NOT summarize.
DO NOT be lazy.

-------------------------------------
MODE: ${imgMode}

-------------------------------------
MODE INSTRUCTIONS:

1. recreate:
- Recreate the exact image
- Include subject details, material, color, position
- Include environment, lighting direction, camera angle
- Must be visually reconstructable

2. adscene:
- Keep same subject
- Transform into cinematic ad scene
- Add storytelling, dramatic lighting, premium composition

3. both:
- Keep original structure
- Slightly enhance environment and lighting
- Add subtle commercial feel without changing subject

4. vocab:
- Extract FULL 5-layer structure:

Subject:
Action:
Environment:
Lighting:
Style & Camera:

-------------------------------------
STRICT RULES:

- No empty fields
- No placeholders
- No generic words like “nice” or “beautiful”
- Every line must describe real visual details
- Be specific (e.g. “top-down angle”, “harsh sunlight from right”)

-------------------------------------
USER CONTEXT:
${context || "none"}

-------------------------------------
OUTPUT RULE:

recreate / adscene / both → ONE clean professional prompt  
vocab → structured format ONLY  

NO EXTRA TEXT.`
            },
            {
              role:"user",
              content:[
                { type:"text", text:"Analyze this image and generate output based on selected mode" },
                { type:"image_url", image_url:{ url: base64 } }
              ]
            }
          ]
        })
      });

      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content;

      // ✅ STRICT VALIDATION (IMPROVED)
      if(text && text.trim().length > 30 && !text.includes("Subject:") && imgMode !== "vocab"){
        result = text.trim();
      } 
      else if(text && text.trim().length > 30 && imgMode === "vocab"){
        result = text.trim();
      } 
      else {
        attempts++;
        await new Promise(r => setTimeout(r, 700));
      }
    }

    if(!result){
      output.innerHTML = `
        <span style="color:var(--red)">
          ⚠️ AI is busy or response was weak. Please try again.
        </span>
      `;
      return;
    }

    output.innerHTML = `
      <div class="imgp-output-label">
        ${imgMode === "vocab" ? "Prompt Breakdown" : "Generated Prompt"}
      </div>
      <div class="imgp-output-prompt">${result}</div>
    `;

  }catch(err){
    console.error(err);
    output.innerHTML = `
      <span style="color:var(--red)">❌ Error generating prompt</span>
    `;
  }

  btn.disabled = false;
  btn.textContent = "🖼 Generate Prompt from Image";
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function copyFixedPrompt(){
  if(!window._fixedPrompt)return;
  navigator.clipboard.writeText(window._fixedPrompt).then(()=>{
    const btn=document.getElementById('fixer-copy-btn');
    btn.textContent='✅ Copied!';setTimeout(()=>{btn.textContent='📋 Copy Upgraded Prompt';},2000);
  });
}

// ── TOOL 3: IMAGE → PROMPT ──
let imgpData=null;
let imgpMode='both';  // Default: Both versions

function setImgpMode(btn){
  document.querySelectorAll('.imgp-mode-card').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  imgpMode=btn.dataset.mode;
  // Update button text in label
  const labels={recreate:'🔁 Recreate It',adscene:'🎬 Place in Ad Scene',both:'✨ Both Versions (Recreate + Ad Scene)',vocab:'📚 Analyze Vocabulary'};
  const submitBtn=document.getElementById('imgp-btn');
  if(submitBtn) submitBtn.textContent=`${labels[imgpMode] || '🖼 Generate Prompt from Image'}`;
}
function dzOver2(e){e.preventDefault();document.getElementById('imgp-dz').classList.add('over');}
function dzLeave2(){document.getElementById('imgp-dz').classList.remove('over');}
function dzDrop2(e){e.preventDefault();dzLeave2();const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/'))loadImgP(f);}
function imgpFile(e){const f=e.target.files[0];if(f)loadImgP(f);}
function loadImgP(file){
  const r=new FileReader();
  r.onload=ev=>{
    imgpData=ev.target.result;
    document.getElementById('imgp-preview-img').src=ev.target.result;
    document.getElementById('imgp-preview-box').classList.add('show');
    document.getElementById('imgp-dz').style.display='none';
  };
  r.readAsDataURL(file);
}
function rmImgP(){
  imgpData=null;
  document.getElementById('imgp-preview-box').classList.remove('show');
  document.getElementById('imgp-dz').style.display='';
  document.getElementById('imgp-fi').value='';
}

// async function runImgToPrompt(){
//   if(!imgpData){alert('Please upload an image first.');return;}
//   const context=document.getElementById('imgp-context').value.trim();
//   const btn=document.getElementById('imgp-btn');
//   const placeholder=document.getElementById('imgp-placeholder');
//   const output=document.getElementById('imgp-output');
//   const outputContent=document.getElementById('imgp-output-content');

//   btn.disabled=true;btn.textContent='Analyzing image...';
//   placeholder.innerHTML=`<div style="display:flex;align-items:center;gap:10px;justify-content:center;"><div class="loading-dots"><span></span><span></span><span></span></div><span style="color:var(--muted);font-size:13px;">AI is analyzing your image...</span></div>`;
//   placeholder.style.display='flex';output.style.display='none';

//   const modeInstructions={
//     recreate:`Write ONE professional Midjourney prompt that would recreate this image as closely as possible. Include all visual details: subject description, lighting, camera/lens, style reference, mood, color palette, and negative prompts. Wrap in <prompt_recreate> tags.`,
//     adscene:`Write ONE professional Midjourney/Kling prompt that takes THIS product/character and places it in a creative cinematic ad scene. Make it dramatic and commercial-ready. If there's context provided, use it. Wrap in <prompt_adscene> tags. Also briefly explain the creative scene you chose.`,
//     both:`Write TWO prompts:
// 1. A RECREATE prompt (wrapped in <prompt_recreate> tags) — to reproduce the image as-is
// 2. AN AD SCENE prompt (wrapped in <prompt_adscene> tags) — to place this product/character in a dramatic cinematic ad scenario
// For the ad scene, if context is provided, use it. Make both prompts production-ready.`,
//     vocab:`Analyze this image and identify the professional photography/design vocabulary terms that describe it. For each term, explain what it is and how it creates the effect seen. Wrap your analysis in <vocab_analysis> tags. Format: [TERM]: [what it is] — [what it does in this image]. Cover: lighting type, camera/lens style, color mood, atmosphere, composition technique. 8-12 terms.`
//   };

//   const base64=imgpData.split(',')[1];
//   const mediaType=imgpData.split(';')[0].split(':')[1];

//   try{
//     const res=await aiCall({
//         model:'meta-llama/llama-3.3-70b-instruct:free',max_tokens:1400,
//         system:`You are a world-class AI prompt engineer and creative director. Analyze images with extreme precision and produce professional-grade prompts. Use photography and cinematography vocabulary: lighting terms, camera specs, style references, mood vocabulary, aspect ratios, negative prompts. Always use Midjourney syntax (--ar, --no) for image prompts. For video prompts use Kling/Runway terminology (camera movements, physics, duration).`,
//         messages:[{role:'user',content:[
//           {type:'image',source:{type:'base64',media_type:mediaType,data:base64}},
//           {type:'text',text:`${modeInstructions[imgpMode]}${context?'\n\nAdditional context: '+context:''}`}
//         ]}]
//       });
//     const data=await res.json();
//     const text=data.content?.[0]?.text||'';

//     let html='';
//     const recreateMatch=text.match(/<prompt_recreate>([\s\S]*?)<\/prompt_recreate>/);
//     const adsceneMatch=text.match(/<prompt_adscene>([\s\S]*?)<\/prompt_adscene>/);
//     const vocabMatch=text.match(/<vocab_analysis>([\s\S]*?)<\/vocab_analysis>/);

//     if(recreateMatch){
//       const p=recreateMatch[1].trim();
//       html+=`<div class="imgp-output-label">🔁 Recreate Prompt — Midjourney</div>
//         <div class="imgp-output-prompt">${p}</div>
//         <button class="ref-copy" style="width:100%;padding:8px;margin-bottom:4px;" onclick="navigator.clipboard.writeText(\`${p.replace(/`/g,"'")}\`);this.textContent='✅ Copied!';setTimeout(()=>{this.textContent='📋 Copy Recreate Prompt';},2000)">📋 Copy Recreate Prompt</button>`;
//     }
//     if(adsceneMatch){
//       const p=adsceneMatch[1].trim();
//       // Extract any explanation after the prompt
//       const remaining=text.replace(/<prompt_recreate>[\s\S]*?<\/prompt_recreate>/,'').replace(/<prompt_adscene>[\s\S]*?<\/prompt_adscene>/,'').trim();
//       html+=`<div class="imgp-output-label">🎬 Ad Scene Prompt — Midjourney/Kling</div>
//         <div class="imgp-output-prompt">${p}</div>
//         <button class="ref-copy" style="width:100%;padding:8px;margin-bottom:4px;" onclick="navigator.clipboard.writeText(\`${p.replace(/`/g,"'")}\`);this.textContent='✅ Copied!';setTimeout(()=>{this.textContent='📋 Copy Ad Scene Prompt';},2000)">📋 Copy Ad Scene Prompt</button>`;
//       if(remaining&&remaining.length>10){
//         html+=`<div class="fixer-explanation" style="margin-top:10px;">${remaining.replace(/\n/g,'<br>')}</div>`;
//       }
//     }
//     if(vocabMatch){
//       const vlines=vocabMatch[1].trim().split('\n').filter(function(l){return l.trim();});
//       const vocabTags=vlines.map(function(l){
//         const term=l.split(':')[0].replace(/[\[\]•\-]/g,'').trim();
//         if(!term) return '';
//         return '<span class="imgp-vocab-tag" onclick="navigator.clipboard.writeText(\''+term.replace(/'/g,"\\'")+'\')">'+ term+'</span>';
//       }).join('');
//       html+='<div class="imgp-output-label">📚 Vocabulary Terms Identified</div>'+
//         '<div class="imgp-vocab-list">'+vocabTags+'</div>'+
//         '<div class="fixer-explanation">'+vlines.map(function(l){return l.replace(/\[/g,'<strong>').replace(/\]/g,'</strong>');}).join('<br>')+'</div>';
//     }
//     if(!html){html=`<div class="imgp-output-label">📋 Generated Prompt</div><div class="imgp-output-prompt">${text.replace(/<\/?[^>]+>/g,'').trim()}</div>`;}

//     outputContent.innerHTML=html;
//     placeholder.style.display='none';output.style.display='block';
//   }catch(e){
//     placeholder.innerHTML='<span style="color:var(--red)">Connection error. Try again.</span>';
//   }
//   btn.textContent='🖼 Generate Prompt from Image';btn.disabled=false;
// }

// ╔══════════════════════════════════════════════════════════════════╗
// ║  TOOLS VIEW                                                      ║
// ╚══════════════════════════════════════════════════════════════════╝
let toolsFilter = 'All';

function buildToolsView(){

  try {

    const filterEl = document.getElementById('tools-filter');
    const gridEl = document.getElementById('tools-grid');

    if (!filterEl || !gridEl) {
      console.error("❌ tools-filter or tools-grid not found in HTML");
      return;
    }

    if (!window.TOOLS_DATA) {
      console.error("❌ TOOLS_DATA is undefined");
      gridEl.innerHTML = "❌ TOOLS_DATA not found";
      return;
    }

    const cats = ['All','Image','Video','Audio','Design'];

    filterEl.innerHTML = cats.map(c => `
      <button class="tf-btn ${c===toolsFilter?'active':''}" onclick="filterTools('${c}')">
        ${c}
      </button>
    `).join('');

    const filtered = toolsFilter === 'All'
      ? window.TOOLS_DATA
      : TOOLS_DATA.filter(t => t.cat === toolsFilter);

    if (!filtered.length) {
      gridEl.innerHTML = "No tools found.";
      return;
    }

    gridEl.innerHTML = filtered.map(t => `
      <div class="tool-card">
        <div class="tc-top">
          <div class="tc-emoji">${t.emoji}</div>
          <div style="flex:1;min-width:0;">
            <div class="tc-info-name">${t.name}</div>
            <div class="tc-info-cat">${t.cat}</div>
          </div>
          ${t.url?`<a href="${t.url}" target="_blank" rel="noopener" class="tc-link-btn" title="Open ${t.name}" onclick="event.stopPropagation()">↗</a>`:''}
        </div>
        <div class="tc-desc">${t.desc}</div>
        <div class="tc-footer">
          <span class="tc-badge ${t.cost}">
            ${t.cost==='both'?'Free + Paid':t.cost==='free'?'Free':'Paid'}
          </span>
          <span class="tc-day" onclick="goToDay(${t.day})" style="cursor:pointer;color:var(--primary);">
            → Day ${t.day}
          </span>
        </div>
      </div>
    `).join('');

  } catch (e) {
    console.error("❌ ERROR in buildToolsView:", e);
    document.getElementById('tools-grid').innerHTML = "❌ Error loading tools. Check console.";
  }
}

function filterTools(cat){
  toolsFilter = cat;
  buildToolsView();
}
// ╔══════════════════════════════════════════════════════════════════╗
// ║  PROJECTS VIEW                                                   ║
// ╚══════════════════════════════════════════════════════════════════╝
let projFilter='poster';
function buildProjectsView(){
  document.getElementById('proj-tabs').innerHTML=['poster','video'].map(t=>`
    <div class="proj-tab ${t===projFilter?'active':''}" onclick="filterProj('${t}')">
      <div class="proj-tab-icon">${t==='poster'?'🪧':'🎬'}</div>
      <div class="proj-tab-label">${t==='poster'?'Poster Ads':'Video Ads'}</div>
      <div class="proj-tab-count">10 projects</div>
    </div>`).join('');
  const filtered=ASSIGNMENTS.filter(a=>a.type===projFilter);
  document.getElementById('projects-grid').innerHTML=filtered.map(a=>`
    <div class="project-card" onclick="goToDay(${a.day})">
      <div class="proj-type-badge ${a.type}">${a.type.toUpperCase()} ${a.n}</div>
      <div class="proj-title">${a.t}</div>
      <div class="proj-desc">${a.d}</div>
      <div class="proj-tools">${a.tools.map(t=>'<span class="proj-tool">'+t+'</span>').join('')}</div>
      <div class="proj-footer">
        <span class="proj-day">→ Day ${a.day}</span>
        <span class="proj-go">Open lesson →</span>
      </div>
    </div>`).join('');
}
function filterProj(t){projFilter=t;buildProjectsView();}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  SAVED VIEW                                                      ║
// ╚══════════════════════════════════════════════════════════════════╝
function buildSavedView(){
  const bms=state.bookmarks||[];
  if(!bms.length){
    document.getElementById('saved-content').innerHTML=`<div class="empty-state"><div class="empty-state-icon">☆</div><div class="empty-state-title">No saved lessons yet</div><div class="empty-state-desc">Tap the ☆ Save button on any lesson header to bookmark it for quick access here.</div></div>`;
    return;
  }
  document.getElementById('saved-content').innerHTML=bms.map(day=>{
    const lesson=LESSONS[day]; if(!lesson)return'';
    const phase=PHASES.find(p=>p.days.includes(day));
    return`<div style="background:var(--white);border:1.5px solid var(--border);border-radius:var(--radius);padding:20px 24px;margin-bottom:12px;cursor:pointer;box-shadow:var(--shadow);transition:all 0.2s;" onclick="goToDay(${day})" onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='var(--shadow)'">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${phase.dot};margin-bottom:4px;">${phase.short} · Day ${day}</div>
      <div style="font-size:15px;font-weight:800;color:var(--text);margin-bottom:8px;">${lesson.title}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${lesson.tools.map(t=>'<span style="font-size:11px;background:var(--bg);border:1px solid var(--border);padding:2px 9px;border-radius:4px;color:var(--muted);">'+t+'</span>').join('')}<span style="margin-left:auto;font-size:12px;font-weight:700;color:var(--primary);">→ Go to lesson</span></div>
    </div>`;}).join('');
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  ASSIGNMENT SUBMISSION                                           ║
// ╚══════════════════════════════════════════════════════════════════╝
async function submitAssignment(day){
  const input = document.getElementById(`sub-${day}`);
  const btn   = document.getElementById(`sbtn-${day}`);
  const fb    = document.getElementById(`fb-${day}`);
  const fbt   = document.getElementById(`fbt-${day}`);

  const submission = input.value.trim();

  if (!submission || submission.length < 20) {
    fbt.innerHTML = '<span style="color:var(--red)">Please write a more detailed submission.</span>';
    fb.classList.add('show');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Getting feedback...';

  fb.classList.add('show');

  fbt.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">
      <div class="loading-dots">
        <span></span><span></span><span></span>
      </div>
      <span style="color:var(--muted);font-size:13px;">
        AI instructor is reviewing your work...
      </span>
    </div>
  `;

  try {
    const res = await aiCall({
        model: "openrouter/auto",
        messages: [
    {
      role: "system",
      content: `You are a senior AI design instructor.

Give sharp, structured, no-fluff feedback.

STRICT FORMAT:

Strengths:
- ...

Weaknesses:
- ...

Improvements:
- ...

Score: X/10

Be practical, honest, and actionable.`
    },
    {
      role: "user",
      content: `Student Submission:

${submission}`}]});
     
    const data = res;

    const text = data?.choices?.[0]?.message?.content || data?.content?.[0]?.text || '';

    if (!text) throw new Error("Invalid AI response");

    fbt.innerHTML = text.replace(/\n/g, '<br>');

    btn.textContent = '✦ Resubmit for More Feedback';
    btn.disabled = false;

  } catch (e) {
    console.error(e);
    fbt.innerHTML = '<span style="color:var(--red)">❌ AI error. Check console.</span>';
    btn.textContent = '✦ Retry';
    btn.disabled = false;
  }
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  IMAGE FEEDBACK                                                  ║
// ╚══════════════════════════════════════════════════════════════════╝
const imgData={};
let imgMode='overall composition, visual balance, and professional quality';

function setImgMode(btn){
  document.querySelectorAll('.img-mode-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  imgMode=btn.dataset.mode;
}
function dzOver(e,day){e.preventDefault();document.getElementById(`dz-${day}`).classList.add('over');}
function dzLeave(day){document.getElementById(`dz-${day}`).classList.remove('over');}
function dzDrop(e,day){e.preventDefault();dzLeave(day);const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/'))loadImg(f,day);}
function dzFile(e,day){const f=e.target.files[0];if(f)loadImg(f,day);}
function loadImg(file,day){
  const r=new FileReader();
  r.onload=ev=>{
    imgData[day]=ev.target.result;
    document.getElementById(`ipr-${day}`).src=ev.target.result;
    document.getElementById(`ipb-${day}`).classList.add('show');
    document.getElementById(`dz-${day}`).style.display='none';
  };
  r.readAsDataURL(file);
}
function rmImg(day){
  delete imgData[day];
  document.getElementById(`ipb-${day}`).classList.remove('show');
  document.getElementById(`dz-${day}`).style.display='';
  document.getElementById(`fi-${day}`).value='';
}

async function submitImgFeedback(day){

  const data = imgData?.[day];
  const note = document.getElementById(`inote-${day}`)?.value.trim() || "";
  const btn  = document.getElementById(`isbtn-${day}`);
  const fb   = document.getElementById(`ifb-${day}`);
  const fbt  = document.getElementById(`ifbt-${day}`);
  const lesson = LESSONS?.[day];

  if(!data){
    fb.classList.add('show');
    fbt.innerHTML = '<span style="color:var(--red)">Please upload an image first.</span>';
    return;
  }

  if(!lesson || !lesson.assignment){
    fb.classList.add('show');
    fbt.innerHTML = '<span style="color:var(--red)">❌ Assignment data missing.</span>';
    return;
  }

  const imageUrl = data.startsWith("data:") ? data : `data:image/png;base64,${data}`;

  btn.disabled = true;
  btn.textContent = "Analyzing...";

  fb.classList.add('show');

  let messages = [
    "Analyzing your image...",
    "Understanding assignment intent...",
    "Evaluating composition and details...",
    "Generating professional feedback...",
    "Almost done..."
  ];

  let messageIndex = 0;

  // 🔄 Dynamic loading text
  const loadingInterval = setInterval(() => {
    fbt.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <div class="loading-dots"><span></span><span></span><span></span></div>
        <span style="color:var(--muted);font-size:13px;">
          ${messages[messageIndex % messages.length]}
        </span>
      </div>
    `;
    messageIndex++;
  }, 2000);

  try {

    let result = null;
    let attempts = 0;
    const maxAttempts = 8; // safe limit (not infinite freeze)

    while(!result && attempts < maxAttempts){

      try{
        const res = await fetch("https://ai-proxy.akashsaha-rock666.workers.dev",{
          method:"POST",
          headers:{ "Content-Type":"application/json" },
          body: JSON.stringify({
            model:"openrouter/free",
            messages:[
              {
                role:"system",
                content:`You are a strict senior AI design instructor.

Evaluate the uploaded image ONLY based on the assignment.

ASSIGNMENT:
${lesson.assignment.title}

DESCRIPTION:
${lesson.assignment.desc}

OUTPUT FORMAT:

Match Score: X/10

Assignment Match:
- Yes / Partially / No (reason)

What works:
- ...

What is missing:
- ...

How to improve:
- ...

Improved Prompt:
- (clean professional prompt)

RULES:
- Be strict
- No generic feedback
- Focus on assignment match
- Keep under 150 words`
              },
              {
                role:"user",
                content:[
                  {
                    type:"image_url",
                    image_url:{ url: imageUrl }
                  },
                  {
                    type:"text",
                    text:`Student note: ${note || "none"}`
                  }
                ]
              }
            ]
          })
        });

        if(!res.ok){
          attempts++;
          await new Promise(r => setTimeout(r, 1200));
          continue;
        }

        const dataRes = await res.json();
        const text = dataRes?.choices?.[0]?.message?.content;

        // ✅ strict validation
        if(text && text.trim().length > 40){
          result = text.trim();
        } else {
          attempts++;
          await new Promise(r => setTimeout(r, 1200));
        }

      }catch(innerErr){
        attempts++;
        await new Promise(r => setTimeout(r, 1200));
      }
    }

    clearInterval(loadingInterval);

    if(!result){
      fbt.innerHTML = `
        <span style="color:var(--muted)">
          ⚠️ Server is busy right now. Please try again in a few seconds.
        </span>
      `;
      return;
    }

    // ✅ FINAL OUTPUT
    fbt.innerHTML = `
      <div style="line-height:1.7;">
        ${result
          .replace(/\n/g,'<br>')
          .replace(/Match Score:/g,'<br><strong style="color:#22c55e;">Match Score:</strong>')
          .replace(/Assignment Match:/g,'<br><strong>Assignment Match:</strong>')
          .replace(/What works:/g,'<br><strong>What works:</strong>')
          .replace(/What is missing:/g,'<br><strong>What is missing:</strong>')
          .replace(/How to improve:/g,'<br><strong>How to improve:</strong>')
          .replace(/Improved Prompt:/g,'<br><strong style="color:#7c3aed;">Improved Prompt:</strong>')
        }
      </div>
    `;

  } catch(e){
    clearInterval(loadingInterval);
    console.error(e);

    fbt.innerHTML = `
      <span style="color:var(--muted)">
        ⚠️ Temporary issue. Please try again.
      </span>
    `;
  }

  btn.disabled = false;
  btn.textContent = "🔍 Analyze My Image — Get Expert Feedback";
}
// ╔══════════════════════════════════════════════════════════════════╗
// ║  NAVIGATION                                                      ║
// ╚══════════════════════════════════════════════════════════════════╝
const VIEWS=['dashboard','learn','vocab','builder','tools','projects','saved'];

function showView(view){

  state.currentView = view;

  // 🔥 Hide all views
  VIEWS.forEach(v => {
    const el = document.getElementById(`${v}-view`);
    if(el){
      el.style.display = 'none';
    } else {
    }
  });

  // 🔥 Activate current view
  const viewMap = {
    dashboard:'dashboard-view',
    learn:'learn-view',
    vocab:'vocab-view',
    builder:'builder-view',
    tools:'tools-view',
    projects:'projects-view',
    saved:'saved-view'
  };

  const currentViewEl = document.getElementById(viewMap[view]);

  if(currentViewEl){
    currentViewEl.style.display = 'block';
  } else {
    console.error("❌ View element NOT FOUND:", viewMap[view]);
  }

  // 🔥 NAV ACTIVE STATES
  ['home','learn','vocab','builder','tools'].forEach(b=>{
    const el=document.getElementById(`bnav-${b}`);
    if(el) el.classList.remove('active');
  });

  ['dashboard','learn','vocab','builder','tools','projects','saved'].forEach(b=>{
    const el=document.getElementById(`tnav-${b}`);
    if(el) el.classList.remove('active');
  });

  const bnavMap = {
    dashboard:'home',
    learn:'learn',
    vocab:'vocab',
    builder:'builder',
    tools:'tools'
  };

  const b = document.getElementById(`bnav-${bnavMap[view]}`);
  if(b) b.classList.add('active');

  const tn = document.getElementById(`tnav-${view}`);
  if(tn) tn.classList.add('active');

  // 🔥 BUILD CONTENT (VERY IMPORTANT ORDER)
  try {
    if(view==='dashboard') buildDashboard();
    else if(view==='learn') buildLesson(state.currentDay);
    else if(view==='vocab') buildVocab();
    else if(view==='builder') buildBuilderUI();
    else if(view==='tools') buildToolsView();
    else if(view==='projects') buildProjectsView();
    else if(view==='saved') buildSavedView();
  } catch(e){
    console.error("❌ Error building view:", view, e);
  }

  // 🔥 SCROLL AFTER RENDER
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);

  saveState();
}

function goToDay(d){
  if(!d||d<1||d>45)return;
  state.currentDay=d;
  showView('learn');
  buildSidebar();
  closeSidebar();
}

function markDone(day){
  if(!state.completedDays.includes(day))state.completedDays.push(day);
  saveProgress();
  buildSidebar();
  buildLesson(day);
  if(day<45)setTimeout(()=>goToDay(day+1),600);
}

function unmarkDone(day){
  state.completedDays=state.completedDays.filter(d=>d!==day);
  saveProgress();
  buildSidebar();
  buildLesson(day);
}

function toggleBookmark(day){
  state.bookmarks=state.bookmarks||[];
  const i=state.bookmarks.indexOf(day);
  if(i>-1)state.bookmarks.splice(i,1);
  else state.bookmarks.push(day);
  saveProgress();
  const btn=document.getElementById(`bm-${day}`);
  if(btn){const saved=state.bookmarks.includes(day);btn.textContent=saved?'★ Saved':'☆ Save';btn.classList.toggle('saved',saved);}
}

function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');document.getElementById('overlay').style.display=document.getElementById('sidebar').classList.contains('open')?'block':'none';}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('overlay').style.display='none';}

function updateTopbar(){
  const done=state.completedDays.length;
  const pct=Math.round((done/45)*100);
  document.getElementById('topbar-fill').style.width=`${pct}%`;
  document.getElementById('topbar-pct').textContent=`${pct}%`;
}

function copyPrompt(btn,text){
  const t=text||btn.closest('.prompt-card')?.querySelector('.prompt-card-body')?.textContent?.trim()||'';
  navigator.clipboard.writeText(t).then(()=>{
    const orig=btn.textContent;
    btn.textContent='✅ Copied!';
    btn.classList.add('copied');
    setTimeout(()=>{btn.textContent=orig;btn.classList.remove('copied');},2000);
  }).catch(()=>{});
}

function openInVocab(term){
  // Navigate to vocab view
  showView('vocab');
  // Set the search input to the term and filter
  setTimeout(()=>{
    const searchInput = document.getElementById('vocab-search');
    if(searchInput){
      // Use the first significant word of the term for search
      const searchTerm = term.split(',')[0].trim();
      searchInput.value = searchTerm;
      filterVocab();
      // Highlight the matching card briefly
      setTimeout(()=>{
        const cards = document.querySelectorAll('.vocab-card');
        cards.forEach(card=>{
          const nameEl = card.querySelector('.vocab-term-name');
          if(nameEl && nameEl.textContent.toLowerCase().includes(searchTerm.toLowerCase())){
            card.style.boxShadow = '0 0 0 3px var(--purple)';
            card.style.borderColor = 'var(--purple)';
            card.scrollIntoView({behavior:'smooth', block:'center'});
            setTimeout(()=>{
              card.style.boxShadow = '';
              card.style.borderColor = '';
            }, 2500);
          }
        });
      }, 150);
    }
  }, 80);
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  INIT — Auth check first, then boot app                         ║
// ╚══════════════════════════════════════════════════════════════════╝
// ════════════════════════════════════════════════════════════════
// SUPABASE CONFIG — replace with your real credentials
// supabase.com → Project → Settings → API
// ════════════════════════════════════════════════════════════════
const SUPABASE_URL      = 'https://iazqcdxhvbotctzunqbg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhenFjZHhodmJvdGN0enVucWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MTg4MDksImV4cCI6MjA5MjI5NDgwOX0.rs7hEG8QVR1rSYTfpXDj8tl6o2VgDTaBov3feCc95O4';
const WORKER_URL        = 'https://ai-proxy.akashsaha-rock666.workers.dev';

const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let _user = null, _token = null;
let _authBootstrapped = false;

// ────────────────────────────────────────────
// DEBUG LOGGING
// ────────────────────────────────────────────
function _log(level, message, data = null) {
  // Debug logging is intentionally commented out for normal use.
  // Placeholder: uncomment the block below whenever you need auth debugging again.
  /*
  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3
  });
  const entry = { timestamp, level, message, data };

  try {
    const logs = JSON.parse(localStorage.getItem('auth_debug_logs') || '[]');
    logs.push(entry);
    if (logs.length > 200) logs.shift(); // Keep only last 200 entries
    localStorage.setItem('auth_debug_logs', JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to log:', e);
  }

  */
  // No-op while debug logging is commented out.
}

function goLogin() {
  const isOnLogin = window.location.pathname.endsWith('/login.html') || window.location.pathname.endsWith('login.html');
  if (!isOnLogin) {
    window.location.href = 'login.html';
  }
}

// ── Auth guard: runs before anything else ──
async function initAuth() {
  try {
    const { data: { session } } = await _sb.auth.getSession();
    _authBootstrapped = true;
    if (!session) {
      goLogin();
      return;
    }
    _user  = session.user;
    _token = session.access_token;
    await loadCloudProgress();
    _renderUserMenu(_user);
    document.getElementById('auth-guard').style.display = 'none';
    document.getElementById('user-menu').style.display  = 'flex';
    buildSidebar();
    showView(state.currentView || 'dashboard');
  } catch(e) {
    goLogin();
  }
}

// Auto-refresh token + handle sign-out from another tab
_sb.auth.onAuthStateChange((event, session) => {
  if (event === 'TOKEN_REFRESHED' && session) {
    _token = session.access_token;
  }
  if (event === 'SIGNED_OUT' || !session) {
    goLogin();
  }
});

function _renderUserMenu(user) {
  const name = user.user_metadata?.full_name
             || user.user_metadata?.name
             || user.email?.split('@')[0]
             || 'Designer';
  const initials = name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  document.getElementById('ua-init').textContent   = initials;
  document.getElementById('ud-name').textContent   = name;
  document.getElementById('ud-email').textContent  = user.email;
}

function toggleUD() {
  document.getElementById('ud').classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.user-menu')) {
    document.getElementById('ud')?.classList.remove('open');
  }
});

async function doLogout() {
  await _sb.auth.signOut();
  goLogin();
}

// ── Cloud progress sync ──
async function loadCloudProgress() {
  if (!_user) return;
  try {
    const { data } = await _sb.from('progress')
      .select('completed_days,bookmarks,current_day')
      .eq('user_id', _user.id).single();
    if (data) {
      state.completedDays = data.completed_days || [];
      state.bookmarks     = data.bookmarks      || [];
      state.currentDay    = data.current_day    || 1;
      saveState();
    }
  } catch(e) { /* use localStorage fallback silently */ }
}

async function saveProgress() {
  saveState(); // localStorage immediately
  if (!_user) return;
  try {
    await _sb.from('progress').upsert({
      user_id:        _user.id,
      completed_days: state.completedDays,
      bookmarks:      state.bookmarks,
      current_day:    state.currentDay,
      updated_at:     new Date().toISOString()
    }, { onConflict: 'user_id' });
  } catch(e) { /* localStorage already saved */ }
}

// ── Secure AI call — always sends auth token ──
async function aiCall(body) {
  if (!_token) {
    const { data: { session } } = await _sb.auth.getSession();
    if (!session) {
      goLogin();
      throw new Error('Not authenticated');
    }
    _token = session.access_token;
  }
  let res = await fetch(WORKER_URL, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + _token
    },
    body: JSON.stringify(body)
  });

  // A stale access token can temporarily return 401; refresh once before redirecting.
  if (res.status === 401) {
    const { data: { session } } = await _sb.auth.getSession();
    if (session?.access_token) {
      _token = session.access_token;
      res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + _token
        },
        body: JSON.stringify(body)
      });
    }
  }

  if (res.status === 401) {
    goLogin();
    throw new Error('Session expired');
  }
  return res.json();
}

// Boot — everything waits for auth
initAuth();
