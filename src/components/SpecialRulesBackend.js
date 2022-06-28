import React from "react";

export function handleSaveSpecialRule(
  name,
  camp_only,
  cost_add,
  cost_multiply,
  description
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    changeOrigin: true,
    body: JSON.stringify({
      name: name,
      camp_only: camp_only,
      cost_add: cost_add,
      cost_multiply: cost_multiply,
      description: description,
    }),
  };
  fetch(
    "http://localhost:8080/specialrules/",
    requestOptions
  ).then((response) => response.json());
  //.then(data => this.setState({ postId: data.id }));

  console.log("Save Clicked" + camp_only);

  //@PostMapping("/weapons")
}

export function handleEditSpecialRule(
  id,
  name,
  camp_only,
  cost_add,
  cost_multiply,
  description
) {
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    changeOrigin: true,
    body: JSON.stringify({
      name: name,
      camp_only: camp_only,
      cost_add: cost_add,
      cost_multiply: cost_multiply,
      description: description,
    }),
  };

  let url = "http://localhost:8080/specialrules/" + id;
  fetch(url, requestOptions).then((response) => response.json());
  //.then(data => this.setState({ postId: data.id }));

  console.log("Edit " + id);
}
