import React from "react";

export default function FormPage() {
  const [user, setUser] = React.useState({});
  function getInfo(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    setUser({
      name: formdata.get("name"),
      phone: formdata.get("phone"),
      mail: formdata.get("email"),
      address: formdata.get("address"),
    });
    console.log(e.target);
    console.log(formdata.get("name"));
  }
  return (
    <>
      <h1>Please Write Down Your Information</h1>
      <form onSubmit={getInfo}>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" />

        <label htmlFor="number">Phone:</label>
        <input id="number" type="number" name="phone" />

        <label htmlFor="email">Email:</label>
        <input type="mail" name="email" />

        <label htmlFor="address">Address:</label>
        <input id="address" type="text" name="address" />
        <button>Send Request</button>
      </form>
    </>
  );
}
