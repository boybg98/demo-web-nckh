<?php
// Bắt đầu session để có thể hủy phiên làm việc hiện tại
session_start();

// Hủy toàn bộ dữ liệu phiên làm việc (session)
session_destroy();

// Chuyển hướng người dùng về trang đăng nhập
header("Location: index.php");

// Dừng chương trình tại đây để tránh thực thi tiếp
exit;
?>
