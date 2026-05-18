/*!
 * AI Design Mastery — 45-Day AI Prompt & Design Course
 * Copyright © 2025 Akash Saha. All rights reserved.
 * Website : https://aidesignmastery.in
 *
 * Unauthorised copying, modification, distribution or use of this
 * software without prior written permission is strictly prohibited.
 */

/* ─────────────────────────────────────────────────────────────────────────────
   app.js — Application Logic
   Contains: UI rendering, navigation, Supabase auth, AI calls
   Requires: data.js loaded first
───────────────────────────────────────────────────────────────────────────── */

function getVideoThumb(title) {
  const map = {
    'How AI Image Generation Actually Works': 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=320&h=180&fit=crop&auto=format&q=80',
    'Midjourney Prompt Masterclass — Beginners': 'https://images.unsplash.com/photo-1636690581110-a512fed05613?w=320&h=180&fit=crop&auto=format&q=80',
    'Nano Banana Full Tutorial (Free AI)': 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=320&h=180&fit=crop&auto=format&q=80',
    'The Prompt Formula That Changes Everything': 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=320&h=180&fit=crop&auto=format&q=80',
    'Every Visual Style You Need for AI Design': 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=320&h=180&fit=crop&auto=format&q=80',
    'Lighting Terms That Transform Your Prompts': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=320&h=180&fit=crop&auto=format&q=80',
    '50 Midjourney Style Aesthetic Words That Work': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=180&fit=crop&auto=format&q=80',
    'Aspect Ratios — When to Use Each': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=320&h=180&fit=crop&auto=format&q=80',
    'Kling 2.6 Full Tutorial — 2025 Guide': 'https://images.unsplash.com/photo-1536240478700-b869ad10a2ab?w=320&h=180&fit=crop&auto=format&q=80',
    'Runway Gen 4 Motion Brush Masterclass': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=320&h=180&fit=crop&auto=format&q=80',
    '5 Camera Moves That Make AI Video Cinematic': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=320&h=180&fit=crop&auto=format&q=80',
    'Image to Video — Midjourney + Kling Workflow': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=320&h=180&fit=crop&auto=format&q=80',
    'How to Build a Consistent AI Brand Identity': 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=320&h=180&fit=crop&auto=format&q=80',
    'Midjourney Seed & Sref for Brand Consistency': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=320&h=180&fit=crop&auto=format&q=80',
    'Creating Brand Mood Boards with AI': 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=320&h=180&fit=crop&auto=format&q=80',
    'Ideogram 2.0 Full Tutorial — Text in AI Images': 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=320&h=180&fit=crop&auto=format&q=80',
    'Adobe Firefly Text Effects Masterclass': 'https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=320&h=180&fit=crop&auto=format&q=80',
    'AI Poster Design From Prompt to Print': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=320&h=180&fit=crop&auto=format&q=80',
    'Full AI Ad Pipeline — Midjourney to Final Video': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=320&h=180&fit=crop&auto=format&q=80',
    'ElevenLabs Full Voice Tutorial 2025': 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=320&h=180&fit=crop&auto=format&q=80',
    'CapCut Pro Editing for AI Videos': 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=320&h=180&fit=crop&auto=format&q=80',
    'How to Build an AI Prompt Library': 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=320&h=180&fit=crop&auto=format&q=80',
    '20 Prompt Templates That Save Hours': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=320&h=180&fit=crop&auto=format&q=80',
    'Midjourney v8 Everything New — Full Breakdown': 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=320&h=180&fit=crop&auto=format&q=80',
    '--sref Style Reference Mastery': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=320&h=180&fit=crop&auto=format&q=80',
    'Midjourney Permutations & Batch Prompts': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=320&h=180&fit=crop&auto=format&q=80',
    'Consistent Characters in Midjourney': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=320&h=180&fit=crop&auto=format&q=80',
    'Nano Banana Pro Full Tutorial — 2026': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=320&h=180&fit=crop&auto=format&q=80',
    'Adobe Firefly Generative Fill Masterclass': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=320&h=180&fit=crop&auto=format&q=80',
    'Nano Banana vs Midjourney — Which for Client Work?': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=320&h=180&fit=crop&auto=format&q=80',
    'Fashion Editorial AI Masterclass': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=320&h=180&fit=crop&auto=format&q=80',
    'Creating Consistent AI Models for Campaigns': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=320&h=180&fit=crop&auto=format&q=80',
    'Photoshop AI — Remove Background & Composite': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=180&fit=crop&auto=format&q=80',
    'AI Product Photography Full Tutorial': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=320&h=180&fit=crop&auto=format&q=80',
    'Nano Banana Pro for Product Shots — Complete Guide': 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=320&h=180&fit=crop&auto=format&q=80',
    'Tech Brand Ad Photography Breakdown': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=320&h=180&fit=crop&auto=format&q=80',
    'Background Staging for AI Product Shots': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=320&h=180&fit=crop&auto=format&q=80',
    'How to Prompt Luxury Brand Aesthetics': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=320&h=180&fit=crop&auto=format&q=80',
    'Hermès, Chanel, Bottega — Visual Language Breakdown': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=320&h=180&fit=crop&auto=format&q=80',
    'The Color Palette of Luxury — Psychology': 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=320&h=180&fit=crop&auto=format&q=80',
    'Food Photography AI Prompts — Pro Results Every Time': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=320&h=180&fit=crop&auto=format&q=80',
    'Restaurant Brand Photography with Midjourney': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=320&h=180&fit=crop&auto=format&q=80',
    'Plating & Food Styling Vocabulary for AI': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=320&h=180&fit=crop&auto=format&q=80',
    'Architecture Photography AI — Pro Interior & Exterior': 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=320&h=180&fit=crop&auto=format&q=80',
    'Interior Design AI — Mood Board to Final Image': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=320&h=180&fit=crop&auto=format&q=80',
    'Ideogram 2.0 Complete Tutorial — Text in AI Images': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=320&h=180&fit=crop&auto=format&q=80',
    'AI Poster Design System — From Brief to Final': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=320&h=180&fit=crop&auto=format&q=80',
    'Typography Rules Every AI Designer Must Know': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&h=180&fit=crop&auto=format&q=80',
    'Sports Photography AI — Motion, Energy & Nike Aesthetic': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=320&h=180&fit=crop&auto=format&q=80',
    'Action & Motion Blur Photography Prompts': 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=320&h=180&fit=crop&auto=format&q=80',
    'Beauty Photography AI — Skin, Makeup & Product': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=320&h=180&fit=crop&auto=format&q=80',
    'Luxury Beauty Campaign Photography with AI': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=320&h=180&fit=crop&auto=format&q=80',
    'Healthcare Brand Photography — Trust & Warmth': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=320&h=180&fit=crop&auto=format&q=80',
    'Adobe Firefly for Healthcare — Commercial Safe AI': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=320&h=180&fit=crop&auto=format&q=80',
    'Kling 2.6 Complete Beginner to Pro Guide 2025': 'https://images.unsplash.com/photo-1536240478700-b869ad10a2ab?w=320&h=180&fit=crop&auto=format&q=80',
    'Runway Gen-4.5 Full Tutorial — Every Feature': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=320&h=180&fit=crop&auto=format&q=80',
    'AI Video vs Real Video — Can You Tell the Difference?': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=320&h=180&fit=crop&auto=format&q=80',
    'The 4-Part Video Prompt Formula That Actually Works': 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=320&h=180&fit=crop&auto=format&q=80',
    'Every Camera Movement Explained — Filmmaking 101': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=320&h=180&fit=crop&auto=format&q=80',
    'AI Video Camera Control — Kling Orbital Shots': 'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=320&h=180&fit=crop&auto=format&q=80',
    'Runway Director Mode — Camera Control Deep Dive': 'https://images.unsplash.com/photo-1536240478700-b869ad10a2ab?w=320&h=180&fit=crop&auto=format&q=80',
    'Kling 2.6 Advanced Features — Everything New': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=320&h=180&fit=crop&auto=format&q=80',
    'Kling Elements Feature — Consistent Characters': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=320&h=180&fit=crop&auto=format&q=80',
    'Kling 2.6 Physics — Fabric, Liquid, Fire Mastery': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=180&fit=crop&auto=format&q=80',
    'Image to Video — Kling Professional Workflow': 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=320&h=180&fit=crop&auto=format&q=80',
    'Runway Gen-4.5 Everything New — Physics & Director Mode': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=320&h=180&fit=crop&auto=format&q=80',
    'Runway vs Kling — Which for Commercial Work?': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=320&h=180&fit=crop&auto=format&q=80',
    'Runway Motion Brush Deep Dive': 'https://images.unsplash.com/photo-1536240478700-b869ad10a2ab?w=320&h=180&fit=crop&auto=format&q=80',
    'Fashion Video Ad — AI Campaign Production 2025': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=320&h=180&fit=crop&auto=format&q=80',
    'Kling 2.6 Fashion & Model Physics Masterclass': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=180&fit=crop&auto=format&q=80',
    'Product Launch Video AI — Commercial Workflow 2025': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=320&h=180&fit=crop&auto=format&q=80',
    'E-Commerce Video Ads That Convert — AI Production': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=320&h=180&fit=crop&auto=format&q=80',
    'Google Veo 3 — Complete Guide to Prompting & Audio': 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=320&h=180&fit=crop&auto=format&q=80',
    'Veo 3 vs Kling vs Runway — Which Wins for Commercial Work?': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=320&h=180&fit=crop&auto=format&q=80',
    'AI Video with Synchronized Audio — Veo 3 AudioGen': 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=320&h=180&fit=crop&auto=format&q=80',
    'Fitness Brand Reel AI — Nike Adidas Energy Level': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&h=180&fit=crop&auto=format&q=80',
    'High Energy Sports Video Prompts — Motion Language': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=320&h=180&fit=crop&auto=format&q=80',
    'HeyGen Complete Tutorial — AI Spokesperson 2025': 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=320&h=180&fit=crop&auto=format&q=80',
    'ElevenLabs + HeyGen — Full Ad Production Workflow': 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=320&h=180&fit=crop&auto=format&q=80',
    'Cinematic Brand Story — AI Narrative Filmmaking': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=320&h=180&fit=crop&auto=format&q=80',
    'Brand Storytelling Framework — The 3-Act Structure for Ads': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=320&h=180&fit=crop&auto=format&q=80',
    'Logo Animation AI — Kling + CapCut Workflow': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=320&h=180&fit=crop&auto=format&q=80',
    'Explainer Video AI — Script to Final in 1 Hour': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=320&h=180&fit=crop&auto=format&q=80',
    'Beat-Sync Video Editing — CapCut Pro Complete Guide': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=320&h=180&fit=crop&auto=format&q=80',
    'Suno AI Music for Brand Videos — Full Workflow': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=320&h=180&fit=crop&auto=format&q=80',
    'Brand Identity System — Complete AI Workflow 2025': 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=320&h=180&fit=crop&auto=format&q=80',
    'What Makes a Brand System — Not Just a Logo': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=320&h=180&fit=crop&auto=format&q=80',
    'Color Theory for Designers — Complete Foundation': 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=320&h=180&fit=crop&auto=format&q=80',
    'Brand Color Psychology — Why Colors Make You Buy': 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=320&h=180&fit=crop&auto=format&q=80',
    'Typography for Non-Designers — Complete Foundation': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&h=180&fit=crop&auto=format&q=80',
    'Brand Typography System — Choosing and Pairing Fonts': 'https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=320&h=180&fit=crop&auto=format&q=80',
    'Logo Design with AI — Professional Process 2025': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=320&h=180&fit=crop&auto=format&q=80',
    'Social Media Content System — AI Brand Strategy 2025': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=320&h=180&fit=crop&auto=format&q=80',
    'Figma — Design System at Scale': 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=320&h=180&fit=crop&auto=format&q=80',
    'Packaging Design AI — Concept to 3D Mockup': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=320&h=180&fit=crop&auto=format&q=80',
    'Dieline Packaging Design Principles for AI Designers': 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=320&h=180&fit=crop&auto=format&q=80',
    'Motion Design Principles — 12 Rules of Animation for Brands': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=180&fit=crop&auto=format&q=80',
    'Brand Motion Design — AI + CapCut Workflow': 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=320&h=180&fit=crop&auto=format&q=80',
    'How to Present Brand Identity to Clients — Professional': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=320&h=180&fit=crop&auto=format&q=80',
    'Brand Guidelines Document — What to Include': 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=320&h=180&fit=crop&auto=format&q=80',
    'AI Designer Portfolio Strategy — What Clients Actually Want': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=320&h=180&fit=crop&auto=format&q=80',
    'Portfolio Mistakes to Avoid — What Kills Your Chances': 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=320&h=180&fit=crop&auto=format&q=80',
    'How to Write a Design Case Study — Portfolio Writing': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=320&h=180&fit=crop&auto=format&q=80',
    'Case Study Examples That Get Designers Hired': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&h=180&fit=crop&auto=format&q=80',
    'Framer Portfolio Website — Complete Build in 2025': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=320&h=180&fit=crop&auto=format&q=80',
    'AI Portfolio Site — Framer + AI Tools Workflow': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=320&h=180&fit=crop&auto=format&q=80',
    'Pricing Creative Work — The Definitive Guide': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=320&h=180&fit=crop&auto=format&q=80',
    'AI Designer Rates — What to Charge in 2025': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=320&h=180&fit=crop&auto=format&q=80',
    'How to Write a Creative Proposal — Win Clients': 'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=320&h=180&fit=crop&auto=format&q=80',
    'Client Discovery Call — The 5 Questions That Win Projects': 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=320&h=180&fit=crop&auto=format&q=80',
    'Managing Your First Design Client — Everything You Need to Know': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=320&h=180&fit=crop&auto=format&q=80',
    'Client Feedback Handling — How to Not Lose Your Mind': 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=320&h=180&fit=crop&auto=format&q=80',
    'Design Showreel — How to Create a Portfolio Reel That Gets Work': 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=320&h=180&fit=crop&auto=format&q=80',
    'CapCut Pro Showreel Editing — Complete Workflow': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=320&h=180&fit=crop&auto=format&q=80',
  };
  return map[title] || 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=320&h=180&fit=crop&auto=format&q=80';
}

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
      <span style="display:flex;align-items:center;gap:6px;"><span style="width:12px;height:12px;border-radius:3px;background:var(--bg2);border:1.5px solid var(--border);display:inline-block;"></span>Upcoming</span>
    </div>
  </div>`;
  updateTopbar();
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  LESSON BUILD                                                    ║
// ╚══════════════════════════════════════════════════════════════════╝

// ─── FORMAT ASSIGNMENT DESCRIPTION INTO RICH HTML ─────────────────
function formatAssignDesc(raw){
  if(!raw) return '';
  // Only return the intro paragraph (before the first ✅)
  const goodSplit = raw.split(/\n\n✅/);
  const intro = goodSplit[0].replace(/\n/g,'<br>');
  return '<div class="assign-intro">'+intro+'</div>';
}

// Returns the good/bad example blocks to show AFTER deliverables
function formatAssignExamples(raw){
  if(!raw) return '';
  const goodSplit = raw.split(/\n\n✅/);
  if(goodSplit.length < 2) return '';
  const rest = goodSplit[1];
  const badSplit = rest.split(/\n\n❌/);
  const goodText = badSplit[0].replace(/\n/g,'<br>');
  const goodHtml = '<div class="assign-example good-example"><div class="example-label">✅ Good Example</div><div class="example-body">'+goodText+'</div></div>';
  let badHtml = '';
  if(badSplit.length > 1){
    const badText = badSplit[1].replace(/\n/g,'<br>');
    badHtml = '<div class="assign-example bad-example"><div class="example-label">❌ Common Mistake</div><div class="example-body">'+badText+'</div></div>';
  }
  return goodHtml + badHtml;
}

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
  const delivs=lesson.assignment.deliverables.map((d,i)=>{
    // Make first deliverable reference 'the assignment details above' instead of repeating them
    const text = i===0 ? d.replace(/using all 5 layers/g,'using all 5 layers from the brief above')
                          .replace(/Write a full prompt/g,'Write your prompt')
                        : d;
    return `<div class="deliverable-row"><span class="chk">▸</span><span>${text}</span></div>`;
  }).join('');

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

    <div id="panel-lesson-${day}" class="lesson-panel"></div>
    <div id="panel-refs-${day}" class="lesson-panel" style="display:none;">${refsHtml}</div>
    <div id="panel-videos-${day}" class="lesson-panel" style="display:none;">${videosHtml}</div>
    <div id="panel-inspo-${day}" class="lesson-panel" style="display:none;">${inspoHtml}</div>
    <div id="panel-assign-${day}" class="lesson-panel" style="display:none;">
      <div class="assignment-card">
        <div class="assign-header">
          <div class="assign-icon">${lesson.assignment.emoji}</div>
          <div><div class="assign-label">📌 Day ${day} Assignment</div><div class="assign-title">${lesson.assignment.title}</div></div>
        </div>
        <div class="assign-desc">${formatAssignDesc(lesson.assignment.desc)}</div>
        <div class="deliverables-grid">${delivs}</div>
        <div class="assign-examples-block">${formatAssignExamples(lesson.assignment.desc)}</div>
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

  <div class="multi-upload-zone" id="dz-${day}"
       ondragover="muDragOver(event,'${day}')"
       ondragleave="muDragLeave('${day}')"
       ondrop="muDrop(event,'${day}')">
    <!-- EMPTY STATE -->
    <label class="multi-upload-empty" id="mu-empty-${day}" for="mu-fi-${day}">
      <div class="drop-icon">📥</div>
      <div class="drop-title">Drop images here or click to add</div>
      <div class="drop-sub">PNG, JPG, WEBP · Up to 5 images</div>
    </label>
    <input type="file" id="mu-fi-${day}" accept="image/*" multiple
           onchange="muAdd(event,'${day}')"
           style="display:none;">
    <!-- IMAGES GRID (shown when images added) -->
    <div class="multi-imgs-grid" id="mu-grid-${day}" style="display:none;"></div>
    <!-- FOOTER -->
    <div class="multi-upload-footer" id="mu-footer-${day}" style="display:none;">
      <span id="mu-count-${day}">0 / 5 images</span>
      <label class="add-more-btn" id="mu-addbtn-${day}" for="mu-fi-${day}">
        ＋ Add More
      </label>
    </div>
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

      ${done?`<div style="text-align:center;padding:12px 16px;color:var(--green);font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;gap:10px;">✅ Day ${day} complete <button onclick="unmarkDone(${day})" style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:6px;border:1px solid #ef4444;background:none;color:#ef4444;cursor:pointer;margin-left:4px;">↩ Undo</button></div>`:''}
    </div>`;

  // Inject lesson HTML into the lesson panel after scaffold render.
  // This prevents malformed lesson markup from escaping into sibling panels.
  const lessonPanelEl=document.getElementById(`panel-lesson-${day}`);
  if(lessonPanelEl) lessonPanelEl.innerHTML=lesson.content;

  // Nav bar
  document.getElementById('lesson-nav-bar').innerHTML=`
    <button class="nav-btn" onclick="goToDay(${prevDay})" ${!prevDay?'disabled':''}>← Day ${prevDay||'-'}</button>
    ${done?`<button class="nav-btn done-btn" onclick="unmarkDone(${day})" title="Click to undo">✅ Completed — Undo?</button>`:'<button class="nav-btn primary" onclick="markDone('+day+')">Mark Complete ✓</button>'}
    <button class="nav-btn" onclick="goToDay(${nextDay})" ${!nextDay?'disabled':''}>Day ${nextDay||'-'} →</button>`;

  document.title=`Day ${day} of 45 — ${lesson.title} | AI Design Pro`;
  updateTopbar(); window.scrollTo(0,0);
}

function switchLearnTab(btn,panelId){
  document.querySelectorAll('#lesson-tabs-bar .ltab').forEach(t=>t.classList.remove('active'));
  const contentArea=document.getElementById('lesson-content-area');
  if(contentArea) contentArea.querySelectorAll('.lesson-panel').forEach(p=>p.style.display='none');
  btn.classList.add('active');
  const el=document.getElementById(`panel-${panelId}`);
  if(el){
    el.style.display='block';
    el.scrollIntoView({behavior:'smooth',block:'start'});
  }
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

    console.log("API RESPONSE:", data);

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

  // Use imgpData (drag/drop) first, fall back to file input
  const fileInput = document.getElementById("imgp-fi");
  const file = fileInput.files[0];
  const base64Source = imgpData || null;

  const output = document.getElementById("imgp-result");
  const btn = document.getElementById("imgp-btn");
  const context = document.getElementById("imgp-context").value.trim();

  if(!base64Source && !file){
    alert("Please upload an image first");
    return;
  }

  const RETRY_MAX = 3;
  const TIMEOUT_MS = 35000; // 35 seconds — enough for free tier vision models
  let retryCount = 0;

  // ── Per-mode dedicated system prompts ──────────────────────────────────────
  // Each mode has a completely separate, precise instruction set so the AI
  // cannot confuse modes or produce generic output.
  const MODE_PROMPTS = {

    recreate: `You are a world-class AI prompt engineer specialising in photographic reconstruction.

