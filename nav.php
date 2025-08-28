<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>

<ul class="nav-id">
  <?php if (isset($_SESSION['username'])): ?>
    <li class="nav-id2">👤 Xin chào, <strong><?php echo htmlspecialchars($_SESSION['username']); ?></strong></li>
    <li class="nav-id2"><a href="logout.php">Đăng xuất</a></li>
  <?php else: ?>
    <li class="nav-id2"><a href="indexlog.php">Đăng nhập</a></li>
    <li class="nav-id2"><a href="indexlog.php?register=true">Đăng ký</a></li>
  <?php endif; ?>
</ul>
<script src="main.js" defer></script>