import React, { useEffect, useState } from "react";

import apiClient from '../api/apiClient';
import {endpoints} from '../api/endpoints';
import Spinner from "../components/Spinner";
import PostCard from "../components/PostCard";


const Home = () => {

    const [posts, SetPosts] = useState([]);

    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await apiClient.get(endpoints.posts);

                const userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

                SetPosts([...userPosts, ...response.data]);
            } catch (error) {
                console.error("postlar yüklenirken bir hata oluştu:", error);
            }finally{
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if(loading) return <Spinner loading={loading}/>;

    return (
        <div style={{padding: "20px"}}>
            <h1>Post Listesi</h1>
            {posts.map((post) => (
                <PostCard post={post} key={post.id}/>
            ))}
        </div>
    );
}

export default Home;