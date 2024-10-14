const { nanoid } = require('nanoid')
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const{ title, tags, body } = request.payload; 
    const id = nanoid(16)
    const createdAt =  new Date().toISOString();
    const updatedat = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);

    const isSucces = notes.filter((note) => note.id === id).length > 0;

    if (isSucces) {
        const response = h.response({
            status: 'succes',
            message: 'catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan gagal ditambahkan',

    });

    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'succes',
    data: {
        notes,
    },
});

const getAllNoteByHandler = (request, h) => {
    const 
    { id } = request.params;

    const note = notes.filter((n) => n.id === id) [0];

    if (note !== undefined) {
        return {
            status: 'succes',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toDateString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response({
            status: 'succes',
            message: 'catatan berhasil diperbahrui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'succes',
            message: 'catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'catatan gagal dihapus',
    });
    response.code(404);
    return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getAllNoteByHandler, editNoteByIdHandler, deleteNoteByIdHandler };