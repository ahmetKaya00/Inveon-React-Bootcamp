import React, { useState } from "react";
import { BrowserRouter as Router, Route,  Routes } from "react-router-dom";
import Navigation from "./components/Navbar";
import { Col, Container, Row } from "reactstrap";
import CategoryList from "./components/CategoryList";
import RecentBlogs from "./components/RecentBlogs";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";


const App = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  }
  const handleBlogSelect = (id) => {
    window.location.href = `/blog/${id}`;
  }

  return(
    <Router>
      <div>
        <Navigation/>
        <Routes>
          <Route
            path="/" element={
              <Container>
                <Row className="mt-4">
                  <Col sm="3">
                    <CategoryList onCategorySelect={handleCategorySelect}/>
                    <RecentBlogs onBlogSelect={handleBlogSelect} />
                  </Col>
                  <Col sm="9">
                    <BlogList selectedCategory={selectedCategory} onBlogSelect={handleBlogSelect}/>
                  </Col>
                </Row>
              </Container>
            }
          ></Route>
          <Route path="/blog/:id" element={<BlogDetail/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;