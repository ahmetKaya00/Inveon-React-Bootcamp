import React from 'react'
import { blogs } from '../data'
import { ListGroup, ListGroupItem } from 'reactstrap';

const RecentBlogs = ({onBlogSelect}) => {
    const recentBlogs = blogs.slice(0,5);

    return(
        <div>
            <h5>Recent Blogs</h5>
            <ListGroup>
                {recentBlogs.map(blog => (
                    <ListGroupItem key={blog.id} onClick={()=>onBlogSelect(blog.id)}>{blog.title}</ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}
export default RecentBlogs;