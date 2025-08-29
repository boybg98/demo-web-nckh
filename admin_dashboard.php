<?php
session_start();
$conn = new mysqli("localhost", "root", "", "website_db");

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    header("Location: admin_dashboard.php");
    exit();
}

// Tăng lượt truy cập admin
$conn->query("UPDATE visits SET admin_visits = admin_visits + 1 WHERE id = 1");

// Lấy số liệu
$result = $conn->query("SELECT admin_visits, user_visits FROM visits WHERE id = 1");
$data = $result->fetch_assoc();
?>
<h1>Trang Quản Trị</h1>
<p>Xin chào, <?php echo $_SESSION['username']; ?>!</p>
<p>Lượt truy cập của Admin: <?php echo $data['admin_visits']; ?></p>
<p>Lượt truy cập của User: <?php echo $data['user_visits']; ?></p>
<a href="logout.php">Đăng xuất</a>
