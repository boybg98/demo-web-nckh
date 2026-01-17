# 🚀 QUICK START - Hệ Thống Kiểm tra Truy cập

## 📌 Cách Sử Dụng Ngay

### Trên Trang Chủ

1. ✅ Học bài (nhấn "Đã nhớ" cho mỗi từ)
2. ✅ Đạt 100% → Nút "Bắt đầu kiểm tra" xuất hiện
3. ✅ Làm xong Test 1 → Test 2 tự động mở khóa
4. ✅ Lặp lại cho Test 2, 3, 4, 5

### Xem Tiến độ

- Nhấn **📊 Tiến độ** ở navbar
- Xem test nào ✅ hoàn thành, 🔓 sẵn sàng, 🔒 bị khóa

### Debug/Test Hệ Thống

- Vào `debug.html`
- Tạo dữ liệu test hoặc xóa dữ liệu

---

## 🎯 Quy Tắc Đơn Giản

```
Test 1 (Body)
  ↓ Hoàn thành
Test 2 (Professional) - Mở khóa ✓
  ↓ Hoàn thành
Test 3 (Learning) - Mở khóa ✓
  ↓ Hoàn thành
Test 4 (Sport) - Mở khóa ✓
  ↓ Hoàn thành
Test 5 (Computer) - Mở khóa ✓
```

---

## 💾 Nơi Lưu Dữ Liệu

**LocalStorage (trên trình duyệt):**

- `completed-body` = bài học hoàn thành
- `test-completed-body` = test hoàn thành
- `test-score-body` = điểm % (VD: 85)

---

## 🔗 File Quan Trọng

| File                   | Mục đích                   |
| ---------------------- | -------------------------- |
| `progress-status.html` | Xem trạng thái tất cả test |
| `debug.html`           | Công cụ debug/test         |
| `TEST_ACCESS_GUIDE.md` | Hướng dẫn chi tiết         |
| `CHANGES_SUMMARY.md`   | Chi tiết thay đổi          |

---

## ❓ FAQ

**Q: Sao không vào được Test 2?**  
A: Vì chưa hoàn thành Test 1. Hoàn thành Test 1 trước.

**Q: Làm sao reset tất cả?**  
A: Vào `debug.html` → nhấn "🗑️ Xóa tất cả dữ liệu"

**Q: Lưu ở đâu?**  
A: LocalStorage của trình duyệt (mất khi xóa cache)

---

✅ **Hoàn thành!** Hệ thống đã sẵn sàng sử dụng.
