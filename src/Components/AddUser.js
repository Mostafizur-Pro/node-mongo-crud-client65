import React, { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState({ name: "default", email: "de@gmail.com" });
  const handleAddUser = (event) => {
    event.preventDefault();
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("user added successfully");
          event.target.reset("");
        }
      });
  };
  const handleInputBlue = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    const newUser = { ...user };
    newUser[fieldName] = value;
    setUser(newUser);
    // console.log(newUser);
  };
  return (
    <div>
      <h3> Please add a new user</h3>
      <form onClick={handleAddUser}>
        <input
          onBlur={handleInputBlue}
          type="text"
          name="name"
          placeholder="name"
          id=""
          required
        />
        <br />
        <input
          onBlur={handleInputBlue}
          type="text"
          name="address"
          placeholder="address"
          id=""
          required
        />
        <br />
        <input
          onBlur={handleInputBlue}
          type="email"
          name="email"
          placeholder="email"
          id=""
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
