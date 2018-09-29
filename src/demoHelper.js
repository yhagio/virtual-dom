const exampleUsers = [
  { id: 1, firstName: "Yuichi", lastName: "Hagio" },
  { id: 2, firstName: "Kevin", lastName: "Harold" },
  { id: 3, firstName: "Alicia", lastName: "Roman" },
  { id: 4, firstName: "Sashko", lastName: "Eliwno" },
  { id: 5, firstName: "Layla", lastName: "Lopez" },
  { id: 6, firstName: "Yuk", lastName: "Mok" },
  { id: 7, firstName: "William", lastName: "Robinson" },
  { id: 8, firstName: "Ayaka", lastName: "Suto" },
  { id: 9, firstName: "Edwin", lastName: "McDonald" },
  { id: 10, firstName: "Olman", lastName: "Nelson" }
];

function pickRandomUser() {
  const index = Math.floor(Math.random() * 8);
  return exampleUsers[index];
}

module.exports = {
  pickRandomUser
};
