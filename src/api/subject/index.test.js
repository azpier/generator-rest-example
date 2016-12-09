import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Subject } from '.'

const app = () => express(routes)

let subject

beforeEach(async () => {
  subject = await Subject.create({})
})

test('POST /subjects 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ subject_uuid: 'test', name: 'test', organization_uuid: 'test', disabled: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.subject_uuid).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.organization_uuid).toEqual('test')
  expect(body.disabled).toEqual('test')
})

test('GET /subjects 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /subjects/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${subject.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(subject.id)
})

test('GET /subjects/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /subjects/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${subject.id}`)
    .send({ subject_uuid: 'test', name: 'test', organization_uuid: 'test', disabled: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(subject.id)
  expect(body.subject_uuid).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.organization_uuid).toEqual('test')
  expect(body.disabled).toEqual('test')
})

test('PUT /subjects/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ subject_uuid: 'test', name: 'test', organization_uuid: 'test', disabled: 'test' })
  expect(status).toBe(404)
})

test('DELETE /subjects/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${subject.id}`)
  expect(status).toBe(204)
})

test('DELETE /subjects/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
