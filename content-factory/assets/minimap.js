// minimap.js — ผังโรงงานคอนเทนต์ (คอร์ส 2) ใช้ซ้ำทุกบท · ดีไซน์กล่องชุดเดียวกับคอร์ส 1
// <div class="minimap" data-active="queue,vidline" data-note="บทนี้: ..."></div>
//   data-active: ชิ้นที่สว่าง (vps, docker, team, plan, imgline, vidline,
//                queue, postjob, you, fb) หรือ "all"
//   data-note:   โน้ตใต้ผัง · class เพิ่ม "minimap-hero" = โหมดเต็มของบท 01 (มี caption)

(function () {
  function build(box) {
    var act = (box.dataset.active || '').split(',').map(function (s) { return s.trim(); });
    var all = act.indexOf('all') >= 0;
    function on(id) { return all || act.indexOf(id) >= 0 ? '' : ' dim'; }

    box.innerHTML =
      '<div class="sm-grid">' +
        '<div class="sm-vps' + on('vps') + '">' +
          '<div class="sm-vps-title">Hostinger VPS เครื่องเดิมจากคอร์ส 1 — เปิดไลน์ผลิตเพิ่ม</div>' +
          '<div class="sm-docker' + on('docker') + '">' +
            '<div class="sm-docker-title">Docker → Hermes ตัวเดิม 1 ตัว = ทีมบอทหลายบทบาท</div>' +
            '<div class="sm-hermes' + on('team') + '">' +
              '<div class="sm-hermes-title">🤖 ทีมบอท (บอท = บทบาท: cron + skill)</div>' +
              '<div class="sm-b' + on('plan') + '">• 🧠 นักวางแผน — แผนสัปดาห์ ภาพ/วิดีโอ</div>' +
              '<div class="sm-b' + on('imgline') + '">• 🎨 ช่างภาพ — make_image.py หลายเทมเพลต</div>' +
              '<div class="sm-b' + on('vidline') + '">• 🎬 ช่างวิดีโอ — ffmpeg เรนเดอร์ล่วงหน้า 17:00</div>' +
            '</div>' +
          '</div>' +
          '<div class="sm-queue' + on('queue') + '">🗂 คิวกลาง v2 — queue.jsonl (type: image | video · สถานะคือ baton ส่งต่องาน)</div>' +
          '<div class="sm-job' + on('postjob') + '"><b>⏰ นักโพสต์ 08:00 / 19:00</b><br>หยิบงานตรง slot จากคิว → ภาพลง /photos<br>วิดีโอลง /videos · ภาพชุดลง attached_media</div>' +
        '</div>' +
        '<div class="sm-side">' +
          '<div class="sm-arrow">⇄ เสนอแผน · ตัวอย่างภาพ/คลิป → คุณเคาะ</div>' +
          '<div class="sm-you' + on('you') + '"><b>📱 คุณ — ห้องควบคุม Telegram</b><br>อนุมัติแผน · ตรวจงานก่อนโพสต์<br><span class="sm-soft">(human-in-the-loop เหมือนเดิม)</span></div>' +
          '<div class="sm-arrow sm-arrow2">→ โพสต์อัตโนมัติ</div>' +
          '<div class="sm-fb' + on('fb') + '"><b>📘 เพจเดียวกัน: บทเรียนชีวิต</b><br>ภาพเดี่ยว · ภาพชุด · วิดีโอ/Reels</div>' +
        '</div>' +
      '</div>' +
      (box.classList.contains('minimap-hero')
        ? '<div class="sm-caption">โรงงานทั้งระบบ: Hermes ตัวเดิม แต่แตกเป็นหลายบทบาท ผลิตคอนเทนต์ 3 ชนิดลงเพจเดิม — คุณยังโผล่จุดเดียว: เคาะอนุมัติใน Telegram</div>'
        : '') +
      (box.dataset.note ? '<div class="sm-note">' + box.dataset.note + '</div>' : '');
  }
  document.querySelectorAll('.minimap').forEach(build);
})();
