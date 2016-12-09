import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Enrollment } from '.'

const app = () => express(routes)

let enrollment

beforeEach(async () => {
  enrollment = await Enrollment.create({})
})

test('POST /enrollments 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ enrollment_uuid: 'test', class_uuid: 'test', user: 'test', role: 'test', primary_role: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.enrollment_uuid).toEqual('test')
  expect(body.class_uuid).toEqual('test')
  expect(body.user).toEqual('test')
  expect(body.role).toEqual('test')
  expect(body.primary_role).toEqual('test')
  expect(body.status).toEqual('test')
})

test('GET /enrollments 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /enrollments/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${enrollment.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(enrollment.id)
})

test('GET /enrollments/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /enrollments/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${enrollment.id}`)
    .send({ enrollment_uuid: 'test', class_uuid: 'test', user: 'test', role: 'test', primary_role: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(enrollment.id)
  expect(body.enrollment_uuid).toEqual('test')
  expect(body.class_uuid).toEqual('test')
  expect(body.user).toEqual('test')
  expect(body.role).toEqual('test')
  expect(body.primary_role).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /enrollments/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ enrollment_uuid: 'test', class_uuid: 'test', user: 'test', role: 'test', primary_role: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /enrollments/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${enrollment.id}`)
  expect(status).toBe(204)
})

test('DELETE /enrollments/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
