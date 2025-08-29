<?php session_start(); ?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đăng nhập & Đăng ký</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }

    .nav {
      width: 100%;
      background: #eaeaea;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
    }

    .nav-id {
      list-style: none;
      display: flex;
      gap: 20px;
      padding: 0;
      margin: 0;
    }

    .nav-id2 a {
      text-decoration: none;
      color: #333;
    }

    .container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
      width: 300px;
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    h2 { text-align: center; }

    form {
      display: flex;
      flex-direction: column;
    }

    input {
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      padding: 10px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }

    button:hover { background: #45a049; }

    .toggle-link {
      text-align: center;
      margin-top: 15px;
      cursor: pointer;
      color: blue;
      text-decoration: underline;
    }
  </style>
</head>
<body>

<!-- Thanh menu -->
<div class="nav">
  <ul class="nav-id">
    <li class="nav-id2">Trang chủ</li>
    <li class="nav-id2">Khóa học</li>
  </ul>
  <?php include 'nav.php'; ?>
</div>

<!-- Phần form -->
<div class="container">
<?php
  $showRegister = isset($_GET['register']) && $_GET['register'] === 'true';
  if ($showRegister) {
      echo '<h2 id="form-title">Đăng ký</h2>
            <form id="registerForm" action="register.php" method="post">
              <input type="text" name="username" placeholder="Tên đăng nhập" required>
              <input type="email" name="email" placeholder="Email" required>
              <input type="password" name="password" placeholder="Mật khẩu" required>
              <button type="submit">Đăng ký</button>
            </form>
            <div class="toggle-link"><a href="indexlog.php">Đã có tài khoản? Đăng nhập</a></div>';
  } else {
      echo '<h2 id="form-title">Đăng nhập</h2>
            <form id="loginForm" action="login.php" method="post">
              <input type="text" name="username" placeholder="Tên đăng nhập" required>
              <input type="password" name="password" placeholder="Mật khẩu" required>
              <button type="submit">Đăng nhập</button>
            </form>
            <div class="toggle-link"><a href="indexlog.php?register=true">Chưa có tài khoản? Đăng ký</a></div>';
  }
?>
</div>

</body>
</html>
