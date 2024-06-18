const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemoryToTest = require("../repositories/User/UserRepositoryInMemoryToTest");
const appError = require("../utils/appError");

describe("User Tests", () => {
  let userRepositoryInMemoryToTest = null;
  let userCreateService = null;


  beforeEach(() => {
    userRepositoryInMemoryToTest = new UserRepositoryInMemoryToTest();
    userCreateService = new UserCreateService(userRepositoryInMemoryToTest);
  })

  it("should create a user", async () => {
    const user = {
      name: "Vini",
      email: "vini@email.com",
      password: "123",
      auth: false
    }
  
    // const userRepositoryInMemoryToTest = new UserRepositoryInMemoryToTest();
    // const userCreateService = new UserCreateService(userRepositoryInMemoryToTest);
    const userCreated = await userCreateService.execute(user);
  
    expect(userCreated).toHaveProperty("id");
  });

  it("check if email already exists", async () => {
    const user1 = {
      name: "joao",
      email: "joao@email.com",
      password: "123",
      auth: false
    }

    const user2 = {
      name: "joao algusto",
      email: "joao@email.com",
      password: "345",
      auth: false
    }

    expect();

    // const userRepository = new UserRepositoryInMemoryToTest();
    // const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new appError("User Already Exists!"));
  });



});

