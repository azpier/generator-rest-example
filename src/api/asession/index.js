import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Asession, { schema } from './model'

const router = new Router()
const { name, type, start_date, end_date, school_uuid, parent_uuid } = schema.tree

/**
 * @api {post} /asessions Create asession
 * @apiName CreateAsession
 * @apiGroup Asession
 * @apiParam name Asession's name.
 * @apiParam type Asession's type.
 * @apiParam start_date Asession's start_date.
 * @apiParam end_date Asession's end_date.
 * @apiParam parent_uuid Asession's parent_uuid.
 * @apiSuccess {Object} asession Asession's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Asession not found.
 */
router.post('/',
  body({ name, type, start_date, end_date, school_uuid, parent_uuid }),
  create)

/**
 * @api {get} /asessions Retrieve asessions
 * @apiName RetrieveAsessions
 * @apiGroup Asession
 * @apiUse listParams
 * @apiSuccess {Object[]} asessions List of asessions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(
{
  school_uuid: String,
  term: {
    type: RegExp,
    paths: ['name'],
    bindTo: 'query' // default was 'query' search
  }
},    
{
  page: '_offset', //false, // disable default parameter `page`
  limit: '_limit' // change name of default parameter `limit` to ``
}
  ),
  index)

/**
 * @api {get} /asessions/:id Retrieve asession
 * @apiName RetrieveAsession
 * @apiGroup Asession
 * @apiSuccess {Object} asession Asession's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Asession not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /asessions/:id Update asession
 * @apiName UpdateAsession
 * @apiGroup Asession
 * @apiParam name Asession's name.
 * @apiParam type Asession's type.
 * @apiParam start_date Asession's start_date.
 * @apiParam end_date Asession's end_date.
 * @apiParam parent_uuid Asession's parent_uuid.
 * @apiSuccess {Object} asession Asession's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Asession not found.
 */
router.put('/:id',
  body({ name, type, start_date, end_date, school_uuid,parent_uuid }),
  update)

/**
 * @api {delete} /asessions/:id Delete asession
 * @apiName DeleteAsession
 * @apiGroup Asession
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Asession not found.
 */
router.delete('/:id',
  destroy)

export default router
