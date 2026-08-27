// search.js — ค้นหาข้ามทุกบทเรียน + reference (รวมส่วนที่ซ่อน)
// พิมพ์ ≥2 ตัวอักษร → รายการผลพร้อม snippet · คลิก → เผยส่วนนั้น เลื่อนไป และไฮไลต์วาบ

(function () {
  var input = document.getElementById('course-search');
  var box = document.getElementById('course-search-results');
  if (!input || !box) return;

  var index = [];
  document.querySelectorAll('section.lesson').forEach(function (sec) {
    var m = sec.id.match(/^lesson-(\d+)/);
    var label = m ? 'บท ' + parseInt(m[1], 10)
      : sec.id === 'glossary' ? '📚 Glossary'
      : sec.id === 'commands' ? '⌨️ คำสั่ง'
      : sec.id === 'playbook' ? '🛠 Playbook' : sec.id;
    var heading = '';
    sec.querySelectorAll('h1,h2,h3,p,li,td,dt,dd,pre,figcaption').forEach(function (el) {
      if (/^H[1-3]$/.test(el.tagName)) heading = el.textContent.trim();
      var t = el.textContent.replace(/\s+/g, ' ').trim();
      if (t.length > 3) index.push({ sec: sec, label: label, heading: heading, el: el, text: t, lower: t.toLowerCase() });
    });
  });

  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  function goTo(it) {
    if (it.sec.style.display === 'none') it.sec.style.display = ''; // เผยชั่วคราว (ไม่แตะ progress)
    it.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    it.el.classList.remove('search-hit'); void it.el.offsetWidth;
    it.el.classList.add('search-hit');
    setTimeout(function () { it.el.classList.remove('search-hit'); }, 2500);
    box.style.display = 'none';
  }

  function search(q) {
    q = q.trim().toLowerCase();
    box.innerHTML = '';
    if (q.length < 2) { box.style.display = 'none'; return; }
    var count = 0;
    for (var i = 0; i < index.length && count < 15; i++) {
      var it = index[i];
      var pos = it.lower.indexOf(q);
      if (pos < 0) continue;
      count++;
      var s = Math.max(0, pos - 35), e = Math.min(it.text.length, pos + q.length + 45);
      var snip = (s > 0 ? '…' : '') + esc(it.text.slice(s, pos)) +
        '<mark>' + esc(it.text.slice(pos, pos + q.length)) + '</mark>' +
        esc(it.text.slice(pos + q.length, e)) + (e < it.text.length ? '…' : '');
      var d = document.createElement('div');
      d.className = 'cs-result';
      d.innerHTML = '<div class="cs-loc">' + esc(it.label) + (it.heading ? ' · ' + esc(it.heading) : '') + '</div>' +
        '<div class="cs-snip">' + snip + '</div>';
      (function (item) { d.addEventListener('click', function () { goTo(item); }); })(it);
      box.appendChild(d);
    }
    if (!count) box.innerHTML = '<div class="cs-none">ไม่พบ "' + esc(q) + '" ในบทเรียน</div>';
    box.style.display = 'block';
  }

  var timer;
  input.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () { search(input.value); }, 150);
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { input.value = ''; box.style.display = 'none'; input.blur(); }
  });
})();
