import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Subject } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Subject.create(body)
    .then((subject) => subject.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Subject.find(query, select, cursor)
    .then((subjects) => subjects.map((subject) => subject.view()))
    .then (res => ({'subjects':res,
    total:100,  "current_page": 1,
    "page_size": 10,
    "total_pages": 2}))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Subject.findById(params.id)
    .then(notFound(res))
    .then((subject) => subject ? subject.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Subject.findById(params.id)
    .then(notFound(res))
    .then((subject) => subject ? _.merge(subject, body).save() : null)
    .then((subject) => subject ? subject.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Subject.findById(params.id)
    .then(notFound(res))
    .then((subject) => subject ? subject.remove() : null)
    .then(success(res, 204))
    .catch(next)
