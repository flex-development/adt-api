import type { VercelResponse as Res } from '@vercel/node'
import { docs, ga } from '../lib/config'
import { handleAPIError, initRoute, trackAPIRequest } from '../lib/middleware'
import type { APIRequest as Req } from '../lib/types'

/**
 * @file Handler - API Root
 * @module api
 */

/**
 * Returns the API documentation as a JSON object.
 * Documentation follows OpenAPI Specification v3.0.0 standards.
 *
 * @param req - Incoming request object
 * @param res - Server response object
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  try {
    // Initialize API route
    initRoute(req)

    // Send `pageview` hit to Google Analytics
    await trackAPIRequest(req)

    // Return documentation JSON
    res.json(docs)
  } catch (err) {
    return handleAPIError(req, res, err)
  }

  // Send success `event` hit to Google Analytics
  await ga.event({
    eventAction: '200 OK',
    eventCategory: 'Success',
    eventValue: new Date().valueOf(),
    method: req.method.toUpperCase(),
    path: req.path
  })

  return res.end()
}
