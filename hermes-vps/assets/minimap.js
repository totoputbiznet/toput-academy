// minimap.js — แผนผังระบบ (ดีไซน์กล่องแบบบท 01) ใช้ซ้ำทุกบท
// <div class="minimap" data-active="cron,queue" data-note="บทนี้: ..."></div>
//   data-active: ชิ้นที่สว่าง (vps, docker, hermes, llm, cron, skills,
//                morning, queue, postjob, you, fb, domain) หรือ "all"
//   data-note:   โน้ตใต้ผัง · class เพิ่ม "minimap-hero" = โหมดเต็มของบท 01 (มี caption)

(function () {
  function build(box) {
    var act = (box.dataset.active || '').split(',').map(function (s) { return s.trim(); });
    var all = act.indexOf('all') >= 0;
    function on(id) { return all || act.indexOf(id) >= 0 ? '' : ' dim'; }

    var domainChip = '<span class="sm-domain' + on('domain') + '">🌐 โดเมน</span>';

    box.innerHTML =
      '<div class="sm-grid">' +
        '<div class="sm-vps' + on('vps') + '">' +
          '<div class="sm-vps-title">Hostinger VPS (Ubuntu) — เปิด 24 ชม. ' + domainChip + '</div>' +
          '<div class="sm-docker' + on('docker') + '">' +
            '<div class="sm-docker-title">Docker (กล่องใส่โปรแกรม)</div>' +
            '<div class="sm-hermes' + on('hermes') + '">' +
              '<div class="sm-hermes-title">🤖 Hermes Agent — พนักงานของเพจ</div>' +
              '<div class="sm-b' + on('llm') + '">• สมอง: LLM (ต่อผ่าน API key)</div>' +
              '<div class="sm-b' + on('cron') + '">• นาฬิกาปลุก: cron (ตั้งเวลางาน)</div>' +
              '<div class="sm-b' + on('skills') + '">• ความจำ + skills (สอนงานมันได้)</div>' +
            '</div>' +
          '</div>' +
          '<div class="sm-job' + on('morning') + '"><b>⏰ งานเช้า 07:00</b><br>เสนอคำคม 6 ข้อ (ออริจินัล 3 + คนดัง 3)<br>→ ส่งเข้า Telegram ให้คุณเลือก</div>' +
          '<div class="sm-queue' + on('queue') + '">🗂 คิวโพสต์ — queue.jsonl (ready → posted)</div>' +
          '<div class="sm-job' + on('postjob') + '"><b>⏰ งานโพสต์ 08:00 / 19:00</b><br>หยิบคำคมจากคิว → ทำรูปจาก template<br>→ โพสต์ลงเพจผ่าน Facebook API</div>' +
        '</div>' +
        '<div class="sm-side">' +
          '<div class="sm-arrow">⇄ ส่งตัวเลือก · คำตอบ → เข้าคิว</div>' +
          '<div class="sm-you' + on('you') + '"><b>📱 คุณ</b><br>รับคำคมทาง Telegram<br>กดเลือกอันที่ชอบ<br><span class="sm-soft">(human-in-the-loop)</span></div>' +
          '<div class="sm-arrow sm-arrow2">→ โพสต์อัตโนมัติ</div>' +
          '<div class="sm-fb' + on('fb') + '"><b>📘 เพจ Facebook</b><br>โพสต์คำคม + รูป<br>วันละ 2 โพสต์</div>' +
        '</div>' +
      '</div>' +
      (box.classList.contains('minimap-hero')
        ? '<div class="sm-caption">ระบบทั้งหมด: Hermes ทำงานเองตามเวลา — คุณโผล่มาแค่จุดเดียวคือ "กดเลือกคำคม" ใน Telegram</div>'
        : '') +
      (box.dataset.note ? '<div class="sm-note">' + box.dataset.note + '</div>' : '');
  }
  document.querySelectorAll('.minimap').forEach(build);
})();
