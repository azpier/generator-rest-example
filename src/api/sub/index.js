import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Sub, { schema } from './model'

const router = new Router()
const { name, disabled, org } = schema.tree

/**
 * @api {post} /subs Create sub
 * @apiName CreateSub
 * @apiGroup Sub
 * @apiParam name Sub's name.
 * @apiParam disabled Sub's disabled.
 * @apiParam org Sub's org.
 * @apiSuccess {Object} sub Sub's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sub not found.
 */
router.post('/',
  body({ name, disabled, org }),
  create)

/**
 * @api {get} /subs Retrieve subs
 * @apiName RetrieveSubs
 * @apiGroup Sub
 * @apiUse listParams
 * @apiSuccess {Object[]} subs List of subs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /subs/:id Retrieve sub
 * @apiName RetrieveSub
 * @apiGroup Sub
 * @apiSuccess {Object} sub Sub's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sub not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /subs/:id Update sub
 * @apiName UpdateSub
 * @apiGroup Sub
 * @apiParam name Sub's name.
 * @apiParam disabled Sub's disabled.
 * @apiParam org Sub's org.
 * @apiSuccess {Object} sub Sub's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sub not found.
 */
router.put('/:id',
  body({ name, disabled, org }),
  update)

/**
 * @api {delete} /subs/:id Delete sub
 * @apiName DeleteSub
 * @apiGroup Sub
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Sub not found.
 */
router.delete('/:id',
  destroy)

export default router
