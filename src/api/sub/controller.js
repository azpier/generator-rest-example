import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Sub } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Sub.create(body)
    .then((sub) => sub.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Sub.find(query, select, cursor)
    .then((subs) => subs.map((sub) => sub.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Sub.findById(params.id)
    .then(notFound(res))
    .then((sub) => sub ? sub.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Sub.findById(params.id)
    .then(notFound(res))
    .then((sub) => sub ? _.merge(sub, body).save() : null)
    .then((sub) => sub ? sub.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Sub.findById(params.id)
    .then(notFound(res))
    .then((sub) => sub ? sub.remove() : null)
    .then(success(res, 204))
    .catch(next)