Your ONLY job: write ONE single Midjourney prompt that would recreate the uploaded image as accurately as possible.

ANALYSE the image for:
- SUBJECT: exact description (age range, gender, clothing colours/materials, pose, expression, skin tone, hair)
- ENVIRONMENT: exact location type, background elements, depth, props
- LIGHTING: direction (front/side/back), quality (hard/soft/diffused), colour temperature (warm/cool/neutral), source type (natural/artificial/studio)
- CAMERA: angle (eye-level/high/low/dutch), lens feel (wide/standard/telephoto), depth of field (shallow/deep), focus point
- STYLE: photographic style reference (e.g. Kinfolk editorial, Helmut Newton, Annie Leibovitz, product photography, etc.)
- COLOUR: dominant palette, tones, saturation level
- TECHNICAL: aspect ratio estimate, any post-processing feel (matte, film grain, clean digital)

OUTPUT FORMAT — write ONE professional Midjourney prompt in this structure:
[detailed subject description], [environment/setting], [lighting description], [camera angle and lens], [photographic style reference], [colour palette], [mood], --ar [ratio] --no [things to avoid]

RULES:
- NO headers, NO labels, NO explanation — just the raw prompt
- NO generic words: no "beautiful", "nice", "stunning", "amazing"
- EVERY word must describe something visually specific and real
- Minimum 60 words, maximum 120 words
- The prompt must be copy-pasteable directly into Midjourney`,

    adscene: `You are a world-class commercial director and AI prompt engineer.

