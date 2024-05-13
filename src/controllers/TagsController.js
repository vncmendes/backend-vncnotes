const knex = require("../database/knex");

class TagsController {
  async index(req, res) {
    const { user_id } = req.params;
    const tags = await knex("tags").where({ user_id });
    res.json(tags);
  }

  async read(req, res) {
    const tags = await knex("tags").select();
    res.json(tags);
  }
}

module.exports = TagsController;