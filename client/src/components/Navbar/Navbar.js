import React, { Component } from "react";
import NavItems from "./NavItems";
import { Navbar, NavbarBrand, NavbarToggler, Collapse } from "reactstrap";
import "./Navbar.css";

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <Navbar expand="md">
                <NavbarBrand href="/">AlgoPT</NavbarBrand>
                <NavbarToggler
                    className="navbar-toggler"
                    onClick={this.toggle}
                />
                <Collapse
                    className="navbar-collapse"
                    isOpen={this.state.isOpen}
                    navbar
                >
                    <NavItems />
                </Collapse>
            </Navbar>
        );
    }
}

export default AppNavbar;