Your ONLY job: take the subject/product from the uploaded image and write ONE Midjourney/Kling prompt that places it in a dramatic cinematic advertising scene.

STEP 1 — identify from the image:
- The PRIMARY SUBJECT or PRODUCT (what is it exactly — describe material, colour, form)
- Any brand cues or product category

STEP 2 — write a cinematic ad scene prompt with:
- SUBJECT: keep the exact product/subject description from the image
- SCENE: dramatic, premium environment that matches the product category (e.g. perfume → misty mountains at golden hour, headphones → neon-lit Tokyo rooftop)
- LIGHTING: cinematic — directional, dramatic, with lens flare or atmospheric haze if appropriate
- CAMERA: specific cinematic shot type (extreme close-up, low angle hero shot, Dutch angle, birds-eye)
- STYLE: reference a real director or film aesthetic (Christopher Nolan, Roger Deakins cinematography, Denis Villeneuve, Nike ad aesthetic, Apple product reveal style)
- MOOD: the emotional feeling the ad should evoke
- COLOUR GRADE: specific LUT or colour palette (teal-orange blockbuster grade, desaturated moody, warm analogue film)

OUTPUT FORMAT — write ONE professional prompt in this structure:
[product/subject description], [cinematic environment], [dramatic lighting], [camera shot type], [director/film style reference], [colour grade], [mood/emotion], --ar 16:9 --no [things to avoid]

