# 🚀 Cập nhật tính năng — v2.0 AI Edition

**Ngày cập nhật:** 02/04/2026  
**Phiên bản:** 2.0.0  
**Tác giả:** Demo Web NCKH Team

---

## ✨ Tính năng mới: Tích hợp Google Gemini AI

Phiên bản này bổ sung **3 công cụ AI trực tiếp** ngay trong trang học Flashcard, được hỗ trợ bởi **Google Gemini API** (`gemini-2.0-flash`).

---

### 🔑 Cài đặt API Key

Để kích hoạt các tính năng AI, mở file `js/ai-features.js` và thay thế:

```js
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
```

bằng API key thật của bạn. Lấy key miễn phí tại: https://aistudio.google.com/app/apikey

---

## 🆕 Các tính năng được thêm mới

### 1. ✨ Giải thích từ vựng chuyên sâu

Nhấn nút **"✨ Giải thích AI"** (xuất hiện trên mỗi flashcard sau khi lật) để AI phân tích từ đó bao gồm:

- 📖 Phát âm IPA + gợi ý đọc kiểu Việt
- 🔤 Loại từ (danh từ / động từ / tính từ...)
- 💬 Giải thích ngữ cảnh sử dụng thực tế
- 📝 3 câu ví dụ thực tế
- 🔗 Collocation (cụm từ hay đi kèm)
- 💡 Mẹo nhớ từ sáng tạo

### 2. 📖 Tạo câu chuyện AI

Trong panel AI, chọn tab **"📖 Câu chuyện"**:

- Chọn chủ đề từ vựng (Cơ thể / Nghề nghiệp / Học tập / Thể thao / Máy tính)
- Nhấn **"✨ Tạo câu chuyện mới"**
- Gemini sẽ tạo đoạn văn ~120–150 từ kết hợp **toàn bộ từ vựng** trong chủ đề đó
- Kết quả gồm: bản tiếng Anh + bản dịch tiếng Việt + danh sách từ đã dùng
- Các từ vựng được **in đậm** để dễ nhận ra

### 3. 🤖 Trợ lý học tập AI (Chatbot VocabAI)

Trong panel AI, chọn tab **"🤖 Trợ lý AI"**:

- Chat song ngữ Việt–Anh với **VocabAI**
- Hỏi về từ vựng, ngữ pháp, cách dùng từ trong ngữ cảnh
- Gửi tin nhắn bằng **Enter** hoặc nút **➤**
- Duy trì lịch sử hội thoại trong phiên làm việc
- Nhấn "🗑 Xóa hội thoại" để bắt đầu cuộc trò chuyện mới

---

## 🎨 Cải thiện giao diện

### Nút AI nổi (Floating Button)
- Nút **"✨ AI"** cố định ở góc dưới phải màn hình
- Hiệu ứng nảy (bounce animation) để dễ nhận thấy
- Gradient tím–xanh nổi bật

### AI Side Panel (Glassmorphism Dark Mode)
- Thanh trượt từ phải vào, nền tối cao cấp
- 3 tab điều hướng rõ ràng
- Chat bubble phân biệt user (xanh) và AI (tím)
- Loading spinner + typing animation khi AI đang xử lý

### Flashcard Layout (Sửa lỗi)
- Tăng chiều cao tối thiểu card từ `260px` → `300px` để vừa nội dung
- Nút 🔊 trong câu ví dụ không còn tràn ra ngoài card
- Nút "✨ Giải thích AI" được thiết kế nhỏ gọn, không chiếm không gian

---

## 📁 Files được thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `js/ai-features.js` | **Mới** | Toàn bộ logic Gemini API cho 3 tính năng AI |
| `css/ai-panel.css` | **Mới** | Styling glassmorphism cho AI panel |
| `index.html` | **Cập nhật** | Thêm HTML AI panel, link CSS/JS mới |
| `css/main.css` | **Cập nhật** | Sửa overflow flashcard, tăng min-height |

---

## ⚙️ Yêu cầu kỹ thuật

- **API:** Google Gemini API (`gemini-2.0-flash`)
- **Kết nối:** Cần internet để gọi AI
- **Browser:** Chrome / Edge / Firefox (phiên bản mới)
- **Không cần backend:** Gọi API trực tiếp từ frontend

> [!WARNING]
> Không commit API key lên GitHub public. Cân nhắc dùng biến môi trường hoặc backend proxy khi triển khai production.

---

## 🐛 Lỗi đã sửa

- **[FIX]** Nút 🔊 trong câu ví dụ tràn ra ngoài viền flashcard
- **[FIX]** Các ô flashcard quá nhỏ sau khi thêm nút AI
- **[FIX]** Button-group bị đè lên nhau khi card có nhiều nội dung

---

*Phiên bản tiếp theo dự kiến: Tính năng phát âm AI, luyện tập điền từ có AI chấm điểm.*
