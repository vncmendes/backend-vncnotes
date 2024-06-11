const knex = require("../database/knex");

class NoteController {
  async create(req, res) {
    const { title, description, tags, links } = req.body;
    const user_id = req.user.id;

    const note_id = await knex("notes").insert({
      title,
      description,
      user_id
    });

    console.log(note_id);

    const tagsToInsert = tags.map(name => {
      return {
        note_id: note_id[0],
        name,
        user_id
      }
    });

    await knex("tags").insert(tagsToInsert);

    const linksToInsert = links.map(link => {
      return {
        note_id: note_id[0],
        url: link
      }
    });

    await knex("links").insert(linksToInsert);
    
    return res.json();
  }

  async index(req, res) {
    const { title, tags, id } = req.query;
    const user_id = req.user.id;

    let notes;

    if (id) {
      notes = await knex("notes")
        .where("notes.id", id);
        // console.log(notes);

    } else if (tags) {
        const filteredTags = tags.split(',').map(tag => tag.trim());

        notes = await knex("tags")
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id"
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filteredTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.title");
    }
     else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags
      }
    });

    return res.json(notesWithTags);
  }

  async update(req, res) {}

  async delete(req, res) {
    const { id } = req.params;
    await knex("notes").where({id}).delete();
    return res.json();
  }
}

module.exports = NoteController;