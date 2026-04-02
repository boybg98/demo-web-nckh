import re
import os

files = [
    ("test1.html", "testkha1.html", "body"),
    ("test2.html", "testkha2.html", "professional"),
    ("test3.html", "testkha3.html", "learning"),
    ("test4.html", "testkha4.html", "sport"),
    ("test5.html", "testkha5.html", "computer")
]

for src, dst, topic in files:
    with open(src, "r", encoding="utf-8") as f:
        content = f.read()

    # Change the heading
    content = content.replace("<h1>Bài kiểm tra", "<h1>Bài kiểm tra Khá")
    content = content.replace("Bài kiểm tra 1", "Bài kiểm tra Khá (1)")
    content = content.replace("Bài kiểm tra 2", "Bài kiểm tra Khá (2)")
    content = content.replace("Bài kiểm tra 3", "Bài kiểm tra Khá (3)")
    content = content.replace("Bài kiểm tra 4", "Bài kiểm tra Khá (4)")
    content = content.replace("Bài kiểm tra 5", "Bài kiểm tra Khá (5)")
    
    # We will modify the HTML elements
    # Remove the btn-upgrade completely
    content = content.replace('<button id="btn-upgrade"', '<button id="btn-upgrade" style="display:none"')
    
    # Add canvas confetti script
    if "<script src=\"https://cdn.jsdelivr.net/npm/canvas-confetti" not in content:
        content = content.replace("</head>", "    <script src=\"https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js\"></script>\n</head>")

    # Replace the grading logic for success
    grading_block = """
            if (score >= PASS_SCORE) {
                // Celebration
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                
                modalTitle.textContent = '🏆 Tuyệt vời, hoàn thành 100%!';
                modalMessage.textContent = 'Chúc mừng bạn đã chinh phục cấu trúc Khá của chủ đề này!';
                btnUpgrade.style.display = 'none';
                btnReview.textContent = 'Trở về màn hình trạng thái';
                btnReview.style.display = 'inline-block';
                btnReview.onclick = function() { window.location.href = 'progress-status.html'; };
                
                localStorage.setItem('testkha-completed-""" + topic + """', 'true');

            } else {
                modalTitle.textContent = '😔 Chưa đạt!';
                modalMessage.textContent = `Bạn cần đạt ít nhất ${PASS_SCORE}/${totalQuestions} điểm để qua mức Khá.`;
                btnUpgrade.style.display = 'none';
                btnReview.style.display = 'inline-block';
            }
"""
    # Replace the old if(score >= PASS_SCORE) block
    content = re.sub(r'if \(score >= PASS_SCORE\) \{[\s\S]*?modal\.style\.display = \'flex\';', grading_block + "\n            modal.style.display = 'flex';", content)
    
    # Change the mock questions mildly for the advanced ones to distinguish them from the basic ones
    # We'll just append "[Nâng cao]" to the first question to visibly see the difference without destroying their layout
    content = re.sub(r'(<ol>\s*<li>\s*)(.*?<br>)', r'\1[Mức Khá] \2', content, count=1)
    
    with open(dst, "w", encoding="utf-8") as f:
        f.write(content)

print("Generated all testkha files!")
