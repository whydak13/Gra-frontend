import React from "react";

export function handleSave(name, reach, agility, impact, description) {
  let cost = calulateWeaponCost(reach, agility, impact);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    changeOrigin: true,
    body: JSON.stringify({
      name: name,
      reach: reach,
      agility: agility,
      impact: impact,
      cost: cost,
      description: description,
    }),
  };
  fetch("/weapons", requestOptions).then((response) => response.json());
  //.then(data => this.setState({ postId: data.id }));

  console.log("Save Clicked");

  //@PostMapping("/weapons")
}

export function handleEdit(id, name, reach, agility, impact, description) {
  let cost = calulateWeaponCost(reach, agility, impact);
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    changeOrigin: true,
    body: JSON.stringify({
      name: name,
      reach: reach,
      agility: agility,
      impact: impact,
      cost: cost,
      description: description,
    }),
  };

  let url = "/weapons/" + id;
  fetch(url, requestOptions).then((response) => response.json());
  //.then(data => this.setState({ postId: data.id }));

  console.log("Edit " + id);
}

export function calulateWeaponCost(range, agility, impact) {
  return range * 4 + agility * 2 + impact * 2;
}
