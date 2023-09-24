const app = require('../app');
const request = require("supertest");
const Directors = require('../models/Directors');
const Actors = require('../models/Actors');
const Genres = require('../models/Genres');
require("../models")

let id

test('GET /movies debe retornar un arreglo con todos los movies', async () => { 
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
})

test("POST /movies debe crear un nuevo movies", async () => {
    const body = {
        name: "test",
        image:"test.jpg",
        synopsis:"test",
        releaseYear:2020
    }
    const res = await request(app).post('/movies').send(body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name', body.name) //? primero el keyValue Y opcionalmente el value //valor que debe tener

})

test("PUT /movies/:id debe actualizar un movies", async () => {
    const body = {
        name: "test updated"
    }
    const res = await request(app).put(`/movies/${id}`).send(body)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name', body.name)
})

test("GET /movies/:id/directors debe setear un director en movies", async () => {
    const director = await Directors.create({
        firstName: "test",
        lastName: "test",
        image: "example.jpg",
        nationality:"test",
        birthday:"1990/01/01"
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id])
    await director.destroy()
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
})

test("GET /movies/:id/actors debe setear un actor en movies", async () => {
    const actor = await Actors.create({
        firstName: "test",
        lastName: "test",
        image: "example.jpg",
        nationality:"test",
        birthday:"1990/01/01"
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
    await actor.destroy()
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
})

test("GET /movies/:id/genres debe setear un genre en movies", async () => {
    const genres = await Genres.create({
        name: "test"
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genres.id])
    await genres.destroy()
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
})

test ("DELETE /movies/:id debe eliminar un movies", async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204)
})
