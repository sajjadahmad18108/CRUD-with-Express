import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = [
    {
        id: 1,
        name: "sajjad",
        email: "sajjad@gmail.com"
    },
    {
        id: 2,
        name: "ahmad",
        email: "ahmad@gmail.com"
    }
];

app.get('/user', (req, res) => {
    res.send(users);
});

// POST request
app.post('/user', (req, res) => {
    try {
        const { name, email } = req.body;
        if (name && email) {
            const newUser = { id: users.length + 1, name, email };
            users.push(newUser);
            res.status(200).send(newUser); // Send the new user object as response
        } else {
            res.status(403).send({ status: 403, message: "Email and name are required" });
        }
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
});

// PUT request (update user)
app.put('/user/:id', (req, res) => {
    const index = users.findIndex(v => v.id === Number(req.params.id));
    if (index !== -1) {
        users[index] = { id: Number(req.params.id), ...req.body };
        return res.status(200).send(users[index]); // Send the updated user object
    } else {
        return res.status(404).send("User not found");
    }
});

// DELETE request
app.delete('/user/:id', (req, res) => {
    try {
        const index = users.findIndex(v => v.id === Number(req.params.id));
        if (index !== -1) {
            users.splice(index, 1);
            return res.status(200).send("The user was deleted successfully");
        } else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        return res.status(500).send("An error occurred while deleting the user");
    }
});

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});
