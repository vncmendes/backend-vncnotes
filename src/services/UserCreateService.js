const { hash } = require("bcryptjs");
const appError = require("../utils/appError");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password, auth}) {

    const checkIfUserExists = await this.userRepository.findByEmail(email);

    if (checkIfUserExists) {
      throw new appError("User Already Exists!");
    }

    if (!name || !email || !password) {
      throw new appError("All fields are required!");
    }
    
    const hashedPassword = await hash(password, 6);

    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword, auth});

    return userCreated;
  }
}

module.exports = UserCreateService;