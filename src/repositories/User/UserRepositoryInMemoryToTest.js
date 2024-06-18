class UserRepositoryInMemoryToTest {
  users = [];

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async create({ name, email, password, auth }) {
    const user = {
      id: Math.floor(Math.random * 100) + 3,
      name,
      email,
      password,
      auth
    };

    this.users.push(user);

    return user;
  }
}

module.exports = UserRepositoryInMemoryToTest