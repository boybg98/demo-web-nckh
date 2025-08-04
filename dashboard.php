<?php
// Bắt đầu session để sử dụng biến phiên làm việc
session_start();

// Kiểm tra nếu người dùng chưa đăng nhập (không có 'username' trong session)
if (!isset($_SESSION['username'])) {
    // Nếu chưa đăng nhập, chuyển hướng về trang login.php
    header("Location: login.php");
    exit; //thoát 
}
?>

<!-- Hiển thị lời chào cùng tên người dùng đã đăng nhập -->
<h2>Chào mừng, <?php echo $_SESSION['username']; ?>!</h2>

<!-- Link để đăng xuất (chuyển sang file logout.php để xử lý) -->
<a href="logout.php">Đăng xuất</a>