RULES:
- NO headers, NO labels, NO explanation — just the raw prompt
- NO generic words — every word must be visually specific
- Minimum 60 words, maximum 130 words
- Copy-pasteable directly into Midjourney or Kling`,

    both: `You are a world-class AI prompt engineer and commercial creative director.

Your ONLY job: analyse the uploaded image and write TWO separate professional prompts.

PROMPT 1 — RECREATE (exact reproduction):
Analyse and reconstruct: subject details, environment, lighting direction and quality, camera angle, lens feel, photographic style, colour palette, aspect ratio.
Write ONE Midjourney prompt that would reproduce this image as closely as possible.
Format: [subject] [environment] [lighting] [camera/lens] [style reference] [colour palette] [mood] --ar [ratio] --no [avoid]

PROMPT 2 — AD SCENE (cinematic transformation):
Keep the same subject/product but transform it into a premium advertising scene.
Add: dramatic lighting, cinematic environment appropriate for the product category, specific director/film style reference, strong colour grade, emotional mood.
Format: [product description] [cinematic environment] [dramatic lighting] [shot type] [director style] [colour grade] [mood] --ar 16:9 --no [avoid]

OUTPUT FORMAT — respond EXACTLY like this, nothing else:
🔁 RECREATE PROMPT:
[your recreate prompt here]

🎬 AD SCENE PROMPT:
[your ad scene prompt here]

RULES:
- NO extra explanation, NO preamble, NO headers beyond the two labels above
- Each prompt: minimum 50 words, maximum 120 words
- NO generic adjectives — every word must be visually specific and actionable`,

    vocab: `You are a professional photography and AI design educator.

Your ONLY job: analyse the uploaded image and break it down using the professional 5-layer prompt vocabulary framework used by top AI designers.

For EACH layer, give:
1. The specific term(s) that describe what you see
2. Why those terms matter for recreating this image

OUTPUT FORMAT — respond EXACTLY like this:

SUBJECT
Term(s): [e.g. "30-year-old woman, tailored navy blazer, relaxed confident posture"]
Why it matters: [1 sentence]

ACTION / STATE
Term(s): [e.g. "standing with arms crossed, slight head tilt, direct gaze"]
Why it matters: [1 sentence]

ENVIRONMENT
Term(s): [e.g. "modern glass office lobby, marble floor, blurred background figures"]
Why it matters: [1 sentence]

LIGHTING
Term(s): [e.g. "soft directional window light from camera left, cool 5600K, subtle fill from right"]
Why it matters: [1 sentence]

STYLE & CAMERA
Term(s): [e.g. "Kinfolk editorial photography, Canon EOS R5 85mm f/1.8, shallow depth of field, slightly desaturated film-like tones"]
Why it matters: [1 sentence]

COPY-READY PROMPT
[Combine all layers into one professional Midjourney prompt the user can copy directly]

