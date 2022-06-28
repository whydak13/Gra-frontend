import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";

import Popup from "./components/Popup";
import WeaponList from "./components/weaponList";
import { handleSave, handleEdit } from "./components/WeaponsBackend";
import { useState, useEffect } from "react";
import WeaponPage from "./components/weaponPage";
import SpecialRulePage from "./components/specialRulesPage";
import Contact from "./components/Contact";
import {
  Dropdown,
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem,
  Navbar,
  Nav,
  NavbarBrand,
  NavLink,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect="true">
          <Navbar.Brand>Logo</Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse collapseOnSelect="true">
            <Nav>
              <Nav.Link as={Link} to="/">
                Stronga główna
              </Nav.Link>

              <NavDropdown title="Biblioteka" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/bron_wrecz">
                  Broń do walki wręcz
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/zasady_specjalne">
                  Zasady specjalne
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/kontakt">
                Kontakt
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/" element={<h1>Strona z grą</h1>}></Route>
          <Route path="/kontakt" element={<Contact></Contact>}></Route>
          <Route path="/bron_wrecz" element={<WeaponPage></WeaponPage>}></Route>
          <Route
            path="/zasady_specjalne"
            element={<SpecialRulePage></SpecialRulePage>}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
