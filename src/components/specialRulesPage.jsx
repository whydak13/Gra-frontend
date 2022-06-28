import React, { Component } from "react";
import Popup from "./Popup";
import SpecialRuleList from "./specialRuleList";
import {
  handleSaveSpecialRule,
  handleEditSpecialRule,
} from "./SpecialRulesBackend";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  Dropdown,
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem,
} from "react-bootstrap";

function SpecialRulePage() {
  const [buttonPopup, setbuttonPopup] = useState(false);
  const [editPopup, seteditPopup] = useState(false);
  const [addFormData, setAddFormData] = useState({
    specialRuleName: "",
    //specialRuleCampOnly: false,
    specialRuleCostAdd: "",
    specialRuleCostMultiply: "",
    specialRuleDescription: "",
  });
  const [specialRuleCampOnly, setspecialRuleCampOnly] = useState(false);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleToggle = ({ target }) =>
    setspecialRuleCampOnly(!specialRuleCampOnly);

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    handleSaveSpecialRule(
      addFormData.specialRuleName,
      specialRuleCampOnly,
      addFormData.specialRuleCostAdd,
      addFormData.specialRuleCostMultiply,
      addFormData.specialRuleDescription
    );
    setbuttonPopup(false);
    this.forceUpdate();
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    handleEditSpecialRule(
      addFormData.specialRuleId,
      addFormData.specialRuleName,
      specialRuleCampOnly,
      addFormData.specialRuleCostAdd,
      addFormData.specialRuleCostMultiply,
      addFormData.specialRuleDescription
    );
    seteditPopup(false);
  };

  const handleDeleteFormSubmit = (event) => {
    event.preventDefault();

    let url = "http://localhost:8080/specialrules/" + addFormData.specialRuleId;

    fetch(url, { method: "DELETE" }).then(() =>
      this.setState({ status: "Delete successful" })
    );

    seteditPopup(false);
  };

  return (
    <div className="App">
      <SpecialRuleList> </SpecialRuleList>
      <section style={{ padding: "20px" }}>
        <button
          onClick={() => setbuttonPopup(true)}
          className="btn btn-secondary btn-sm"
          style={{ position: "relative", right: "10px" }}
        >
          Dodaj
        </button>

        <button
          onClick={() => seteditPopup(true)}
          className="btn btn-secondary btn-sm"
          style={{ position: "relative", left: "10px" }}
        >
          Edytuj
        </button>
      </section>

      <Popup trigger={buttonPopup}>
        <button
          className="btn btn-secondary btn-sm"
          style={{ position: "fixed", right: "16px", top: "6px" }}
          onClick={() => setbuttonPopup(false)}
        >
          Zamknij
        </button>
        <h3> Dodaj nową zasadę specjalną</h3>

        <form onSubmit={handleAddFormSubmit}>
          <label style={{ margin: "10px" }}>
            Nazwa
            <input
              type="text"
              name="specialRuleName"
              required="required"
              placeholder="Nazwa.."
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            Kampania
            <input
              type="checkbox"
              onChange={handleToggle}
              key={specialRuleCampOnly}
              name={specialRuleCampOnly}
              checked={specialRuleCampOnly}
              style={{ margin: "10px" }}
            />
          </label>
          <label>
            {" "}
            Koszt
            <input
              type="number"
              name="specialRuleCostMultiply"
              required="required"
              min="0.5"
              max="2"
              step="0.01"
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            *X +
            <input
              type="number"
              name="specialRuleCostAdd"
              required="required"
              min="-50"
              max="50"
              step="0.05"
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>

          <label>
            {" "}
            Opis
            <input
              type="text"
              name="specialRuleDescription"
              placeholder="Opis.."
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>

          <button type="submit">Zapisz </button>
        </form>
      </Popup>

      <Popup trigger={editPopup}>
        <button
          className="btn btn-secondary btn-sm"
          style={{ position: "fixed", right: "16px", top: "6px" }}
          onClick={() => seteditPopup(false)}
        >
          Zamknij
        </button>
        <h3 style={{ margin: "15px" }}> Edytuj zasadę specjalną</h3>
        <form onSubmit={handleEditFormSubmit}>
          <label>
            {" "}
            ID
            <input
              type="number"
              name="specialRuleId"
              required="required"
              step="1"
              min="1"
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            Nazwa
            <input
              type="text"
              name="specialRuleName"
              required="required"
              placeholder="Nazwa.."
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            Kampania
            <input
              type="checkbox"
              onChange={handleToggle}
              key={specialRuleCampOnly}
              name={specialRuleCampOnly}
              checked={specialRuleCampOnly}
              style={{ margin: "10px" }}
            />
          </label>
          <label>
            {" "}
            Koszt
            <input
              type="number"
              name="specialRuleCostMultiply"
              required="required"
              min="0.5"
              max="2"
              step="0.01"
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            *X +
            <input
              type="number"
              name="specialRuleCostAdd"
              required="required"
              min="-50"
              max="50"
              step="0.05"
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            Opis
            <input
              type="text"
              name="specialRuleDescription"
              placeholder="Opis.."
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>

          <button type="submit">Zapisz </button>
        </form>

        <h3 style={{ margin: "15px" }}> Usuń zasadę specjaną </h3>

        <form onSubmit={handleDeleteFormSubmit}>
          <label>
            {" "}
            ID
            <input
              type="number"
              name="specialRuleId"
              required="required"
              step="1"
              min="1"
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>

          <button type="submit">Usuń </button>
        </form>
      </Popup>
    </div>
  );
}

export default SpecialRulePage;
