<?php
// Kết nối đến cơ sở dữ liệu
require 'db.php';

// Bắt đầu session để lưu thông tin đăng nhập
session_start();

// Kiểm tra nếu phương thức gửi dữ liệu là POST (người dùng đã gửi form)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy tên đăng nhập và mật khẩu từ form, loại bỏ khoảng trắng thừa
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Chuẩn bị truy vấn để lấy thông tin người dùng dựa trên username
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username); // Gán biến $username vào dấu ?

    // Thực thi truy vấn
    $stmt->execute();
    $result = $stmt->get_result(); // Lấy kết quả trả về

    // Kiểm tra nếu tìm thấy dòng dữ liệu tương ứng
    if ($row = $result->fetch_assoc()) {
        // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong database
        if (password_verify($password, $row['password'])) {
            // Nếu đúng, lưu username vào session và chuyển hướng tới trang dashboard
            $_SESSION['username'] = $username;
            header("Location: dashboard.php");
        } else {
            // Nếu sai mật khẩu
            echo "Sai mật khẩu.";
        }
    } else {
        // Nếu không tìm thấy tài khoản
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
