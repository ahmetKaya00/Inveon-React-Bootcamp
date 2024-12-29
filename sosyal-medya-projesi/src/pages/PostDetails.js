import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import apiClient from '../api/apiClient';
import {endpoints} from '../api/endpoints';

const PostDetails = () => {
  const {postId} = useParams();

  const[post, setPost] = useState(null);
  const[comments, setComments] = useState([]);
  const[liked,setLiked]=useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

        const existingPost = userPosts.find((p) => p.id === Number(postId));

        if(existingPost){
          setPost(existingPost);
        }else{
          const[postResponse, commentsResponse] = await Promise.all([
            apiClient.get(`${endpoints.posts}/${postId}`),
            apiClient.get(`${endpoints.comments}?postId=${postId}`),
          ]);

          setPost(postResponse.data);
          setComments(commentsResponse.data);
        }

        const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];

        setLiked(likedPosts.includes(Number(postId)));
      } catch (error) {
        toast.error("Post detayları yüklenirken bir hata oluştu!");
      }
    };
    fetchPostDetails();
  },[postId]);

  const handleLike = () => {
    let likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];

    if(liked){
      likedPosts = likedPosts.filter((id) => id !== Number(postId));

      toast.info("Post beğenilmekten vazgeçildi!");
    }else{
      likedPosts.push(Number(postId));

      toast.success("Postu beğendiniz!");
    }

    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

    setLiked(!liked);
  }

  const handleDelete = () => {
    const existingPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

    const updatedPosts = existingPosts.filter((p) => p.id !== post.id);

    toast.success("Post silindi!");
    navigate("/profile");
  };

  const handleEdit = () => {
    const newTitle = prompt("Yeni başlığı girin", post.title);
    const newBody = prompt("Yeni içeriği girin", post.body);

    if(newTitle && newBody){
      const existingPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
      const updatedPosts = existingPosts.map((p) => p.id === post.id ? {...p, title: newTitle, body: newBody}: p);

      localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
      setPost({...post, title: newTitle, body: newBody});

      toast.success("Post Düzenlendi!");
    }else{
      toast.error("Post düzenleme iptal edildi!");
    }
  };

  const isUserPost = () =>{
    const userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

    return userPosts.some((p)=>p.id === post.id);
  }
    if(!post) return <p>Post bulunamadı!</p>;

    return(
      <div style={styles.counter}>
        <div style={styles.post}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <button onClick={handleLike} style={styles.button}>
            {liked ? "Beğenmekten Vazgeç":"Beğen"}
          </button>
          {isUserPost() && (
            <div>
              <button onClick={handleEdit} style={styles.button}>Düzenle</button>
              <button onClick={handleDelete} style={{...styles.button, backgroundColor: "#f44336"}}>Sil</button>
            </div>
          )}
        </div>
        <div style={styles.comments}> 
            <h2>Yorumlar</h2>
            {comments.map((comment) => (
              <div key={comment.id} style={styles.comment}>
                <strong>{comment.name}</strong>
                <p>{comment.body}</p>
              </div>
            ))}
        </div>
      </div>
    );
}
const styles = {
  container: {
    padding: "20px",
  },
  post: {
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  comments: {
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
  },
  comment: {
    marginBottom: "15px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#6200ea",
    color: "white",
    fontSize: "14px",
    marginRight: "10px",
  },
};

export default PostDetails;