RULES:
- Be specific — no vague terms like "professional" or "nice"
- Use real photography vocabulary: lighting angles, camera specs, style references
- Every term must be something you can actually type into Midjourney`
  };

  async function runAnalysis(){

    btn.disabled = true;
    btn.textContent = retryCount === 0 ? "Analyzing image..." : "Retrying...";

    // Loading UI
    output.innerHTML = `
      <div class="fixer-placeholder">
        <div style="display:flex;align-items:center;gap:10px;justify-content:center;">
          <div class="loading-dots"><span></span><span></span><span></span></div>
          <span style="color:var(--muted);font-size:13px;">
            ${retryCount === 0 ? 'Analyzing your image...' : 'Retrying... (attempt '+(retryCount+1)+' of '+RETRY_MAX+')'}
          </span>
        </div>
      </div>
    `;

    // AbortController for fast timeout — don't make user wait 60+ seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try{

      const base64 = base64Source || await toBase64(file);
      const systemPrompt = MODE_PROMPTS[imgpMode] || MODE_PROMPTS.both;

      const res = await fetch("https://ai-proxy.akashsaha-rock666.workers.dev",{
        method:"POST",
        signal: controller.signal,
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          messages:[
            {
              role:"system",
              content: systemPrompt + (context ? "\n\nUSER CONTEXT: " + context : "")
            },
            {
              role:"user",
              content:[
                { type:"text", text:"Analyze this image and produce your output now." },
                { type:"image_url", image_url:{ url: base64 } }
              ]
            }
          ]
        })
      });

      clearTimeout(timeoutId);

      // Detect server error immediately before parsing
      if(!res.ok){
        throw new Error('SERVER_ERROR_' + res.status);
      }

      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content?.trim();

      // Validate — minimum meaningful response
      if(!text || text.length < 40){
        throw new Error('WEAK_RESPONSE');
      }

      // ✅ Success — render output
      const modeLabels = {
        recreate: '🔁 Recreate Prompt — Ready for Midjourney',
        adscene:  '🎬 Ad Scene Prompt — Ready for Midjourney / Kling',
        both:     '✨ Both Prompts — Ready to Copy',
        vocab:    '📚 Vocabulary Breakdown'
      };

      output.innerHTML = `
        <div class="imgp-output-label">${modeLabels[imgpMode] || 'Generated Prompt'}</div>
        <div class="imgp-output-prompt" style="white-space:pre-wrap;">${text}</div>
      `;
      btn.disabled = false;
      btn.textContent = "🖼 Generate Prompt from Image";

    } catch(err){
      clearTimeout(timeoutId);
      console.error(err);
      retryCount++;

      const isTimeout = err.name === 'AbortError';
      const isBusy = isTimeout || (err.message && (err.message.includes('SERVER_ERROR') || err.message.includes('WEAK_RESPONSE')));
      const canRetry = retryCount < RETRY_MAX;

      const errLabel = isTimeout
        ? '⏱ AI is taking too long. It may be busy right now.'
        : isBusy
        ? '⚠️ AI is busy right now. Please try again.'
        : '❌ Connection error. Please check your internet and try again.';

      output.innerHTML = `
        <div style="padding:16px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px;">
          <div style="font-size:13px;font-weight:700;color:#991b1b;margin-bottom:${canRetry ? '12px' : '4px'};">${errLabel}</div>
          ${canRetry
            ? `<button onclick="retryImgPrompt()" style="padding:8px 18px;background:var(--purple,#7c3aed);color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:13px;">🔄 Retry (${retryCount}/${RETRY_MAX})</button>`
            : `<div style="font-size:12px;color:#991b1b;">Maximum retries reached. Please wait a moment and try again.</div>`
          }
        </div>
      `;
      btn.disabled = false;
      btn.textContent = "🖼 Generate Prompt from Image";
    }
  }

  window.retryImgPrompt = runAnalysis;
  await runAnalysis();
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
function dzOver2(e){e.preventDefault();const z=document.getElementById('imgp-dz');if(z){z.classList.add('over');z.querySelector('.drop-title').textContent='Drop to upload';}}
function dzLeave2(){const z=document.getElementById('imgp-dz');if(z){z.classList.remove('over');const t=z.querySelector('.drop-title');if(t)t.textContent='Drop product/character image here';}}
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

  console.log("🔥 buildToolsView triggered");

  try {

    const filterEl = document.getElementById('tools-filter');
    const gridEl = document.getElementById('tools-grid');

    console.log("Filter Element:", filterEl);
    console.log("Grid Element:", gridEl);

    if (!filterEl || !gridEl) {
      console.error("❌ tools-filter or tools-grid not found in HTML");
      return;
    }

    if (!window.TOOLS_DATA) {
      console.error("❌ TOOLS_DATA is undefined");
      gridEl.innerHTML = "❌ TOOLS_DATA not found";
      return;
    }

    console.log("TOOLS_DATA:", TOOLS_DATA);

    const cats = ['All','Image','Video','Audio','Design'];

    filterEl.innerHTML = cats.map(c => `
      <button class="tf-btn ${c===toolsFilter?'active':''}" onclick="filterTools('${c}')">
        ${c}
      </button>
    `).join('');

    const filtered = toolsFilter === 'All'
      ? window.TOOLS_DATA
      : TOOLS_DATA.filter(t => t.cat === toolsFilter);

    console.log("Filtered Tools:", filtered);

    if (!filtered.length) {
      console.warn("⚠️ No tools found for filter:", toolsFilter);
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

    console.log("✅ Tools rendered successfully");

  } catch (e) {
    console.error("❌ ERROR in buildToolsView:", e);
    document.getElementById('tools-grid').innerHTML = "❌ Error loading tools. Check console.";
  }
}

function filterTools(cat){
  console.log("🔁 Filter clicked:", cat);
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
  const input  = document.getElementById('sub-'+day);
  const btn    = document.getElementById('sbtn-'+day);
  const fb     = document.getElementById('fb-'+day);
  const fbt    = document.getElementById('fbt-'+day);
  const lesson = LESSONS?.[day];

  const submission = input.value.trim();

  if(!submission || submission.length < 20){
    fbt.innerHTML = '<span style="color:var(--red)">Please write a more detailed submission before getting feedback.</span>';
    fb.classList.add('show');
    return;
  }

  if(!lesson || !lesson.assignment){
    fbt.innerHTML = '<span style="color:var(--red)">Assignment data missing for this day.</span>';
    fb.classList.add('show');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Getting feedback...';
  fb.classList.add('show');
  fbt.innerHTML = '<div style="display:flex;align-items:center;gap:10px;"><div class="loading-dots"><span></span><span></span><span></span></div><span style="color:var(--muted);font-size:13px;">AI instructor is reviewing your prompt...</span></div>';

  // Build strict assignment-specific system prompt
  const systemPrompt = lesson.assignment.systemPrompt ||
    'You are a strict senior AI prompt engineering instructor. Review the student submission against the specific assignment requirements. Be direct, specific, and actionable.';

  const assignContext = `ASSIGNMENT: ${lesson.assignment.title}

