import React from 'react'

export default function Dashboard() {

    const handleLogout = () =>{
        localStorage.removeItem("jwt");
        window.location.href = "/login";
    };
  return (
    <div>
        <h1>Welcome to the Dashboard</h1>

        <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
