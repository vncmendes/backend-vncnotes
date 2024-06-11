const knex = require("../database/knex");

class TagsController {
//   async index(req, res) {
//     const user_id = req.user.id;
//     const tags = await knex("tags")
//     .where({ user_id })
//     .groupBy("name")
// console.log("oi2");
//     return res.json(tags);
//   }

  async read(req, res) {
    const user_id = req.user.id;
    const tags = await knex("tags")
    .where({ user_id })
    .groupBy("name");
  
    return res.json(tags);
  }

  // async read(req, res) {
  //   const tags = await knex("tags").select();
  //   console.log("oi");
  //   res.json(tags);
  // }
}

module.exports = TagsController;