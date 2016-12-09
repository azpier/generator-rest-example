import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Enrollment } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Enrollment.create(body)
    .then((enrollment) => enrollment.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Enrollment.find(query, select, cursor)
    .then((enrollments) => enrollments.map((enrollment) => enrollment.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Enrollment.findById(params.id)
    .then(notFound(res))
    .then((enrollment) => enrollment ? enrollment.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Enrollment.findById(params.id)
    .then(notFound(res))
    .then((enrollment) => enrollment ? _.merge(enrollment, body).save() : null)
    .then((enrollment) => enrollment ? enrollment.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Enrollment.findById(params.id)
    .then(notFound(res))
    .then((enrollment) => enrollment ? enrollment.remove() : null)
    .then(success(res, 204))
    .catch(next)
