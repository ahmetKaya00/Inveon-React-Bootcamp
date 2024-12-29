import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { categories } from "../data";


const CategoryList = ({onCategorySelect}) => {
    return(
        <div>
            <h5>Categories</h5>
            <ListGroup>
                {categories.map((category, index)=>(
                    <ListGroupItem key={index} onClick={()=>onCategorySelect(category)}>{category}</ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}

export default CategoryList;