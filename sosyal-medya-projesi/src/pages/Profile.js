import React, { useEffect, useState } from 'react'
import apiClient from '../api/apiClient';
import { endpoints } from '../api/endpoints';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);

  const [likedPosts, setLikedPosts] = useState([]);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(()=>{
    const storedUser = localStorage.getItem("user");

    if(storedUser){
      setUser(JSON.parse(storedUser));
    }

    const fetchLikedPosts = async () => {
      const likedPostIds = JSON.parse(localStorage.getItem("likedPosts"));

      if(likedPostIds?.length > 0){
        const responses = await Promise.all(
          likedPostIds.map((id) => apiClient.get(`${endpoints.posts}/${id}`))
        );
        setLikedPosts(responses.map((res)=>res.data));
      }
    };
    fetchLikedPosts();

    const posts = JSON.parse(localStorage.getItem("userPosts")) || [];

    setUserPosts(posts);
  }, []);

  return(
    <div style={{padding: "20px"}}>
      <h1>Profil Bilgileri</h1>
      {user && (
        <>
          <p><strong>Ad:</strong>{user.name}</p>
          <p><strong>Soyad:</strong>{user.username}</p>
          <p><strong>Email:</strong>{user.email}</p>
        </>
      )}

      <div style={{marginTop: "30px"}}>
        <h2>Beğenilen Postlar</h2>

        {likedPosts.length > 0 ? (
          likedPosts.map((post)=>(
            <div key={post.id} style={styles.post}>
              <Link to={`/post/${post.id}`} style={styles.link}>
                <h3>{post.title}</h3>
              </Link>
            </div>
          ))
        ): (
          <p>Hiç beğenilen post yok</p>
        )}
      </div>
      <div style={{marginTop: "30px"}}>
        <h2>Eklenen Postlar</h2>

        {userPosts.length > 0 ? (
          userPosts.map((post)=>(
            <div key={post.id} style={styles.post}>
              <Link to={`/post/${post.id}`} style={styles.link}>
                <h3>{post.title}</h3>
              </Link>
            </div>
          ))
        ): (
          <p>Hiç eklenen post yok</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  post: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#6200ea",
    fontWeight: "bold",
    display: "block",
    marginBottom: "8px",
  },
};
export default Profile;