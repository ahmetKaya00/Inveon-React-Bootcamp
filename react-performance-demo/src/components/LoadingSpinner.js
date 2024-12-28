import React from "react";
const { ClipLoader } = require("react-spinners")

const LoadingSpinner = ({size = 50, color= "#007BFF"}) => {
    return <ClipLoader size={size} color={color}/>
}

export default LoadingSpinner;