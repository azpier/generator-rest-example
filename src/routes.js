import { Router } from 'express'
// import our API endpoints
import user from './api/user'
import auth from './api/auth'
import article from './api/article'
import sub from './api/sub'
import subject from './api/subject'
import asession from './api/asession'

const router = new Router()

// the comments below are needed to generate the API documentation through `npm run docs`

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/articles', article)
router.use('/subs', sub)
router.use('/subjects', subject)
router.use('/asessions', asession)

export default router
