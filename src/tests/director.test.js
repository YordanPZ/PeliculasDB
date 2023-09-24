const app = require('../app');
const request = require("supertest")
require("../models")

let id

test('GET /directors debe retornar un arreglo con todos los directors', async () => { 
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
})

test("POST /directors debe crear un nuevo director", async () => {
    const body = {
        firstName: "test",
        lastName: "test",
        image: "example.jpg",
        nationality:"test",
        birthday:"1990/01/01"
    }
    const res = await request(app).post('/directors').send(body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('firstName', body.firstName) //? primero el keyValue Y opcionalmente el value //valor que debe tener

})

test("PUT /directors/:id debe actualizar un directors", async () => {
    const body = {
        firstName: "test updated"
    }
    const res = await request(app).put(`/directors/${id}`).send(body)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('firstName', body.firstName)
})

test ("DELETE /directors/:id debe eliminar un directors", async () => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204)
})
