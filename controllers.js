import NoteModel from "./NoteModel.js";

export const createNote = async (request, response) => {
  try {
    const { title, text } = request.body;
    const note = new NoteModel({ text, title });
    await note.save();
    response.json(note);
  } catch (error) {
    console.log(error);
    response.json({ message: "Ошибка при создании заметки." });
  }
};

export const getNotes = async (request, response) => {
  try {
    const notes = await NoteModel.find().sort("-updatedAt");

    if (!notes) {
      return response.json({ message: "Заметки отсутствуют." });
    }

    response.json(notes);
  } catch (error) {
    console.log(error);
    response.json({ message: "Ошибка при получении заметок." });
  }
};

export const getNoteById = async (request, response) => {
  try {
    const note = await NoteModel.findById(request.params.id);
    response.json(note);
  } catch (error) {
    console.log(error);
    response.json({ message: "Ошибка при получении заметок." });
  }
};

export const deleteNote = async (request, response) => {
  try {
    const { id } = request.body;
    const note = await NoteModel.findByIdAndDelete(id);
    if (!note) return response.json({ message: "Такого поста нет." });
    response.json({ message: "Заметка удалена." });
  } catch (error) {
    console.log(error);
    response.json({ message: "Ошибка при удалении заметки." });
  }
};

export const updateNote = async (request, response) => {
  try {
    const { title, text, id } = request.body;
    const note = await NoteModel.findById(id);
    note.title = title;
    note.text = text;
    await note.save();
    response.json(note);
  } catch (error) {
    console.log(error);
    response.json({ message: "Ошибка при удалении заметки." });
  }
};
