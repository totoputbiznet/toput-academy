// quiz.js — quiz component กลางของคอร์ส
// วิธีใช้ในบทเรียน:
//   <div class="quiz" data-quiz>
//     <div class="quiz-head">ทบทวนความจำ</div>
//     <div class="quiz-q" data-answer="1">
//       <div class="q-text">คำถาม?</div>
//       <button class="quiz-opt">ตัวเลือก 0</button>
//       <button class="quiz-opt">ตัวเลือก 1 (ถูก เพราะ data-answer="1")</button>
//       <div class="quiz-feedback"></div>
//     </div>
//   </div>
// ให้ feedback ทันที (tight feedback loop) และให้ลองใหม่ได้เมื่อตอบผิด

document.querySelectorAll('[data-quiz] .quiz-q').forEach(function (q) {
  var answer = parseInt(q.dataset.answer, 10);
  var opts = q.querySelectorAll('.quiz-opt');
  var fb = q.querySelector('.quiz-feedback');

  opts.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      if (i === answer) {
        opts.forEach(function (b) { b.disabled = true; b.classList.remove('wrong'); });
        btn.classList.add('correct');
        fb.textContent = q.dataset.okMsg || '✓ ถูกต้อง';
        fb.className = 'quiz-feedback show ok';
      } else {
        btn.classList.add('wrong');
        btn.disabled = true;
        fb.textContent = q.dataset.noMsg || '✗ ยังไม่ใช่ — ลองนึกใหม่อีกครั้ง';
        fb.className = 'quiz-feedback show no';
      }
    });
  });
});
