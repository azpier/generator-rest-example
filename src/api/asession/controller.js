import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Asession } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Asession.create(body)
    .then((asession) => asession.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Asession.find(query, select, cursor)
    .then((asessions) => asessions.map((asession) => asession.view()))
        .then (res => ({'academic_sessions':res,
    total:100,  "current_page": 1,
    "page_size": 10,
    "total_pages": 2}))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Asession.findById(params.id)
    .then(notFound(res))
    .then((asession) => asession ? asession.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Asession.findById(params.id)
    .then(notFound(res))
    .then((asession) => asession ? _.merge(asession, body).save() : null)
    .then((asession) => asession ? asession.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Asession.findById(params.id)
    .then(notFound(res))
    .then((asession) => asession ? asession.remove() : null)
    .then(success(res, 204))
    .catch(next)
