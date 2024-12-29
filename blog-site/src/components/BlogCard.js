import React from "react";
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";

const BlogCard = ({blog, onClick}) => {
    return(
        <Card className="mb-3">
            <Row noGutters>
                <Col md="4">
                    <img src={blog.imageUrl} alt={blog.title} className="img-fluid"></img>
                </Col>
                <Col md="8">
                    <CardBody>
                        <CardTitle tag="h5">{blog.title}</CardTitle>
                        <CardText>{blog.description}</CardText>
                        <button className="btn btn-primary" onClick={()=>onClick(blog.id)}>Read More</button>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    );
}
export default BlogCard;