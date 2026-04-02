
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
 if (percent === 100) {
  const completeKey = `completed-${section}`;
  const completeTime = new Date().toISOString();
  localStorage.setItem(completeKey, completeTime);
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
  const hEl = document.getElementById('h');
  const mEl = document.getElementById('m');
  const sEl = document.getElementById('s');

  // ✅ Nếu không có đồng hồ → KHÔNG CHẠY
  if (!hEl || !mEl || !sEl) return;

  if (h === null) {
    h = parseInt(document.getElementById('h_val')?.value) || 0;
    m = parseInt(document.getElementById('m_val')?.value) || 4;
    s = parseInt(document.getElementById('s_val')?.value) || 59;
  }

  if (s < 0) {
    s = 59;
    m--;
  }

  if (m < 0) {
    m = 59;
    h--;
  }

  if (h < 0) {
    clearTimeout(timeout);
    alert('⏰ Hết giờ làm bài!');
    return;
  }

  hEl.innerText = String(h).padStart(2, '0');
  mEl.innerText = String(m).padStart(2, '0');
  sEl.innerText = String(s).padStart(2, '0');

  timeout = setTimeout(() => {
    s--;
    start();
  }, 1000);
}

 const hEl = document.getElementById('h');
const mEl = document.getElementById('m');
const sEl = document.getElementById('s');

