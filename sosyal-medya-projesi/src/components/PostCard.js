import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({post}) => {
    return (
        <div style={styles.card}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/post/${post.id}`} style={styles.link}>
                Detayları Gör
            </Link>
        </div>
    );
}
const styles = {
    card: {
        border: "1x solid #ddd",
        borderRadious: "8px",
        padding: "16px",
        marginBottom: "10px",
        backgroundColor: "#fff",
    },
    link: {
        display: "inline-block",
        martginTop: "10px",
        color: "#6200ea",
        textDecoration: "none",
        fontWeight: "bold",
    },
};

export default PostCard;