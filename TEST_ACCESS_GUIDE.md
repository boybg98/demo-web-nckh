# 📚 Hệ thống Quản lý Truy cập Bài Kiểm tra

## Cách thức hoạt động

### 🔒 Cơ chế Khóa (Lock Mechanism)

Hệ thống này đảm bảo người dùng chỉ có thể vào **Test 1, 2, 3** sau khi hoàn thành 100% bài học và các test trước đó.

### 📋 Quy trình

1. **Bước 1: Học Bài**

   - Người dùng vào phần "Body", "Professional", "Learning", v.v
   - Nhấn "Đã nhớ" cho mỗi từ vựng
   - Khi đạt 100% tiến độ → Nút "Bắt đầu kiểm tra" hiện ra

2. **Bước 2: Làm Bài Kiểm tra**

   - Làm xong Test 1 (Body) → Mở khóa Test 2 (Professional)
   - Làm xong Test 2 → Mở khóa Test 3 (Learning)
   - v.v...

3. **Bước 3: Xem Tiến độ**
   - Vào **📊 Tiến độ** để xem trạng thái tất cả bài kiểm tra
   - Biết được bài nào được phép vào, bài nào còn bị khóa

---

## 🛠️ Chi tiết Kỹ thuật

### Local Storage Keys

```javascript
// Lưu lúc hoàn thành học
completed - { section }; // VD: completed-body

// Lưu lúc hoàn thành test
test - completed - { section }; // VD: test-completed-body
test - score - { section }; // VD: test-score-body (lưu điểm %)
```

### Các Hàm Quan trọng

#### `canAccessTest(section)`

- Kiểm tra xem có được vào test này không
- Đảm bảo test đặc đặc chỉ được phép vào sau khi hoàn thành test trước

#### `checkTestAccess()`

- Gọi lúc tải trang test
- Chặn truy cập nếu chưa hoàn thành điều kiện

#### `saveTestCompletion(section, score, total)`

- Lưu kết quả test và điểm số
- Tự động mở khóa test tiếp theo

### Thứ tự Test

```
Test 1 (Body)
  ↓
Test 2 (Professional) - Yêu cầu: Hoàn thành Test 1
  ↓
Test 3 (Learning) - Yêu cầu: Hoàn thành Test 2
  ↓
Test 4 (Sport) - Yêu cầu: Hoàn thành Test 3
  ↓
Test 5 (Computer) - Yêu cầu: Hoàn thành Test 4
```

---

## 📱 Trạng thái Hiển thị

### ✅ Hoàn thành (Completed)

- Test đã được làm và nộp bài
- Hiển thị điểm số
- Có thể redo

### 🔓 Sẵn sàng (Ready)

- Đã hoàn thành 100% bài học + Test trước
- Có thể bắt đầu làm test

### 🔒 Khóa (Locked)

- Chưa hoàn thành test trước
- Không thể truy cập

### ⏳ Chờ xử lý (Pending)

- Chưa hoàn thành bài học
- Không thể làm test

---

## 🎯 Ví dụ Sử dụng

### Tình huống 1: Người dùng mới

1. Vào trang chủ
2. Học phần "Body" → Đạt 100%
3. Nút "Bắt đầu kiểm tra" hiện ra
4. Làm Test 1 xong → Test 2 được mở khóa
5. Xem tiến độ tại 📊 Tiến độ

### Tình huống 2: Người dùng cố gắng vào test bị khóa

1. Cố gắng nhấn vào Test 3 (Learning)
2. Nhận thông báo: "⚠️ Bạn cần hoàn thành Test 2 (professional) trước!"
3. Quay lại làm Test 2
4. Sau khi xong → Test 3 được mở

---

## 🔧 Cách Chỉnh sửa (Nếu cần)

### Để thay đổi thứ tự test

Sửa trong `js/main.js`:

```javascript
const testOrder = ["body", "professional", "learning", "sport", "computer"];
```

### Để thêm test mới

1. Tạo file HTML test mới (VD: test6.html)
2. Thêm vào `testOrder` array
3. Cập nhật `quizLink` object

### Để xóa điều kiện khóa (cho phép tất cả vào)

Sửa hàm `canAccessTest()`:

```javascript
function canAccessTest(section) {
  return true; // Cho phép tất cả
}
```

---

## 📞 Hỗ trợ

Nếu gặp vấn đề:

1. Kiểm tra Local Storage (F12 → Application → Local Storage)
2. Xem console có lỗi không (F12 → Console)
3. Clear cache và reload trang

---

**Cập nhật: 11/01/2026**
