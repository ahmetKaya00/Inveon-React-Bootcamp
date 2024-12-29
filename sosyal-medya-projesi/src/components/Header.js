import React, { useEffect, useState } from "react"
import { FaHome, FaPlusCircle, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [isLoggendIn, SetIsLoggendIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");

        SetIsLoggendIn(!!user);
    },[]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("likedPosts");
        localStorage.removeItem("userPosts");

        SetIsLoggendIn(false);

        navigate("/login");
    }

    return(
        <header style={styles.header}>
            <Link to="/" style={styles.link}>
                <FaHome/> Home
            </Link>

            {isLoggendIn && (
                <>
                    <Link to="/profile" style={styles.link}>
                        <FaUserCircle/>Profile
                    </Link>
                    <Link to="/add-post" style={styles.link}>
                       <FaPlusCircle/> Add Post
                    </Link>
                    <button onClick={handleLogout} style={styles.logoutbutton}><FaSignOutAlt/>Logout</button>
                </>
            )}
        </header>
    );
}

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#6200ea",
        color: "#fff"
    },
    link: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "18px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
    },
    logoutbutton: {
        backgroundColor: "transparent",
        border: "none",
        color: "#fff",
        fontSize: "18px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        cursor: "pointer",
    },
};
export default Header;