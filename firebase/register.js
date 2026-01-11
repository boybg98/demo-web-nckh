import { auth, db }   from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"; 

const inpUsername = document.querySelector("#username");
const inpEmail = document.querySelector("#email");
const inpPassword = document.querySelector("#password");
const registerForm = document.querySelector("#resgister-form");

const handleRegister = function (event){
    event.preventDefault();
    let username = inpUsername.value;
    let email = inpEmail.value;
    let password = inpPassword.value;
    let role_id = 2;
    if(!username || !email || !password){
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
        }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
            const user = userCredential.user;
            const userData = {
                username,
                email,
                password,
                role_id,
            
            }
            return addDoc(collection(db, "users"), userData);
    })
    .then(() => {
        alert("Đăng ký thành công");
        window.location.href = "login.html";
       })
       .catch((e) =>{
        alert("Đăng ký thất bại: " + e.message);
        })
    

}

registerForm.addEventListener("submit", handleRegister);