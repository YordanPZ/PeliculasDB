const app = require('../app');
const request = require("supertest")
require("../models")

let id

test('GET /actors debe retornar un arreglo con todos los actors', async () => { 
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
})

test("POST /actors debe crear un nuevo actor", async () => {
    const body = {
        firstName: "test",
        lastName: "test",
        image: "example.jpg",
        nationality:"test",
        birthday:"1990/01/01"
    }
    const res = await request(app).post('/actors').send(body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('firstName', body.firstName) //? primero el keyValue Y opcionalmente el value //valor que debe tener

})

test("PUT /actors/:id debe actualizar un actor", async () => {
    const body = {
        firstName: "test updated"
    }
    const res = await request(app).put(`/actors/${id}`).send(body)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('firstName', body.firstName)
})

test ("DELETE /actors/:id debe eliminar un actor", async () => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
})
