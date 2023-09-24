const app = require('../app');
const request = require("supertest")
require("../models")

let id

test('GET /genres debe retornar un arreglo con todos los genres', async () => { 
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
})

test("POST /genres debe crear un nuevo genre", async () => {
    const body = {
        name: "test"
    }
    const res = await request(app).post('/genres').send(body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name', body.name) //? primero el keyValue Y opcionalmente el value //valor que debe tener

})

test("PUT /genres/:id debe actualizar un genre", async () => {
    const body = {
        name: "test updated"
    }
    const res = await request(app).put(`/genres/${id}`).send(body)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name', body.name)
})

test ("DELETE /genres/:id debe eliminar un genre", async () => {
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204)
})
