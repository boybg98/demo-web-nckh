<?php
//khởi tạo kết nối đến cơ sở dữ liệu
$servername = "localhost";
$username = "root"; 
$password = "";    
$dbname = "website_db"; 
// Tạo kết nối
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Kết nối thất bại: " . mysqli_connect_error());
}
?>
