// progress.js — ระบบความคืบหน้าของคอร์สแบบ one-page (คอร์ส 2)
// - แสดงบทเรียนถึงบทปัจจุบันเท่านั้น บทถัดไปต้องกดปุ่ม "ปลดล็อกบทต่อไป"
// - เก็บสถานะไว้ในเครื่องผู้เรียนผ่าน localStorage (key: factory-course-progress —
//   คนละ key กับคอร์ส 1 เรียนคู่กันได้ ความคืบหน้าไม่ตีกัน)
// - Glossary / คำสั่ง / Playbook ซ่อนไว้ เปิดดูเมื่อกดลิงก์เท่านั้น

(function () {
  var KEY = 'factory-course-progress';
  var DEFAULT_PROGRESS = 1; // ผู้เรียนใหม่เริ่มที่บท 1

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  var lessons = [];
  document.querySelectorAll('section.lesson').forEach(function (s) {
    var m = s.id.match(/^lesson-(\d+)$/);
    if (m) lessons.push({ n: parseInt(m[1], 10), sec: s });
  });
  var maxN = lessons.reduce(function (a, l) { return Math.max(a, l.n); }, 0);

  var refs = {};
  ['glossary', 'commands', 'playbook'].forEach(function (id) {
    var s = document.getElementById(id);
    if (s) refs[id] = s;
  });

  function loadProgress() {
    try { return parseInt(localStorage.getItem(KEY), 10); } catch (e) { return NaN; }
  }
  function saveProgress(v) {
    try { localStorage.setItem(KEY, String(v)); } catch (e) { /* เปิดแบบ sandbox — จำเฉพาะรอบนี้ */ }
  }

  var progress = loadProgress();
  if (isNaN(progress) || progress < 1) progress = DEFAULT_PROGRESS;
  if (progress > maxN) progress = maxN;

  // ปุ่มปลดล็อกบทต่อไป
  var nextWrap = document.createElement('div');
  nextWrap.className = 'next-wrap';
  nextWrap.innerHTML =
    '<button class="next-btn">✅ จบบทนี้แล้ว — ปลดล็อกบทต่อไป ▼</button>' +
    '<div class="next-hint">ทำภารกิจท้ายบทกับเครื่องจริงก่อนไปต่อ ผลลัพธ์คือครูที่ดีที่สุด</div>';
  nextWrap.querySelector('button').addEventListener('click', function () {
    if (progress < maxN) {
      progress++;
      saveProgress(progress);
      render();
      var cur = document.getElementById('lesson-' + pad(progress));
      if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ปุ่มปิดของหน้า reference
  Object.keys(refs).forEach(function (id) {
    var close = document.createElement('button');
    close.className = 'ref-close';
    close.textContent = '✕ ปิดหน้านี้ กลับไปบทเรียน';
    close.addEventListener('click', function () {
      refs[id].style.display = 'none';
      var cur = document.getElementById('lesson-' + pad(progress));
      if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    refs[id].insertBefore(close, refs[id].firstChild);
  });

  function openRef(id) {
    Object.keys(refs).forEach(function (k) {
      refs[k].style.display = (k === id) ? '' : 'none';
    });
    refs[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function render() {
    lessons.forEach(function (l) {
      l.sec.style.display = (l.n <= progress) ? '' : 'none';
    });
    Object.keys(refs).forEach(function (k) { refs[k].style.display = 'none'; });

    nextWrap.remove();
    if (progress < maxN) {
      var cur = document.getElementById('lesson-' + pad(progress));
      if (cur) cur.appendChild(nextWrap);
    }

    document.querySelectorAll('.sidebar a[href^="#lesson-"]').forEach(function (a) {
      var n = parseInt(a.getAttribute('href').replace('#lesson-', ''), 10);
      var dot = a.querySelector('.dot');
      if (dot) dot.className = 'dot' + (n < progress ? ' done' : n === progress ? ' current' : '');
      a.classList.toggle('locked-js', n > progress);
    });
  }

  document.querySelectorAll('.sidebar a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (a.classList.contains('locked-js')) { e.preventDefault(); return; }
      var href = a.getAttribute('href') || '';
      if (href === '#glossary' || href === '#commands' || href === '#playbook') {
        e.preventDefault();
        openRef(href.slice(1));
      }
    });
  });

  document.querySelectorAll('.content a[href="#glossary"], .content a[href="#commands"], .content a[href="#playbook"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      openRef(a.getAttribute('href').slice(1));
    });
  });

  function onScroll() {
    var links = Array.from(document.querySelectorAll('.sidebar a[href^="#"]:not(.locked-js)'));
    var best = null;
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (!s || s.style.display === 'none') return;
      if (s.getBoundingClientRect().top < window.innerHeight * 0.35) best = a;
    });
    document.querySelectorAll('.sidebar a').forEach(function (a) {
      a.classList.toggle('active', a === best);
    });
  }
  document.addEventListener('scroll', onScroll, { passive: true });

  render();
  onScroll();
})();
