export function handleSave(requestBody, url) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    changeOrigin: true,
    body: requestBody,
  };
  fetch(url, requestOptions).then((response) => response.json());
  //.then(data => this.setState({ postId: data.id }));

  //@PostMapping("/weapons")
}

export function handleEdit(requestBody, url, id) {
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    changeOrigin: true,
    body: requestBody,
  };

  let url2 = "http://localhost:8080/specialrules/" + id;
  fetch(url2, requestOptions).then((response) => response.json());
  //.then(data => this.setState({ postId: data.id }));
}
