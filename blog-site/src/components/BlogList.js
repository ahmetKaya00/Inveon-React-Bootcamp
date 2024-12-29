import React from "react";
import { blogs } from "../data";
import { Col, Row } from "reactstrap";
import BlogCard from "./BlogCard";


const BlogList = ({selectedCategory, onBlogSelect}) => {

    const filteredBlogs = selectedCategory ? blogs.filter(blog => blog.category === selectedCategory && blog.isActive) : blogs.filter(blog => blog.isActive);

    return(
        <Row>
            {filteredBlogs.map(blog=>(
            <Col sm="12" key={blog.id}>
                <BlogCard blog={blog} onClick={onBlogSelect}></BlogCard>
            </Col>
            ))}
        </Row>
    );
}

export default BlogList;