WHAT WAS REQUIRED:
${lesson.assignment.desc.replace(/✅[\s\S]*?(?=❌|$)/,'').replace(/❌[\s\S]*/,'').trim()}

SPECIFIC DELIVERABLES REQUIRED:
${lesson.assignment.deliverables.map((d,i)=>(i+1)+'. '+d).join('\n')}`;

  try{
    const res = await aiCall({
      model:'openrouter/auto',
      messages:[
        {
          role:'system',
          content: systemPrompt + `

CRITICAL RULES:
- Evaluate ONLY against this specific assignment — not general design quality
- Reference the specific deliverables the student was asked to complete
- Be strict: if a deliverable is missing, call it out by name
- If the student pasted a prompt, evaluate it layer by layer
- Keep feedback under 200 words total
- End with a score X/10 based on how many deliverables were completed

OUTPUT FORMAT:
Assignment Match: [percentage of deliverables completed]

What you did well:
- [specific to this assignment]

What is missing or weak:
- [reference specific deliverables they missed]

How to improve:
- [actionable, specific to this prompt/assignment]

Score: X/10`
        },
        {
          role:'user',
          content: assignContext + '\n\nSTUDENT SUBMISSION:\n' + submission
        }
      ]
    });

    const data = res;
    const text = data?.choices?.[0]?.message?.content || data?.content?.[0]?.text || '';
    if(!text) throw new Error('Empty response');

    fbt.innerHTML = '<div style="line-height:1.8;font-size:13.5px;">'
      + text.replace(/\n/g,'<br>')
            .replace(/Assignment Match:/g,'<strong style="color:var(--primary);">Assignment Match:</strong>')
            .replace(/What you did well:/g,'<br><strong style="color:#16a34a;">What you did well:</strong>')
            .replace(/What is missing or weak:/g,'<br><strong style="color:#dc2626;">What is missing or weak:</strong>')
            .replace(/How to improve:/g,'<br><strong style="color:#7c3aed;">How to improve:</strong>')
            .replace(/Score:/g,'<br><strong style="font-size:15px;">Score:</strong>')
      + '</div>';

    btn.textContent = '✦ Resubmit for More Feedback';
    btn.disabled = false;

  }catch(e){
    console.error(e);
    fbt.innerHTML = '<span style="color:var(--red)">❌ Could not get feedback. Try again.</span>';
    btn.textContent = '✦ Retry';
    btn.disabled = false;
  }
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  IMAGE FEEDBACK                                                  ║
// ╚══════════════════════════════════════════════════════════════════╝
const imgData={};
// ─── IMAGE ANALYSIS CACHE & STATE (added v7) ─────────────────────────────
let analysisCache = JSON.parse(localStorage.getItem('aiCourseAnalysisCache') || '{}');
let analysisState = {};

function saveAnalysisCache(){
  try{ localStorage.setItem('aiCourseAnalysisCache', JSON.stringify(analysisCache)); }catch(e){}
}

async function sha256Hash(str){
  const buf = new TextEncoder().encode(str);
  const hashBuf = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hashBuf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

function getAnalysisState(day){
  if(!analysisState[day]){
    analysisState[day]={day,isLoading:false,hasError:false,errorMessage:'',retryCount:0,maxRetries:5,uploadedImages:[],imageHashes:[]};
  }
  return analysisState[day];
}

// ─── MULTI-IMAGE UPLOAD HANDLERS v8 ─────────────────────────────────────────
function muDragOver(e, day){ e.preventDefault(); const z=document.getElementById('dz-'+day); if(z) z.classList.add('over'); }
function muDragLeave(day){ const z=document.getElementById('dz-'+day); if(z) z.classList.remove('over'); }
function muDrop(e, day){ e.preventDefault(); muDragLeave(day); muAdd({target:{files:e.dataTransfer.files}}, day); }

async function muAdd(e, day){
  const st = getAnalysisState(day);
  const files = Array.from(e.target.files||[]).filter(f=>f.type.startsWith('image/'));
  const slots = 5 - st.uploadedImages.length;
  const toAdd = files.slice(0, slots);
  for(const file of toAdd){
    await new Promise(res=>{
      const r = new FileReader();
      r.onload = async ev=>{
        const data = ev.target.result;
        const hash = await sha256Hash(data);
        st.uploadedImages.push(data);
        st.imageHashes.push(hash);
        res();
      };
      r.readAsDataURL(file);
    });
  }
  // Also keep legacy imgData in sync
  if(st.uploadedImages.length > 0) imgData[day] = st.uploadedImages[0];
  muRender(day);
  // reset file input so same file can be re-added after remove
  if(e.target) e.target.value='';
}

function muRender(day){
  const st = getAnalysisState(day);
  const empty = document.getElementById('mu-empty-'+day);
  const grid  = document.getElementById('mu-grid-'+day);
  const footer= document.getElementById('mu-footer-'+day);
  const count = document.getElementById('mu-count-'+day);
  const zone  = document.getElementById('dz-'+day);
  const n = st.uploadedImages.length;
  if(!grid) return;
  if(n === 0){
    if(empty) empty.style.display='';
    grid.style.display = 'none';
    if(footer) footer.style.display = 'none';
    if(zone) zone.classList.remove('has-images');
    return;
  }
  if(empty) empty.style.display = 'none';
  grid.style.display = '';
  if(footer){ footer.style.display=''; }
  if(count) count.textContent = n+' / 5 image'+(n!==1?'s':'');
  if(zone) zone.classList.add('has-images');
  // Hide add-more button if at limit
  const addBtn = document.getElementById('mu-addbtn-'+day);
  if(addBtn) addBtn.style.display = n >= 5 ? 'none' : '';
  // Render grid cells + add-more slot
  const addSlot = n < 5
    ? `<label class="multi-img-cell add-slot" for="mu-fi-${day}" title="Add more images">
        <div class="cell-add"><span>＋</span>Add</div>
       </label>`
    : '';
  grid.innerHTML = st.uploadedImages.map((img,i)=>`
    <div class="multi-img-cell">
      <img src="${img}" alt="Image ${i+1}">
      <button class="cell-remove" onclick="muRemove('${day}',${i})" title="Remove">✕</button>
    </div>
  `).join('') + addSlot;
}

function muRemove(day, index){
  const st = getAnalysisState(day);
  st.uploadedImages.splice(index,1);
  st.imageHashes.splice(index,1);
  if(st.uploadedImages.length > 0){ imgData[day]=st.uploadedImages[0]; }
  else { delete imgData[day]; }
  muRender(day);
}
let imgMode='overall composition, visual balance, and professional quality';

function setImgMode(btn){
  document.querySelectorAll('.img-mode-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  imgMode=btn.dataset.mode;
}
function dzOver(e,day){e.preventDefault();document.getElementById(`dz-${day}`).classList.add('over');}
function dzLeave(day){document.getElementById(`dz-${day}`).classList.remove('over');}
function dzDrop(e,day){
  e.preventDefault(); dzLeave(day);
  muAdd({target:{files:e.dataTransfer.files}}, day);
}
function dzFile(e,day){
  muAdd(e, day);
}
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
  const st = getAnalysisState(day);
  const note = document.getElementById('inote-'+day)?.value.trim()||'';
  const btn  = document.getElementById('isbtn-'+day);
  const fb   = document.getElementById('ifb-'+day);
  const fbt  = document.getElementById('ifbt-'+day);
  const lesson = LESSONS?.[day];

  // Use multi-image if available, fall back to legacy single image
  const images = st.uploadedImages.length > 0 ? st.uploadedImages : (imgData[day] ? [imgData[day]] : []);
  const hashes = st.imageHashes.length > 0 ? st.imageHashes : [];
  if(hashes.length === 0 && images.length > 0){
    const h = await sha256Hash(images[0]);
    hashes.push(h);
  }

  if(!images.length){
    fb.classList.add('show');
    fbt.innerHTML = '<span style="color:var(--red)">Please upload an image first.</span>';
    return;
  }
  if(!lesson || !lesson.assignment){
    fb.classList.add('show');
    fbt.innerHTML = '<span style="color:var(--red)">❌ Assignment data missing.</span>';
    return;
  }

  // ── CACHE CHECK ─────────────────────────────────────────────────────────
  const noteHash = await sha256Hash(note);
  const cacheKey = hashes.join('_')+'_'+noteHash+'_day'+day;
  if(analysisCache[cacheKey]){
    fb.classList.add('show');
    fbt.innerHTML = analysisCache[cacheKey];
    if(btn){ btn.disabled=false; btn.textContent='🔍 Analyze My Image — Get Expert Feedback'; }
    return;
  }

  // ── LOADING STATE ────────────────────────────────────────────────────────
  st.isLoading = true; st.hasError = false;
  if(btn){ btn.disabled=true; btn.textContent='Analyzing...'; }
  fb.classList.add('show');

  const messages = ['Analyzing your image...','Understanding assignment intent...','Evaluating composition and details...','Generating professional feedback...','Almost done...'];
  let mi=0;
  const ticker = setInterval(()=>{
    fbt.innerHTML = '<div style="display:flex;align-items:center;gap:10px;"><div class="loading-dots"><span></span><span></span><span></span></div><span style="color:var(--muted);font-size:13px;">'+messages[mi%messages.length]+'</span></div>';
    mi++;
  }, 2000);
  fbt.innerHTML = '<div style="display:flex;align-items:center;gap:10px;"><div class="loading-dots"><span></span><span></span><span></span></div><span style="color:var(--muted);font-size:13px;">Analyzing your image...</span></div>';

  try{
    let result=null, attempts=0;
    const maxAttempts = 8;

    while(!result && attempts < maxAttempts){
      try{
        const imageUrl = images[0].startsWith('data:') ? images[0] : 'data:image/png;base64,'+images[0];
        const res = await fetch('https://ai-proxy.akashsaha-rock666.workers.dev',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            model:'openrouter/free',
            messages:[
              {role:'system', content:'You are a strict senior AI design instructor.\n\nEvaluate the uploaded image ONLY based on the assignment.\n\nASSIGNMENT:\n'+lesson.assignment.title+'\n\nDESCRIPTION:\n'+lesson.assignment.desc+'\n\nOUTPUT FORMAT:\n\nMatch Score: X/10\n\nAssignment Match:\n- Yes / Partially / No (reason)\n\nWhat works:\n- ...\n\nWhat is missing:\n- ...\n\nHow to improve:\n- ...\n\nImproved Prompt:\n- (clean professional prompt)\n\nRULES:\n- Be strict\n- No generic feedback\n- Focus on assignment match\n- Keep under 150 words'},
              {role:'user', content:[{type:'image_url',image_url:{url:imageUrl}},{type:'text',text:'Student note: '+(note||'none')+(images.length>1?' ['+images.length+' images uploaded, evaluating primary image]':'')}]}
            ]
          })
        });
        if(!res.ok){ attempts++; await new Promise(r=>setTimeout(r,1200)); continue; }
        const dataRes = await res.json();
        const text = dataRes?.choices?.[0]?.message?.content;
        if(text && text.trim().length>40){ result=text.trim(); }
        else{ attempts++; await new Promise(r=>setTimeout(r,1200)); }
      }catch(innerErr){ attempts++; await new Promise(r=>setTimeout(r,1200)); }
    }

    clearInterval(ticker);
    st.isLoading=false;

    if(!result){
      // All attempts exhausted — show error + retry/refresh buttons
      st.hasError=true; st.retryCount++;
      const errMsg = st.retryCount >= st.maxRetries
        ? '❌ Maximum retry attempts (5) reached. The server may be temporarily unavailable.'
        : '⚠️ Server error — try again later.';
      fbt.innerHTML = '<div style="margin-bottom:12px;color:var(--muted);">'+errMsg+'</div>'
        +(st.retryCount < st.maxRetries
          ? '<button onclick="submitImgFeedback('+day+')" style="padding:8px 18px;background:var(--primary);color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;margin-right:10px;">🔄 Retry ('+st.retryCount+'/'+st.maxRetries+')</button>'
          : '<button onclick="location.reload()" style="padding:8px 18px;background:var(--primary);color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;margin-right:10px;">🔄 Refresh Page</button>')
        +'<button onclick="resetImgFeedback('+day+')" style="padding:8px 18px;background:var(--bg2);color:var(--text);border:1px solid var(--border);border-radius:6px;cursor:pointer;">← Back</button>';
      if(btn){ btn.disabled=(st.retryCount>=st.maxRetries); btn.textContent='🔍 Analyze My Image — Get Expert Feedback'; }
      return;
    }

    // ── SUCCESS ────────────────────────────────────────────────────────────
    st.retryCount=0; st.hasError=false;
    const html = '<div style="line-height:1.7;">'
      +result.replace(/\n/g,'<br>')
        .replace(/Match Score:/g,'<br><strong style="color:#22c55e;">Match Score:</strong>')
        .replace(/Assignment Match:/g,'<br><strong>Assignment Match:</strong>')
        .replace(/What works:/g,'<br><strong>What works:</strong>')
        .replace(/What is missing:/g,'<br><strong>What is missing:</strong>')
        .replace(/How to improve:/g,'<br><strong>How to improve:</strong>')
        .replace(/Improved Prompt:/g,'<br><strong style="color:#7c3aed;">Improved Prompt:</strong>')
      +'</div>';

    // Cache it
    analysisCache[cacheKey] = html;
    saveAnalysisCache();

    fbt.innerHTML = html;
    if(btn){ btn.disabled=false; btn.textContent='🔍 Analyze My Image — Get Expert Feedback'; }

  }catch(e){
    clearInterval(ticker);
    st.isLoading=false; st.hasError=true; st.retryCount++;
    const errMsg = e.message && e.message.includes('fetch')
      ? 'Failed to analyze image — check your internet connection.'
      : 'Server error — try again later.';
    fbt.innerHTML = '<div style="margin-bottom:12px;color:var(--muted);">'+errMsg+'</div>'
      +(st.retryCount < st.maxRetries
        ? '<button onclick="submitImgFeedback('+day+')" style="padding:8px 18px;background:var(--primary);color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;margin-right:10px;">🔄 Retry ('+st.retryCount+'/'+st.maxRetries+')</button>'
        : '<button onclick="location.reload()" style="padding:8px 18px;background:var(--primary);color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;margin-right:10px;">🔄 Refresh Page</button>')
      +'<button onclick="resetImgFeedback('+day+')" style="padding:8px 18px;background:var(--bg2);color:var(--text);border:1px solid var(--border);border-radius:6px;cursor:pointer;">← Back</button>';
    if(btn){ btn.disabled=(st.retryCount>=st.maxRetries); btn.textContent='🔍 Analyze My Image — Get Expert Feedback'; }
  }
}

function resetImgFeedback(day){
  const st = getAnalysisState(day);
  st.uploadedImages=[]; st.imageHashes=[]; st.hasError=false; st.retryCount=0; st.isLoading=false;
  delete imgData[day];
  const fb=document.getElementById('ifb-'+day);
  const fb2=document.getElementById('fb-'+day);
  const ipb=document.getElementById('ipb-'+day);
  const dz=document.getElementById('dz-'+day);
  const mp=document.getElementById('multi-prev-'+day);
  const btn=document.getElementById('isbtn-'+day);
  if(fb) fb.classList.remove('show');
  if(fb2) fb2.classList.remove('show');
  if(ipb) ipb.classList.remove('show');
  if(dz) dz.style.display='';
  if(mp){ mp.innerHTML=''; mp.style.display='none'; }
  if(btn){ btn.disabled=false; btn.textContent='🔍 Analyze My Image — Get Expert Feedback'; }
}
// ╔══════════════════════════════════════════════════════════════════╗
// ║  NAVIGATION                                                      ║
// ╚══════════════════════════════════════════════════════════════════╝
const VIEWS=['dashboard','learn','vocab','builder','tools','projects','saved'];

function showView(view){

  console.log("🔄 Switching to view:", view);

  state.currentView = view;

  // 🔥 Hide all views
  VIEWS.forEach(v => {
    const el = document.getElementById(`${v}-view`);
    if(el){
      el.style.display = 'none';
    } else {
      console.warn(`❌ Missing view: ${v}-view`);
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
    console.log("✅ View shown:", viewMap[view]);
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

  console.log(`[${timestamp}] ${level}: ${message}`, data || '');
  */
  // No-op while debug logging is commented out.
}

function goLogin() {
  const isOnLogin = window.location.pathname.endsWith('/login.html') || window.location.pathname.endsWith('login.html');
  _log('WARNING', 'goLogin() called', { currentPath: window.location.pathname, willRedirect: !isOnLogin });
  if (!isOnLogin) {
    _log('WARNING', 'Redirecting to login.html', { from: window.location.href });
    window.location.href = 'login.html';
  }
}

// ── Auth guard: runs before anything else ──
async function initAuth() {
  _log('INFO', 'initAuth() starting', { timestamp: new Date().toISOString() });
  try {
    const { data: { session } } = await _sb.auth.getSession();
    _authBootstrapped = true;
    _log('INFO', 'Session retrieved', { hasSession: !!session, userId: session?.user?.id });
    if (!session) {
      _log('ERROR', 'No session found, redirecting to login');
      goLogin();
      return;
    }
    _user  = session.user;
    _token = session.access_token;
    _log('SUCCESS', 'User authenticated', { userId: _user.id, email: _user.email });
    await loadCloudProgress();
    _renderUserMenu(_user);
    document.getElementById('auth-guard').style.display = 'none';
    document.getElementById('user-menu').style.display  = 'flex';
    buildSidebar();
    _log('INFO', 'UI initialized and displayed');
    showView(state.currentView || 'dashboard');
  } catch(e) {
    _log('ERROR', 'Auth error in initAuth', { error: e.message, stack: e.stack });
    goLogin();
  }
}

// Auto-refresh token + handle sign-out from another tab
_sb.auth.onAuthStateChange((event, session) => {
  _log('INFO', 'onAuthStateChange fired', { event, hasSession: !!session, bootstrapped: _authBootstrapped });
  if (event === 'TOKEN_REFRESHED' && session) {
    _token = session.access_token;
    _log('INFO', 'Token refreshed');
  }
  if (event === 'SIGNED_OUT' || !session) {
    _log('WARNING', 'Auth state listener: no session detected, redirecting', { event, session: !!session });
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
  _log('INFO', 'doLogout() called');
  await _sb.auth.signOut();
  _log('INFO', 'signOut() completed');
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
  _log('INFO', 'aiCall() starting', { hasToken: !!_token, method: body.method });
  if (!_token) {
    _log('INFO', 'No token, fetching fresh session');
    const { data: { session } } = await _sb.auth.getSession();
    if (!session) {
      _log('ERROR', 'No session for aiCall, redirecting');
      goLogin();
      throw new Error('Not authenticated');
    }
    _token = session.access_token;
    _log('INFO', 'Token acquired from session');
  }
  let res = await fetch(WORKER_URL, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + _token
    },
    body: JSON.stringify(body)
  });

  _log('INFO', 'API response', { status: res.status });

  // A stale access token can temporarily return 401; refresh once before redirecting.
  if (res.status === 401) {
    _log('WARNING', 'Got 401, attempting token refresh');
    const { data: { session } } = await _sb.auth.getSession();
    if (session?.access_token) {
      _token = session.access_token;
      _log('INFO', 'Token refreshed, retrying request');
      res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + _token
        },
        body: JSON.stringify(body)
      });
      _log('INFO', 'Retry response', { status: res.status });
    }
  }

  if (res.status === 401) {
    _log('ERROR', 'Still 401 after retry, redirecting to login');
    goLogin();
    throw new Error('Session expired');
  }
  return res.json();
}

// Boot — everything waits for auth
_log('INFO', 'PAGE LOAD: index.html', { timestamp: new Date().toISOString(), pathname: window.location.pathname });
initAuth();
