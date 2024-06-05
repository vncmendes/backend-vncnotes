const knex = require("../database/knex");
const appError = require("../utils/appError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
  async update(req, res) {
    const user_id = req.user.id;
    const avatarFilename = req.file.filename;
    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();
    console.log(user);
    if (!user) {
      throw new appError("Usuário não autorizado !", 401);
    }

    if (user.avatar) {
      await diskStorage.dropFile(user.avatar);
    }

    const newFilename = await diskStorage.saveFile(avatarFilename);
    user.avatar = newFilename;

    await knex("users").update(user).where({ id: user_id });

    return res.json(user);

  }
}

module.exports = UserAvatarController;