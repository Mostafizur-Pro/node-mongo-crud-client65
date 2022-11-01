import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData();
  const [displayUsers, setDisplayUsers] = useState(users);

  const handleDelete = (user) => {
    console.log(user.name);
    const agree = window
      .confirm
      // `Are you sure you want to delete: ${user.name}`
      ();
    // console.log(agree);
    if (agree) {
      // console.log("deleting id", user._id);
      fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("User deleted successfully");
            const remainingUsers = displayUsers.filter(
              (urs) => urs._id !== user._id
            );
            setDisplayUsers(remainingUsers);
          }
        });
    }
  };
  return (
    <div>
      <h3>Home Page: {displayUsers.length}</h3>
      {displayUsers.map((user) => (
        <p key={user._id}>
          Name: {user.name}, Email: {user.email}, Address: {user.address}
          <button onClick={() => handleDelete(user)}>X</button>
        </p>
      ))}
    </div>
  );
};

export default Home;
