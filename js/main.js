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
    h = parseInt(document.getElementById('h_val')?.value) || 0;
    m = parseInt(document.getElementById('m_val')?.value) || 4;
    s = parseInt(document.getElementById('s_val')?.value) || 59;
  }

  if (s === -1) {
    m--;
    s = 59;
  }

  if (m === -1) {
    h--;
    m = 59;
  }

  if (h === -1) {
    clearTimeout(timeout);
    alert('⏰ Hết giờ làm bài!');
    return;
  }

  document.getElementById('h').innerText = String(h).padStart(2, '0');
  document.getElementById('m').innerText = String(m).padStart(2, '0');
  document.getElementById('s').innerText = String(s).padStart(2, '0');

  timeout = setTimeout(() => {
    s--;
    start();
  }, 1000);
}

    document.getElementById('h').innerText = String(h);
    document.getElementById('m').innerText = String(m);
    document.getElementById('s').innerText = String(s);
    timeout = setTimeout(() => {
        s-- ;
        start();
    }, 1000);

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

  const isLoginVisible = getComputedStyle(loginForm).display !== 'none';

  if (isLoginVisible) {
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
  reviewMistakes();
};
function selectQuerry(word, section) {
  let mistakes = JSON.parse(localStorage.getItem('mistakes') || '[]');
  mistakes.push({ word, section});
  localStorage.setItem('mistakes', JSON.stringify(mistakes));
}
function reviewMistakes() {
  const mistakes = JSON.parse(localStorage.getItem('mistakes') || '[]');
  if (mistakes.length > 0) {
    const firstMistake = mistakes[0];
    alert(`❗ Bạn đã sai từ: "${firstMistake.word}". Hãy học lại phần "${firstMistake.section}" nhé!`);
    const allCards = document.querySelectorAll(`.flashcard[data-section="${firstMistake.section}"]`);
    allCards.forEach(card => {
      if (card.textContent.includes(firstMistake.word)) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.border = '2px solid red'; 
      }
    });

    localStorage.removeItem('mistakes');
  }
}
// phần chấm điểm
function submitTest() {
  const correctAnswersMap = {
    body: {
      answer1: "B", answer2: "A", answer3: "B", answer4: "B", answer5: "A",
      q1: "head", q2: "ear", q3: "face", q4: "stomach", q5: "mouth"
    },
    professional: {
      answer1: "A", answer2: "C", answer3: "A", answer4: "B", answer5: "A",
      q1: "doctor", q2: "teacher", q3: "police", q4: "worker", q5: "driver"
    },
    learning: {
      answer1: "A", answer2: "B", answer3: "B", answer4: "C", answer5: "A",
      q1: "study", q2: "comment", q3: "train", q4: "copy", q5: "read"
    },
    sport: {
      answer1: "A", answer2: "C", answer3: "A", answer4: "C", answer5: "A",
      q1: "athletics", q2: "championship", q3: "gold-medal", q4: "contest", q5: "semi-final"
    },
    computer: {
      answer1: "A", answer2: "A", answer3: "D", answer4: "C", answer5: "D",
      q1: "keyboard", q2: "compiler", q3: "decoder", q4: "flowchart", q5: "data"
    }
  };

  const section = getSectionName();
  const correctAnswers = correctAnswersMap[section];
  let score = 0;
  const total = Object.keys(correctAnswers).length;
  const mistakes = [];

  // Chấm trắc nghiệm
  for (let i = 1; i <= 5; i++) {
  const radios = document.getElementsByName(`answer${i}`);
  let selected = null;

  radios.forEach(r => {
    if (r.checked) selected = r.value;
  });

  radios.forEach(r => {
    const label = r.parentElement; // thường là <label>
    if (!label.querySelector("span.result")) {
      const span = document.createElement("span");
      span.className = "result";
      span.style.marginLeft = "10px";

      const correct = correctAnswers[`answer${i}`];
      if (r.value === correct) {
        span.textContent = "✅";
      } else if (r.checked) {
        span.textContent = "❌";
      } else {
        span.textContent = "";
      }

      label.appendChild(span);
    }
  });

  if (selected === correctAnswers[`answer${i}`]) {
    score++;
  } else {
    const wrongLabel = Array.from(radios).find(r => r.checked)?.parentElement;
    if (wrongLabel) {
      mistakes.push({ word: wrongLabel.textContent.trim().split(" ")[0], section });
    }
  }
}


  // Chấm điền từ
  for (let i = 1; i <= 5; i++) {
    const input = document.getElementsByName(`q${i}`)[0];
    if (input && !input.nextElementSibling?.textContent?.includes("✅") && !input.nextElementSibling?.textContent?.includes("❌")) {
      const result = document.createElement("span");
      result.style.marginLeft = "10px";
      const userAnswer = input.value.trim().toLowerCase();
      const correct = correctAnswers[`q${i}`].toLowerCase();
      if (userAnswer === correct) {
        result.textContent = "✅";
        score++;
      } else {
        result.textContent = "❌";
        mistakes.push({ word: correct, section });
      }
      input.insertAdjacentElement("afterend", result);
    }
  }

  // Lưu từ sai vào localStorage
  localStorage.setItem("mistakes", JSON.stringify(mistakes));

  const percent = (score / total) * 100;
  const resultBox = document.createElement("div");
  resultBox.style.textAlign = "center";
  resultBox.style.marginTop = "30px";
  resultBox.innerHTML = `<h2>Kết quả: ${score}/${total} câu đúng (${Math.round(percent)}%)</h2>`;

  // Thêm nút hành động
  const retryButton = document.createElement("button");
  retryButton.textContent = "🔁 Làm lại";
  retryButton.onclick = () => window.location.reload();

  const homeButton = document.createElement("button");
  homeButton.textContent = "🏠 Về trang chủ";
  homeButton.onclick = () => window.location.href = "index.html";

  retryButton.style.marginRight = "10px";

  resultBox.appendChild(retryButton);
  resultBox.appendChild(homeButton);

  document.body.appendChild(resultBox);

  // Ẩn nút "Nộp bài"
  const submitBtn = document.querySelector('button[onclick="submitTest()"]');
  if (submitBtn) submitBtn.style.display = "none";
}

function getSectionName() {
  const title = document.title.toLowerCase();
  if (title.includes("body")) return "body";
  if (title.includes("professional")) return "professional";
  if (title.includes("learning")) return "learning";
  if (title.includes("sport")) return "sport";
  if (title.includes("computer")) return "computer";
  return "";
}
