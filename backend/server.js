const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json()); // Để server đọc được dữ liệu JSON gửi từ Frontend

// 1. CẤU HÌNH KẾT NỐI MYSQL (Chạy trên XAMPP)
const dbConfig = {
    host: 'localhost',
    user: 'root',      // XAMPP mặc định có user là root
    password: '',      // XAMPP mặc định không có mật khẩu
    database: 'nckh_database', // Tên Database ta sẽ tạo
    port: 3306         // Cổng mặc định của MySQL
};

// Hàm tạo Table tự động nếu chưa có
async function initDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            port: dbConfig.port
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
        await connection.query(`USE \`${dbConfig.database}\`;`);
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role_id INT DEFAULT 2,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("✅ [Database] Đã kết nối và kiểm tra dữ liệu thành công!");
    } catch (err) {
        console.error("❌ [Database] Lỗi kết nối CSDL MySQL (Nhớ bật MySQL trên XAMPP nhé!):", err.message);
    }
}
initDatabase();

// 2. API ĐĂNG KÝ
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });
        }

        const connection = await mysql.createConnection(dbConfig);
        
        // Kiểm tra xem email có tồn tại chưa
        const [rows] = await connection.execute('SELECT email FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ success: false, message: "Email này đã được sử dụng!" });
        }

        // Chú ý: Ở hệ thống thực tế, mật khẩu phải được băm (hash). Ở đây NCKH demo ta lưu raw.
        await connection.execute(
            'INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)',
            [username, email, password, 2]
        );
        
        res.json({ success: true, message: "Đăng ký thành công!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Lỗi Server!" });
    }
});

// 3. API ĐĂNG NHẬP
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng cung cấp email và mật khẩu!" });
        }

        const connection = await mysql.createConnection(dbConfig);
        
        const [users] = await connection.execute(
            'SELECT * FROM users WHERE email = ? AND password = ?', 
            [email, password]
        );

        if (users.length > 0) {
            const user = users[0];
            // Trả về Session ảo giống cấu trúc cũ để trang web dễ tương thích
            res.json({ 
                success: true, 
                message: "Đăng nhập thành công!",
                session: {
                    user: { 
                        email: user.email, 
                        username: user.username,
                        role_id: user.role_id 
                    },
                    expiry: new Date().getTime() + 3600000
                }
            });
        } else {
            res.status(401).json({ success: false, message: "Tài khoản hoặc mật khẩu không chính xác!" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Lỗi Server!" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 [Server] Backend đang chạy ổn định tại đường dẫn: http://localhost:${PORT}`);
});
