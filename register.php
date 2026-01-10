<?php
require 'db.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $role = 'user';
    $sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die(" Lỗi prepare SQL: " . $conn->error);
    }

    $stmt->bind_param("sss", $username, $password, $role);

    if ($stmt->execute()) {
        header("Location: indexlog.php?registered=true");
        exit();
    } else {
        echo " Lỗi execute: " . $stmt->error;
    }

    $stmt->close();
}
?>