if (hEl && mEl && sEl) {
  hEl.innerText = String(h);
  mEl.innerText = String(m);
  sEl.innerText = String(s);
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
      q1: "head", q2: "ear", q3: "face", q4: "stomach", q5: "mouth",
      q6: "hand", q7: "leg", q8: "foot", q9: "arm", q10: "nose"
    },
    professional: {
      answer1: "A", answer2: "C", answer3: "A", answer4: "B", answer5: "A",
      q1: "doctor", q2: "teacher", q3: "police", q4: "worker", q5: "driver",
      q6: "engineer", q7: "nurse", q8: "actor", q9: "pilot", q10: "chef"
    },
    learning: {
      answer1: "A", answer2: "B", answer3: "B", answer4: "C", answer5: "A",
      q1: "study", q2: "comment", q3: "train", q4: "copy", q5: "read",
      q6: "write", q7: "listen", q8: "speak", q9: "practice", q10: "homework"
    },
    sport: {
      answer1: "A", answer2: "C", answer3: "A", answer4: "C", answer5: "A",
      q1: "athletics", q2: "championship", q3: "gold-medal", q4: "contest", q5: "semi-final",
      q6: "football", q7: "swimmer", q8: "tennis", q9: "stadium", q10: "coach"
    },
    computer: {
      answer1: "A", answer2: "A", answer3: "D", answer4: "C", answer5: "D",
      q1: "keyboard", q2: "compiler", q3: "decoder", q4: "flowchart", q5: "data",
      q6: "mouse", q7: "screen", q8: "hardware", q9: "software", q10: "network"
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
  for (let i = 1; i <= 10; i++) {
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

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchSuggestions = document.getElementById('searchSuggestions');

  if (searchInput && searchSuggestions) {
    const searchItems = [
      { id: 'body', title: 'Chủ đề: Cơ thể người (Body)' },
      { id: 'professional', title: 'Chủ đề: Nghề nghiệp (Professional)' },
      { id: 'learning', title: 'Chủ đề: Học tập (Learning)' },
      { id: 'sport', title: 'Chủ đề: Thể thao (Sport)' },
      { id: 'computer', title: 'Chủ đề: Máy tính (Computer)' }
    ];

    // Collect all vocabulary words dynamically
    document.querySelectorAll('.flashcard').forEach((card, index) => {
      const wordEl = card.querySelector('.word');
      const meaningEl = card.querySelector('.meaning');
      const sectionEl = card.querySelector('.btn-remember');
      
      if (wordEl && meaningEl && sectionEl) {
        const wordText = wordEl.textContent.replace('🔊', '').trim();
        const meaningText = meaningEl.textContent.trim();
        const sectionId = sectionEl.dataset.section;
        
        const cardContainer = card.closest('li') || card.closest('.flashcard-container');
        if (cardContainer) {
          const cardId = `word-${sectionId}-${index}`;
          cardContainer.id = cardId;
          
          searchItems.push({
            id: cardId,
            title: `Từ vựng: ${wordText} - ${meaningText}`
          });
        }
      }
    });

    searchInput.addEventListener('input', function() {
      const keyword = this.value.toLowerCase().trim();
      searchSuggestions.innerHTML = '';
      
      if (keyword) {
        const filteredItems = searchItems.filter(item => 
          item.title.toLowerCase().includes(keyword)
        );

        if (filteredItems.length > 0) {
          searchSuggestions.style.display = 'block';
          filteredItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a class="dropdown-item" href="#${item.id}" style="white-space: normal;">${item.title}</a>`;
            li.addEventListener('click', () => {
              searchSuggestions.style.display = 'none';
              searchInput.value = '';
            });
            searchSuggestions.appendChild(li);
          });
        } else {
          searchSuggestions.style.display = 'block';
          searchSuggestions.innerHTML = '<li class="dropdown-item text-muted" style="white-space: normal;">Không tìm thấy kết quả</li>';
        }
      } else {
        searchSuggestions.style.display = 'none';
      }
    });

    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.style.display = 'none';
      }
    });
  }
});

function showTopic(topicId) {
  document.getElementById('home-view').style.display = 'none';
  document.getElementById('flashcard-view').style.display = 'block';
  
  const topics = ['body', 'professional', 'learning', 'sport', 'computer'];
  topics.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
  });
  
  const target = document.getElementById(topicId);
  if(target) {
      target.style.display = 'block';
      initCarouselForSection(topicId); // <---- Init carousel khi mở Flashcard
  }
  window.scrollTo(0,0);
}
window.showTopic = showTopic;

// === AUTO-OPEN TOPIC FROM URL PARAM (?topic=body) ===
// Dùng khi bấm nút "Ôn lại" từ trang bài kiểm tra
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const topicParam = params.get('topic');
  if (topicParam && ['body', 'professional', 'learning', 'sport', 'computer'].includes(topicParam)) {
    showTopic(topicParam);
  }
});

function showHome() {
  document.getElementById('home-view').style.display = 'block';
  document.getElementById('flashcard-view').style.display = 'none';
  window.scrollTo(0,0);
}
window.showHome = showHome;

/* --- THÊM CHỨC NĂNG CAROUSEL CHO FLASHCARD --- */
const carouselState = {
    body: 0,
    professional: 0,
    learning: 0,
    sport: 0,
    computer: 0
};

function initCarouselForSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    let controls = section.querySelector('.carousel-controls');
    if (!controls) {
        controls = document.createElement('div');
        controls.className = 'carousel-controls';
        controls.innerHTML = `
            <button class="carousel-btn btn-prev" onclick="goToCard('${sectionId}', -1)"><i class="fa fa-chevron-left"></i></button>
            <div class="carousel-status"><span id="c-idx-${sectionId}">1</span> / <span id="c-total-${sectionId}">0</span></div>
            <button class="carousel-btn btn-next" onclick="goToCard('${sectionId}', 1)"><i class="fa fa-chevron-right"></i></button>
        `;
        const ol = section.querySelector('ol');
        if (ol) {
            ol.parentNode.insertBefore(controls, ol.nextSibling);
        }
    }
    
    updateCarouselUI(sectionId);
}

function goToCard(sectionId, step) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const items = section.querySelectorAll('ol li');
    if (items.length === 0) return;
    
    carouselState[sectionId] += step;
    
    if (carouselState[sectionId] < 0) {
        carouselState[sectionId] = items.length - 1; // Vòng lại trang cuối
    } else if (carouselState[sectionId] >= items.length) {
        carouselState[sectionId] = 0; // Vòng lại trang đầu
    }
    
    updateCarouselUI(sectionId);
}

function updateCarouselUI(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const items = section.querySelectorAll('ol li');
    const total = items.length;
    if (total === 0) return;
    
    let currentIndex = carouselState[sectionId];
    
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('carousel-active');
            
            // Xóa state lật bài lưu lại từ thẻ cũ
            const flashcard = item.querySelector('.flashcard');
            if (flashcard) flashcard.classList.remove('flipped');
        } else {
            item.classList.remove('carousel-active');
        }
    });
    
    const currEl = document.getElementById(`c-idx-${sectionId}`);
    const totEl = document.getElementById(`c-total-${sectionId}`);
    
    if (currEl) currEl.innerText = currentIndex + 1;
    if (totEl) totEl.innerText = total;
}

// --- 3D FLIP FLASHCARD TRANSFORMATION ---
document.addEventListener('DOMContentLoaded', () => {
  const wrongWordsStr = localStorage.getItem('wrongWords');
  let wrongWords = [];
  if (wrongWordsStr) {
      try { wrongWords = JSON.parse(wrongWordsStr); } catch (e) {}
  }

  document.querySelectorAll('.flashcard').forEach(card => {
    if (card.querySelector('.flashcard-inner')) return; // Prevent double transform

    const wordEl = card.querySelector('.word');
    if (wordEl) {
        let pureWord = wordEl.textContent.replace('🔊', '').trim().toLowerCase();
        if (wrongWords.includes(pureWord)) {
            card.classList.add('wrong-vocab-highlight');
        }
    }

    const meaningEl = card.querySelector('.meaning');
    const exampleEl = card.querySelector('.example');
    const btnGroup = card.querySelector('.button-group');

    const inner = document.createElement('div');
    inner.className = 'flashcard-inner';

    const front = document.createElement('div');
    front.className = 'flashcard-front';
    const frontWord = wordEl ? wordEl.cloneNode(true) : null;
    if (frontWord) {
        front.appendChild(frontWord);
    }

    const back = document.createElement('div');
    back.className = 'flashcard-back';
    
    // Thêm hình ảnh tĩnh đã kiểm duyệt từ Wikipedia để không bị lỗi tải ảnh
    const wordText = wordEl ? wordEl.textContent.replace('🔊', '').trim() : '';
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'flashcard-img-wrapper';
    imgWrapper.style.margin = '10px 0';
    imgWrapper.style.textAlign = 'center';
    
    const imgMap = {
      "head":         "https://static.vecteezy.com/system/resources/previews/034/898/309/non_2x/boy-cartoon-head-isolated-white-background-free-vector.jpg",
      "eye":          "./img/flashcards/eye.jpg",
      "mouth":        "./img/flashcards/mouth.jpg",
      "face":         "./img/flashcards/face.jpg",
      "stomach":      "./img/flashcards/stomach.webp",
      "hand":         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Hand%2C_fingers_-_back.jpg/500px-Hand%2C_fingers_-_back.jpg",
      "leg":          "https://png.pngtree.com/png-vector/20201226/ourmid/pngtree-flesh-colored-straight-leg-left-leg-clip-art-png-image_2647683.jpg",
      "foot":         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Foot_on_white_background.jpg/500px-Foot_on_white_background.jpg",
      "arm":          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Extended_arm.jpg/500px-Extended_arm.jpg",
      "nose":         "./img/flashcards/nose.png",
      "teacher":      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Classroom_at_a_seconday_school_in_Pendembu_Sierra_Leone_Adapted.jpg",
      "doctor":       "https://png.pngtree.com/png-vector/20240804/ourlarge/pngtree-doctor-cartoon-illustration-png-image_13367782.png",
      "police":       "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/HH_Polizeihauptmeister_MZ.jpg/500px-HH_Polizeihauptmeister_MZ.jpg",
      "worker":       "./img/flashcards/worker.jpg",
      "driver":       "https://png.pngtree.com/png-clipart/20240610/original/pngtree-a-taxi-driver-cartoon-art-png-image_15291361.png",
      "engineer":     "https://png.pngtree.com/recommend-works/png-clipart/20250507/ourlarge/pngtree-animation-image-engineer-png-image_16212742.png",
      "nurse":        "./img/flashcards/nurse.jpg",
      "actor":        "./img/flashcards/actor.jpg",
      "pilot":        "https://png.pngtree.com/png-clipart/20250429/original/pngtree-a-cartoonish-pilot-in-blue-uniform-pilots-classic-silver-airplane-confidently-png-image_20894968.png",
      "chef":         "https://png.pngtree.com/png-vector/20241120/ourlarge/pngtree-cheerful-cartoon-chef-holding-fork-and-spoon-in-a-white-uniform-png-image_14499161.png",
      "study":        "./img/flashcards/study.jpg",
      "comment":      "./img/flashcards/comment.jpg",
      "train":        "./img/flashcards/train.jpg",
      "copy":         "./img/flashcards/copy.jpg",
      "read":         "./img/flashcards/read.jpg",
      "write":        "./img/flashcards/write.jpg",
      "listen":       "./img/flashcards/listen.jpg",
      "speak":        "./img/flashcards/speak.jpg",
      "practice":     "./img/flashcards/practice.jpg",
      "homework":     "./img/flashcards/homework.jpg",
      "athletics":    "./img/flashcards/athletics.jpg",
      "championship": "./img/flashcards/championship.jpg",
      "gold-medal":   "./img/flashcards/gold-medal.jpg",
      "contest":      "./img/flashcards/contest.jpg",
      "semi-final":   "./img/flashcards/semi-final.jpg",
      "football":     "./img/flashcards/football.jpg",
      "swimmer":      "./img/flashcards/swimmer.jpg",
      "tennis":       "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/2013_Australian_Open_-_Guillaume_Rufin.jpg/500px-2013_Australian_Open_-_Guillaume_Rufin.jpg",
      "stadium":      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Narendra_Modi_Stadium_view_from_the_gallery.jpg/500px-Narendra_Modi_Stadium_view_from_the_gallery.jpg",
      "coach":        "./img/flashcards/coach.jpg",
      "keyboard":     "./img/flashcards/keyboard.jpg",
      "compiler":     "./img/flashcards/compiler.jpg",
      "decoder":      "./img/flashcards/decoder.jpg",
      "flowchart":    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/LampFlowchart.svg/500px-LampFlowchart.svg.png",
      "data":         "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Data_types_-_en.svg/500px-Data_types_-_en.svg.png",
      "mouse":        "./img/flashcards/mouse.jpg",
      "screen":       "./img/flashcards/screen.jpg",
      "hardware":     "./img/flashcards/hardware.jpg",
      "software":     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/JavaScript_code.png/500px-JavaScript_code.png",
      "network":      "./img/flashcards/network.jpg"
    };
    
    if (wordText) {
        let imgSrc = imgMap[wordText.toLowerCase()] || `https://picsum.photos/seed/${wordText}/400/300`;
        imgWrapper.innerHTML = `<img src="${imgSrc}" alt="${wordText}" style="max-width:100%; height:180px; object-fit:contain; border-radius:8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">`;
    }

    // We keep original DOM elements for the back face
    // This perfectly preserves all original Javascript bindings!
    if (wordEl) back.appendChild(wordEl);
    back.appendChild(imgWrapper);
    if (meaningEl) back.appendChild(meaningEl);
    if (exampleEl) back.appendChild(exampleEl);
    if (btnGroup) back.appendChild(btnGroup);

    inner.appendChild(front);
    inner.appendChild(back);

    card.replaceChildren(inner);

    card.addEventListener('click', function(e) {
      this.classList.toggle('flipped');
    });

    const preventFlip = function(e) { e.stopPropagation(); };
    card.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', preventFlip);
    });
  });
});
