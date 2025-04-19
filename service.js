const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'users.json');

let users = [];

function loadUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    users = JSON.parse(data);
    console.log(`Loaded ${users.length} users`);
  } catch (err) {
    console.error('Error loading users:', err);
    users = [];
  }
  return users;
}

function saveUsers() {
  fs.writeFileSync(
    usersFilePath,
    JSON.stringify(users, null, 2),
    'utf8'
  );
  console.log(`Saved ${users.length} users`);
}

function getUsers() {
  return users;
}

function findUserById(id) {
  return users.find(user => user.id === parseInt(id));
}

function generateNextId() {
  return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
}

function addUser(user) {
  users.push(user);
  saveUsers();
  return true;
}

function updateUser(id, userData) {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return false;
  
  users[index] = { ...users[index], ...userData };
  saveUsers();
  return true;
}

function deleteUser(id) {
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);
  
  if (users.length === initialLength) return false;
  
  saveUsers();
  return true;
}

function setUsers(newUsers) {
  users = newUsers;
  console.log(`Set ${users.length} users from external source`);
  return users;
}

// Initialize users
loadUsers();

module.exports = {
  getUsers,
  findUserById,
  generateNextId,
  addUser,
  updateUser,
  deleteUser,
  setUsers  // Add this export
};