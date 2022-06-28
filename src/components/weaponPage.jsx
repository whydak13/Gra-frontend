import React, { Component } from "react";
import Popup from "./Popup";
import WeaponList from "./weaponList";
import { handleSave, handleEdit } from "./WeaponsBackend";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  Dropdown,
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem,
} from "react-bootstrap";

function WeaponPage() {
  const [buttonPopup, setbuttonPopup] = useState(false);
  const [editPopup, seteditPopup] = useState(false);
  const [addFormData, setAddFormData] = useState({
    weaponName: "",
    weaponRange: "",
    weaponAgility: "",
    weaponImpact: "",
    weaponDescription: "",
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    handleSave(
      addFormData.weaponName,
      addFormData.weaponRange,
      addFormData.weaponAgility,
      addFormData.weaponImpact,
      addFormData.weaponDescription
    );
    setbuttonPopup(false);
    this.forceUpdate();
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    handleEdit(
      addFormData.weaponId,
      addFormData.weaponName,
      addFormData.weaponRange,
      addFormData.weaponAgility,
      addFormData.weaponImpact,
      addFormData.weaponDescription
    );
    seteditPopup(false);
  };

  const handleDeleteFormSubmit = (event) => {
    event.preventDefault();

    let url = "/weapons/" + addFormData.weaponId;

    fetch(url, { method: "DELETE" }).then(() =>
      this.setState({ status: "Delete successful" })
    );

    seteditPopup(false);
  };

  return (
    <div className="App">
      <WeaponList> </WeaponList>
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
        <h3> Dodaj nową broń do walki wręcz</h3>

        <form onSubmit={handleAddFormSubmit}>
          <label style={{ margin: "10px" }}>
            {" "}
            Nazwa
            <input
              type="text"
              name="weaponName"
              required="required"
              placeholder="Nazwa.."
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            Zasięg
            <input
              type="number"
              name="weaponRange"
              required="required"
              min="0.5"
              max="2"
              step="0.5"
              style={{ margin: "10px" }}
              default="1"
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            Celność
            <input
              type="number"
              name="weaponAgility"
              required="required"
              min="-2"
              max="5"
              step="1"
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            Impet
            <input
              type="number"
              name="weaponImpact"
              required="required"
              min="-2"
              max="5"
              step="1"
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            Opis
            <input
              type="text"
              name="weaponDescription"
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
        <h3 style={{ margin: "15px" }}> Edytuj broń do walki wręcz</h3>
        <form onSubmit={handleEditFormSubmit}>
          <label>
            {" "}
            ID
            <input
              type="number"
              name="weaponId"
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
              name="weaponName"
              required="required"
              placeholder="Nazwa.."
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            Zasięg
            <input
              type="number"
              name="weaponRange"
              required="required"
              min="0.5"
              max="2"
              step="0.5"
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            Celność
            <input
              type="number"
              name="weaponAgility"
              required="required"
              min="-2"
              max="5"
              step="1"
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            Impet
            <input
              type="number"
              name="weaponImpact"
              required="required"
              min="-2"
              max="5"
              step="1"
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>
          <label>
            {" "}
            Opis
            <input
              type="text"
              name="weaponDescription"
              placeholder="Opis.."
              style={{ margin: "10px" }}
              onChange={handleAddFormChange}
            />
          </label>

          <button type="submit">Zapisz </button>
        </form>

        <h3 style={{ margin: "15px" }}> Usuń broń do walki wręcz </h3>

        <form onSubmit={handleDeleteFormSubmit}>
          <label>
            {" "}
            ID
            <input
              type="number"
              name="weaponId"
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

export default WeaponPage;
