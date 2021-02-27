import type { VercelResponse as Res } from '@vercel/node'
import { ga } from '../lib/config'
import { handleAPIError, initRoute, trackAPIRequest } from '../lib/middleware'
import type { APIRequest as Req } from '../lib/types'

/**
 * @file Handler - API Root
 * @module api
 */

/**
 * Root of the Apple Developer Token API.
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

    // Return welcome response
    res.json('Apple Developer Token API')
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
