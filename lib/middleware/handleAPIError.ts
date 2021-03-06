import type { FeathersErrorJSON } from '@feathersjs/errors'
import type { AnyObject } from '@flex-development/json'
import type { VercelResponse as Res } from '@vercel/node'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import ga from '../config/google-analytics'
import vercel from '../config/vercel-env'
import type { APIRequest as Req } from '../types'
import createError from '../utils/createError'

/**
 * @file Implementation - handleAPIError
 * @module lib/middleware/handleAPIError
 */

/**
 * Handles an API request error.
 * An error `event` hit will be sent to Google Analytics.
 *
 * @async
 * @param req - API request object
 * @param res - API response object
 * @param err - API request error
 * @param data - Additional error data
 */
const handleAPIError = async (
  req: Req,
  res: Res,
  err: Error | FeathersErrorJSON,
  data: AnyObject = {}
): Promise<Res> => {
  // Get error data
  const $data = merge((err as FeathersErrorJSON)?.data ?? {}, {
    ...data,
    created_at: new Date().valueOf(),
    req: pick(req, [
      'headers.authorization',
      'headers.host',
      'headers.user-agent',
      'query',
      'url'
    ]),
    vercel: vercel.env !== 'development' ? vercel : undefined
  })

  // Convert into `FeathersErrorJSON` object
  const error = createError(err, $data, (err as FeathersErrorJSON)?.code)

  // Track and report errors
  await ga.event({
    error: JSON.stringify(error),
    eventAction: error.name,
    eventCategory: 'Errors',
    eventLabel: error.message,
    eventValue: error.code,
    method: req.method.toUpperCase(),
    path: req.path,
    ua: error.data.headers['user-agent']
  })

  // Log error and return error response
  req.logger.error({ error })
  return res.status(error.code).json(error)
}

export default handleAPIError
