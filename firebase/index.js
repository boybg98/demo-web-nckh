import { auth } from './firebase.js';
import { signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lấy dữ liệu (Thử cả 2 trường hợp tên key để chắc chắn lấy được)
  let sessionData = localStorage.getItem('user_session') || localStorage.getItem('userSession');
  const userSession = sessionData ? JSON.parse(sessionData) : null;

  const profileDropdown = document.querySelector('#author-menu');
  const dropdownToggle = document.querySelector('#user-dropdown-toggle'); // Nút hiển thị chính

  if (!profileDropdown) return;

  if (userSession && userSession.user) {
    const now = new Date().getTime();
    
    // Kiểm tra hạn (nếu có trường expiry)
    if (!userSession.expiry || now < userSession.expiry) {
      
      if (dropdownToggle) {
        // Lấy tên email, cắt lấy phần trước @ để hiển thị cho gọn
        const shortName = userSession.user.email.split('@')[0];
        dropdownToggle.innerHTML = `<i class="fa-solid fa-user-check"></i> ${shortName}`;
      }

      // B. Cập nhật menu xổ xuống
      profileDropdown.innerHTML = `
        <li class="dropdown-item-text text-muted" style="font-size: 0.9em;">
            Xin chào, <strong>${userSession.user.email.split('@')[0]}</strong>
        </li>
        <li><hr class="dropdown-divider"></li>
        <li><button id="logout-btn" class="dropdown-item text-danger">
            <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
        </button></li>
      `;

      // C. Gắn sự kiện Đăng xuất
      document.getElementById('logout-btn').addEventListener('click', async () => {
        try {
          await signOut(auth);
          localStorage.removeItem('user_session'); // Xóa key 1
          localStorage.removeItem('userSession');  // Xóa key 2 (cho chắc)
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      });

    } else {
      // Hết hạn phiên
      console.log("Phiên đã hết hạn");
      localStorage.removeItem('user_session');
      localStorage.removeItem('userSession');
      window.location.href = "login.html";
    }
  } else {
    // Chưa đăng nhập
    profileDropdown.innerHTML = `
      <li><a class="dropdown-item" href="login.html">Đăng nhập</a></li>
      <li><a class="dropdown-item" href="register.html">Đăng ký</a></li>
    `;
    // Reset nút chính về mặc định
    if (dropdownToggle) {
        dropdownToggle.innerHTML = `<i class="fa-solid fa-user"></i> Tài khoản`;
    }
  }
});