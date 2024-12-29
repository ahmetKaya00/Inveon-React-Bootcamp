import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddPost = () => {

  const[title,setTitle] = useState("");
  const[body,setBody] = useState("");

  const navigate = useNavigate();

  const handleAddPost = (e) => {
    e.preventDefault();

    if(!title || !body){
      toast.error("Başlık ve içerik gerekli!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      body,
    };

    const existingPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

    localStorage.setItem("userPosts", JSON.stringify([...existingPosts, newPost]));

    toast.success("Post başarıyla kaydedildi!");

    navigate("/profile");
  };

  return(
    <div style={styles.container}>
      <form onSubmit={handleAddPost} style={styles.form}>
        <h1>Yeni Post Ekle</h1>

        <input
        type='text'
        placeholder='Başlık'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
        ></input>
        <textarea
        placeholder='İçerik'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={styles.textarea}
        ></textarea>

        <button type='submit' style={styles.button}>Ekle</button>
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
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    width: "400px"
  },
  input:{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  textarea:{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    resize: "none",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#6200ea",
    color: "white",
    fontSize: "14px"
  }
}

export default AddPost;