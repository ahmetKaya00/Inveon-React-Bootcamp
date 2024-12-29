import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { endpoints } from '../api/endpoints';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const hangleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.get(endpoints.users);

      const users = response.data;

      const user = users.find(
        (u) => u.username === username && u.email === password
      );

      if(user){
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Giriş Başarılı!");
        navigate("/");
      }else{
        toast.error("Kullanıcı adı veya parola hatalı!");
      }
    } catch (error) {
      toast.error("Bir hata oluştu, letfen tekrar deneyiniz!");
    }
  };

  return(
    <div style={styles.container}>
      <form onSubmit={hangleLogin} style={styles.form}>
        <h1>Giriş Yap</h1>

        <input
        type='text'
        placeholder='Kullanıcı adı'
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        style={styles.input}
        ></input>

        <input
        type='password'
        placeholder='Şifre (Email Girin)'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
        ></input>

        <button type='submit' style={styles.button}>Giriş Yap</button>
      </form>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#6200ea",
    color: "white",
    fontSize: "14px",
  },
};
export default Login;