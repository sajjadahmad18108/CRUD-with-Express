import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/user";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  async function fetchUsers() {
    const response = await axios.get(API_URL);
    setUsers(response.data); // Fixed: set users directly
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add a user (CREATE)
  const addUser = () => {
    axios
      .post(API_URL, { name: newUser.name, email: newUser.email })
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({ name: "", email: "" }); // Reset input
      })
      .catch((err) => console.error(err));
  };

  // Update user by ID (UPDATE)
  const updateUserById = (id) => {
    axios
      .put(`${API_URL}/${id}`, { name: updateUser.name, email: updateUser.email })
      .then((response) => {
        setUsers(users.map((user) => (user.id === id ? response.data : user)));
        setUpdateUser({ id: "", name: "", email: "" }); // Reset input
      })
      .catch((err) => console.error(err));
  };

  // Delete a user (DELETE)
  const deleteUserById = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>CRUD Operations with Express & React</h1>
      <input
        type="text"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        placeholder="Enter new user"
      />
      <input
        type="text"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        placeholder="Enter user email"
      />
      <button onClick={addUser}>Add User</button>

      {updateUser.id && (
        <div>
          <input
            type="text"
            value={updateUser.name}
            onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
            placeholder="Update user name"
          />
          <input
            type="text"
            value={updateUser.email}
            onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
            placeholder="Update user email"
          />
          <button onClick={() => updateUserById(updateUser.id)}>Update User</button>
        </div>
      )}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => setUpdateUser({ id: user.id, name: user.name, email: user.email })}>
              Edit
            </button>
            <button onClick={() => deleteUserById(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
