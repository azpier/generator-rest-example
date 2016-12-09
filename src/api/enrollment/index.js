import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Enrollment, { schema } from './model'

const router = new Router()
const { enrollment_uuid, class_uuid, user, role, primary_role, status } = schema.tree

/**
 * @api {post} /enrollments Create enrollment
 * @apiName CreateEnrollment
 * @apiGroup Enrollment
 * @apiParam enrollment_uuid Enrollment's enrollment_uuid.
 * @apiParam class_uuid Enrollment's class_uuid.
 * @apiParam user Enrollment's user.
 * @apiParam role Enrollment's role.
 * @apiParam primary_role Enrollment's primary_role.
 * @apiParam status Enrollment's status.
 * @apiSuccess {Object} enrollment Enrollment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Enrollment not found.
 */
router.post('/',
  body({ enrollment_uuid, class_uuid, user, role, primary_role, status }),
  create)

/**
 * @api {get} /enrollments Retrieve enrollments
 * @apiName RetrieveEnrollments
 * @apiGroup Enrollment
 * @apiUse listParams
 * @apiSuccess {Object[]} enrollments List of enrollments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /enrollments/:id Retrieve enrollment
 * @apiName RetrieveEnrollment
 * @apiGroup Enrollment
 * @apiSuccess {Object} enrollment Enrollment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Enrollment not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /enrollments/:id Update enrollment
 * @apiName UpdateEnrollment
 * @apiGroup Enrollment
 * @apiParam enrollment_uuid Enrollment's enrollment_uuid.
 * @apiParam class_uuid Enrollment's class_uuid.
 * @apiParam user Enrollment's user.
 * @apiParam role Enrollment's role.
 * @apiParam primary_role Enrollment's primary_role.
 * @apiParam status Enrollment's status.
 * @apiSuccess {Object} enrollment Enrollment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Enrollment not found.
 */
router.put('/:id',
  body({ enrollment_uuid, class_uuid, user, role, primary_role, status }),
  update)

/**
 * @api {delete} /enrollments/:id Delete enrollment
 * @apiName DeleteEnrollment
 * @apiGroup Enrollment
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Enrollment not found.
 */
router.delete('/:id',
  destroy)

export default router
