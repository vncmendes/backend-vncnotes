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

    const linksToInsert = links.map(link => {
      return {
        note_id: note_id[0],
        url: link
      }
    });

    await knex("links").insert(linksToInsert);

    const tagsToInsert = tags.map(name => {
      return {
        note_id: note_id[0],
        name,
        user_id
      }
    });

    await knex("tags").insert(tagsToInsert);

    res.json();
  }

  async index(req, res) {
    const { description, tags } = req.query;
    const user_id = req.user.id;
    
    let notes;

    if (user_id && description && tags) {
      const filteredTags = tags.split(',').map(tag =>  tag.trim());
      notes = await knex("notes")
      .select([
        "notes.id",
        "notes.description",
        "notes.user_id"
      ])
      .where("notes.user_id", user_id)
      .whereLike("notes.description", `%${description}%`)
      .whereIn("name", filteredTags)
      .innerJoin("tags", "tags.note_id", "notes.id")
      .orderBy("notes.description");
    } else if (user_id && description) {
        notes = await knex("notes").where({ user_id }).whereLike("description", `%${description}%`);
    } else if (user_id) {
        notes = await knex("notes").where({ user_id })
    } else if (description) {
        notes = await knex("notes").whereLike("description", `%${description}%`);
    }

    if (user_id) {
      const userTags = await knex("tags").where({ user_id });
      const notesWithTags = notes.map(note => {
        const noteTags = userTags.filter(tag => tag.note_id === note.id);
  
        return {
          ...note,
          tags: noteTags
        }
      })
  
      return res.json(notesWithTags);
    }
    notes = await knex("notes").select();
    return res.json(notes);
  }

  async read(req, res) {
    const { id } = req.params;

    const note = await knex("notes").where({id}).first(); // passing the id doesn't need the first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links").where({ note_id: id}).orderBy("created_at");
    return res.json({
      ...note,
      tags,
      links
    });
  }

  async update(req, res) {}

  async delete(req, res) {
    const { id } = req.params;
    await knex("notes").where({id}).delete();
    return res.json();
  }
}

module.exports = NoteController;