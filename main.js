const sectionProgress = {
  body: { remembered: 0, total: 0 },
  professional: { remembered: 0, total: 0 },
  learning: { remembered: 0, total: 0 },
  sport: { remembered: 0, total: 0 },
  computer: { remembered: 0, total: 0 },
};

document.querySelectorAll('.flashcard').forEach(card => {
  const section = card.querySelector('.btn-remember')?.dataset.section;
  if (section && sectionProgress[section]) {
    sectionProgress[section].total++;
  }
});

document.querySelectorAll('.btn-remember').forEach(button => {
  button.addEventListener('click', function () {
    const section = this.dataset.section;
    if (!this.classList.contains('counted') && sectionProgress[section]) {
      sectionProgress[section].remembered++;
      this.classList.add('counted');
      updateProgress(section);
    }
  });
});

document.querySelectorAll('.btn-review').forEach(button => {
  button.addEventListener('click', function () {
    const card = this.closest('.flashcard');
    const rememberButton = card.querySelector('.btn-remember');
    const section = rememberButton.dataset.section;
    if (rememberButton.classList.contains('counted') && sectionProgress[section]) {
      sectionProgress[section].remembered--;
      rememberButton.classList.remove('counted');
      updateProgress(section);
    }
  });
});

function updateProgress(section) {
  const progress = sectionProgress[section];
  const percent = Math.round((progress.remembered / progress.total) * 100);
  const progressElement = document.getElementById(`progress-${section}`);
  if (progressElement) {
    progressElement.textContent = `Tiến độ: ${percent}%`;
  }

  showQuizButton(section, percent);

  if (percent === 100 && !progress.notified) {
    const goToQuiz = confirm(`🎉 Chúc mừng! Bạn đã hoàn thành phần "${section}". Bạn có thể bắt đầu bài kiểm tra.`);
    progress.notified = true;
    if (goToQuiz) {
    const quizButton = document.getElementById(`quiz-btn-${section}`);
    if (quizButton) {
      quizButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } 
  }
  }
}
function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}
const quizLink ={
  body: "test1.html",
  professional: "test2.html",
  learning: "test3.html",
  sport: "test4.html",
  computer: "test5.html"
};
function showQuizButton(section, percent) {
  let quizButton = document.getElementById(`quiz-btn-${section}`);

  if (!quizButton) {
    quizButton = document.createElement('button');
    quizButton.textContent = '📝 Bắt đầu kiểm tra';
    quizButton.id = `quiz-btn-${section}`;
    quizButton.className = 'quiz-button';
    quizButton.style.marginTop = '10px';
    quizButton.addEventListener('click', function () {
      if (!quizButton.disabled) {
        startQuiz(section);
      }
    });

    const progressElement = document.getElementById(`progress-${section}`);
    if (progressElement) {
      progressElement.insertAdjacentElement('afterend', quizButton);
    }
  }
  quizButton.style.display = percent === 100 ? 'inline-block' : 'none';
  quizButton.disabled = percent < 100;
  quizButton.title = percent < 100 ? 'Cần hoàn thành 100% để mở bài kiểm tra' : '';
}

function startQuiz(section) {
  const link = quizLink[section] || "test1.html";
  localStorage.setItem('coutdown', 300);
  localStorage.setItem('quizSection', section);
  window.location.href = link;
}

function updateClock() {
  const now = new Date();
  const dateString = now.toLocaleString();
  const clockElement = document.getElementById("d");
  if (clockElement) {
    clockElement.textContent = dateString;
  }
}
setInterval(updateClock, 1000); 
updateClock();
let h = null, m = null, s = null;
let timeout = null;
function start() {
    if (h === null) {
        h = parseInt(document.getElementById('h_val').value);
        m = parseInt(document.getElementById('m_val').value);
        s = parseInt(document.getElementById('s_val').value);
    }
    if (s === -1) {
        m -= 1;
        s = 59;
    }
    if (m === -1) {
        h -= 1;
        m = 59;
    }
    if (h === -1) {
        clearTimeout(timeout);
        alert('⏰ Hết giờ làm bài!');
        alert('Xin vui lòng chờ kết quả !');
        return;
    }
    document.getElementById('h').innerText = String(h);
    document.getElementById('m').innerText = String(m);
    document.getElementById('s').innerText = String(s);
    timeout = setTimeout(() => {
        s-- ;
        start();
    }, 1000);
}
function noticeNewday() {
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem('lastVisitDate');
  const lastSection = localStorage.getItem('quizSection');

  if (lastVisit !== today) {
    localStorage.setItem('lastVisitDate', today);

    if (lastSection) {
      const answer = confirm(" Chào bạn! Bạn có muốn học lại hoặc kiểm tra lại phần trước không?");
      if (answer) {
        const action = confirm(" Nhấn OK để học lại, hoặc Cancel để làm lại bài kiểm tra.");

        if (action) {
          window.location.href = "index.html";
        } else {
          startQuiz(lastSection);
        }
      }
    } else {
      alert("Chào mừng ngày mới! Hãy bắt đầu học tập nhé.");
    }
  }
}
function submitTest() {
  alert('🎉 Nộp bài thành công! Đang chuyển về trang chủ...');
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000); 
}

function toggleForms() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const formTitle = document.getElementById('form-title');
  const toggleLink = document.querySelector('.toggle-link');

  if (loginForm.style.display !== 'none') {
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
    formTitle.textContent = 'Đăng ký';
    toggleLink.textContent = 'Đã có tài khoản? Đăng nhập';
  } else {
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
    formTitle.textContent = 'Đăng nhập';
    toggleLink.textContent = 'Chưa có tài khoản? Đăng ký';
  }
}
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("register") === "true") {
      toggleForms();
    }
  });
  if (percent === 100) {
  const completeKey = `completed-${section}`;
  const completeTime = new Date().toISOString();
  localStorage.setItem(completeKey, completeTime);
}
function checkReviewOpportunity() {
  const now = new Date();
  const sections = Object.keys(sectionProgress);
  const thresholdDays = 2;

  let sectionsToReview = [];

  sections.forEach(section => {
    const completeTimeStr = localStorage.getItem(`completed-${section}`);
    if (completeTimeStr) {
      const completeTime = new Date(completeTimeStr);
      const daysPassed = Math.floor((now - completeTime) / (1000 * 60 * 60 * 24));
      if (daysPassed >= thresholdDays) {
        sectionsToReview.push(section);
      }
    }
  });
  if (sectionsToReview.length > 0) {
    const message = `📅 Đã ${thresholdDays}+ ngày kể từ khi bạn hoàn thành: ${sectionsToReview.join(', ')}.\nBạn muốn ôn tập lại không?`;
    if (confirm(message)) {
      const reviewTest =`mixedTest.html?section=${encodeURIComponent(eligibleSections.join(','))}`;
      window.location.href = reviewTest;
    }
  }
}
window.onload = function(){
  noticeNewday();
  start();
  checkReviewOpportunity();
};