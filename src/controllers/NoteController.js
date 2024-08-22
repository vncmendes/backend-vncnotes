const knex = require("../database/knex");

class NoteController {
  async create(req, res) {
    const { title, description, tags, links } = req.body;
    const user_id = req.user.id;

    const getId = await knex("notes").insert({
      title,
      description,
      user_id
    }, ["id"])

    const note_id = getId[0].id;
    console.log("*-----*");
    console.log(note_id);

    const tagsToInsert = tags.map(name => {
      return {
        note_id: note_id,
        name,
        user_id
      }
    });

    await knex("tags").insert(tagsToInsert);

    const linksToInsert = links.map(link => {
      return {
        note_id: note_id,
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
        console.log(notes);

    }
    else if (tags && title) {
      
      const filteredTags = tags.split(',').map(tag => tag.trim());
      console.log(filteredTags);
      
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
    else if (title) {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }
    else {
      notes = await knex("notes").where({user_id});
    }

    let idNote;

    notes.map(note => {
      idNote = note.id;
    })

    const userLinks = await knex("links").where({ note_id: idNote });

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
        links: userLinks
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