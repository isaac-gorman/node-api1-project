// Initial Data
let users = [
  {
    id: "1",
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
  {
    id: "2",
    name: "Jake Doe",
    bio: "Random, random random",
  },
  {
    id: "3",
    name: "Jake Ma",
    bio: "Remember the dreams",
  },
];

// Database Operations on the data AKA functions
// addNewUser()
function addNewUser(data) {
  const payload = {
    id: String(users.length + 1),
    ...data,
  };
  users.push(payload);
  return payload;
}
// getUsers()
function getUsers() {
  return users;
}

function getUserIds() {
  return users.map((user) => {
    return user.id;
  });
}
// getUserByID()
function getUserById(id) {
  return users.find((user) => user.id === id);
}
// updateUser()
function updateUser(id, data) {
  const index = users.findIndex((user) => id === user.id);

  users[index] = {
    ...users[index],
    ...data,
  };

  return users[index];
}
// deleteUser()
function deleteUser(id) {
  return users.filter((user) => user.id !== id);
}

module.exports = {
  addNewUser,
  getUsers,
  getUserIds,
  getUserById,
  updateUser,
  deleteUser,
};
