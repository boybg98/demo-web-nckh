import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const inEmail = document.querySelector("#email");
const inPassword = document.querySelector("#password");
const loginForm = document.querySelector("#login-form");
const handleLogin = function (event){
    event.preventDefault();
    let email = inEmail.value;
    let password = inPassword.value;
    if(!email || !password){
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
        }
        signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
            const user = userCredential.user;
            const userSession = {
                user: {
                    email: user.email,
                },
                expiry: new Date().getTime() + 3600000 // 1h log sau
            };
            localStorage.setItem('userSession', JSON.stringify(userSession));
            alert("Đăng nhập thành công");
            window.location.href = 'index.html';
    })
       .catch((e) =>{
        alert("Đăng nhập thất bại: " + e.message);
        })
}
loginForm.addEventListener("submit", handleLogin);