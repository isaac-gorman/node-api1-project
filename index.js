const express = require("express");
const db = require("./database");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to the Database!");
});

server.get("/api/users", (req, res) => {
  const users = db.getUsers();

  if (users) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

server.get("/api/users/:id", (req, res) => {
  // the param variable variable matches to the name of our URL param above
  const id = req.params.id;
  const user = db.getUserById(id);
  // const userIDs = db.getUserIds();
  if (user) {
    return res.status(200).json(user);
  } else if (!user) {
    return res.status(404).json({
      error_message: `user with id:${id} can not be found`,
      // existing_user_ids: `Only users with id numbers: ${userIDs} exist`,
    });
  } else {
    return res.status(500).json({
      errorMessage: "The user information could not be retrieved.",
    });
  }
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  const newUser = db.addNewUser({
    name: req.body.name,
    bio: req.body.bio,
  });

  if (!name || !bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (name && bio) {
    return res.status(201).json(newUser);
  } else {
    return res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.put("/api/users/:id", (req, res) => {
  const { name, bio } = req.body;
  const id = req.params.id;
  const updatedUser = db.updateUser(id, {
    name: req.body.name,
    bio: req.body.bio,
  });

  if (!name || !bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (name && bio) {
    return res.status(201).json(updatedUser);
  } else {
    return res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);
  const userIDs = db.getUserIds();
  if (user) {
    res.status(204).json({
      success_message: `User with id:${id} was successfully deleted `,
    });
    db.deleteUser(id);
  } else {
    res.status(404).json({
      error_message: `user with id:${id} can not be found`,
      existing_user_ids: `Only users with id numbers: ${userIDs} exist`,
    });
  }
});

server.listen(8000, () => {
  console.log("Server is listening to port 8000");
});
