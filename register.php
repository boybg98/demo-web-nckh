<?php
// Nhúng file kết nối CSDL
require 'db.php';

// Bắt đầu phiên làm việc (session) để lưu thông tin đăng nhập
session_start();

// Kiểm tra nếu form được gửi bằng phương thức POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy giá trị tên đăng nhập từ form và loại bỏ khoảng trắng thừa
    $username = trim($_POST['username']);

    // Lấy mật khẩu từ form (không cần trim vì có thể chứa ký tự đặc biệt, khoảng trắng)
    $password = $_POST['password'];

    // Chuẩn bị câu truy vấn SQL để tìm người dùng theo username
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");

    // Gán tham số vào câu truy vấn (s là string)
    $stmt->bind_param("s", $username);

    // Thực thi câu truy vấn
    $stmt->execute();

    // Lấy kết quả từ truy vấn
    $result = $stmt->get_result();

    // Kiểm tra nếu có dữ liệu trả về (tức là tìm thấy người dùng)
    if ($row = $result->fetch_assoc()) {
        // So sánh mật khẩu nhập vào với mật khẩu trong database (đang dùng so sánh trực tiếp ===)
        if ($password === $row['password']) {
            // Nếu đúng, lưu tên đăng nhập vào session
            $_SESSION['username'] = $username;

            // Chuyển hướng người dùng sang trang dashboard
            header("Location: dashboard.php");

            // Dừng thực thi tiếp mã (bảo vệ khỏi chạy tiếp sau khi redirect)
            exit();
        } else {
            // Nếu mật khẩu không đúng, hiển thị thông báo lỗi
            echo "Sai mật khẩu.";
        }
    } else {
        // Nếu không tìm thấy tài khoản, hiển thị thông báo lỗi
        echo "Không tìm thấy tài khoản.";
    }

    // Đóng truy vấn
    $stmt->close();
}
?>

<!-- Biểu mẫu đăng nhập HTML -->
<form method="POST">
    <h2>Đăng nhập</h2>
    Tên đăng nhập: <input type="text" name="username" required><br>
    Mật khẩu: <input type="password" name="password" required><br>
    <button type="submit">Đăng nhập</button>
</form>
