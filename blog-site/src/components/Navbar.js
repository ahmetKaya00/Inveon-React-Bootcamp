import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const Navigation = () =>{
    return(
        <Navbar color="light" expand="md">
            <NavbarBrand href="/">Blog Site</NavbarBrand>
        </Navbar>
    );
}

export default Navigation;