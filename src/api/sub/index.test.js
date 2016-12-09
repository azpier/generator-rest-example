import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Sub } from '.'

const app = () => express(routes)

let sub

beforeEach(async () => {
  sub = await Sub.create({})
})

test('POST /subs 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ name: 'test', disabled: 'test', org: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.disabled).toEqual('test')
  expect(body.org).toEqual('test')
})

test('GET /subs 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /subs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${sub.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(sub.id)
})

test('GET /subs/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /subs/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${sub.id}`)
    .send({ name: 'test', disabled: 'test', org: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(sub.id)
  expect(body.name).toEqual('test')
  expect(body.disabled).toEqual('test')
  expect(body.org).toEqual('test')
})

test('PUT /subs/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ name: 'test', disabled: 'test', org: 'test' })
  expect(status).toBe(404)
})

test('DELETE /subs/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${sub.id}`)
  expect(status).toBe(204)
})

test('DELETE /subs/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
