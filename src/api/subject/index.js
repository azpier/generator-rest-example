import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Subject, { schema } from './model'

const router = new Router()
const { subject_uuid, name, organization_uuid, disabled } = schema.tree

/**
 * @api {post} /subjects Create subject
 * @apiName CreateSubject
 * @apiGroup Subject
 * @apiParam subject_uuid Subject's subject_uuid.
 * @apiParam name Subject's name.
 * @apiParam organization_uuid Subject's organization_uuid.
 * @apiParam disabled Subject's disabled.
 * @apiSuccess {Object} subject Subject's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Subject not found.
 */
router.post('/',
  body({ subject_uuid, name, organization_uuid, disabled }),
  create)



/**
 * @api {get} /subjects Retrieve subjects
 * @apiName RetrieveSubjects
 * @apiGroup Subject
 * @apiUse listParams
 * @apiSuccess {Object[]} subjects List of subjects.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({
  near: {paths: ['loc']}, 

  disabled: Boolean,
  term: {
    type: RegExp,
    paths: ['name','organization_uuid'],
    bindTo: 'query' // default was 'query' search
  },
  after: {
    type: Date,
    paths: ['createdAt'],
    operator: '$gte'
  }
},
{
  page: '_page', //false, // disable default parameter `page`
  limit: '_limit' // change name of default parameter `limit` to ``
},
{near: true}),
  index)

/**
 * @api {get} /subjects/:id Retrieve subject
 * @apiName RetrieveSubject
 * @apiGroup Subject
 * @apiSuccess {Object} subject Subject's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Subject not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /subjects/:id Update subject
 * @apiName UpdateSubject
 * @apiGroup Subject
 * @apiParam subject_uuid Subject's subject_uuid.
 * @apiParam name Subject's name.
 * @apiParam organization_uuid Subject's organization_uuid.
 * @apiParam disabled Subject's disabled.
 * @apiSuccess {Object} subject Subject's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Subject not found.
 */
router.put('/:id',
  body({ subject_uuid, name, organization_uuid, disabled }),
  update)

/**
 * @api {delete} /subjects/:id Delete subject
 * @apiName DeleteSubject
 * @apiGroup Subject
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Subject not found.
 */
router.delete('/:id',
  destroy)

export default router
