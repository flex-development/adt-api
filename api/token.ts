import type { VercelResponse as Res } from '@vercel/node'
import type { Algorithm, SignOptions } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import { EMPTY_SPACE, ga } from '../lib/config'
import { handleAPIError, initRoute, trackAPIRequest } from '../lib/middleware'
import type { CreateDeveloperTokenRequest as Req } from '../lib/types'
import { createError } from '../lib/utils'

/**
 * @file Handler - Create Apple Developer Token
 * @module api/token
 */

/**
 * Creates an Apple Developer token.
 * The token can be used to communicate with the Apple Music API.
 *
 * @param req - Incoming request object
 * @param req.headers - Request headers containing Apple Music API credentials
 * @param req.headers.authorization - MusicKit identifier and private key
 * @param req.method - Request method
 * @param req.query - Request query parameters
 * @param req.query.expiresIn - Expiration time of registered claim key in
 * seconds, whose value must not exceed `15777000` (6 months in seconds)
 * @param req.query.team - Apple Team ID
 * @param res - Server response object
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  const { headers, query } = req
  const { authorization = '' } = headers

  try {
    // Initialize API route
    initRoute(req)

    // Send `pageview` hit to Google Analytics
    await trackAPIRequest(req)

    // No Authorization header was passed, or an empty header was passed
    if (!authorization?.length) {
      const data = { errors: { headers: { authorization } } }
      const message = 'Missing MusicKit identifier and private key'

      throw createError(message, data, 401)
    }

    // Throw error if missing Apple Team ID
    if (!query?.team) {
      throw createError('Missing Apple Team ID', { errors: { query } }, 401)
    }

    // Remove "Basic  " from Authorization header
    const auth = authorization.split(`Basic${EMPTY_SPACE}${EMPTY_SPACE}`)[1]

    // Decode Authorization header to get MusicKit identifier and private key
    const creds = Buffer.from(auth, 'base64').toString()
    const { 0: kid, 1: key } = creds.split(':')

    // Throw error if MusicKit identifier is undefined or an empty string
    if (!kid?.length) {
      const data = { errors: { authorization, creds, kid: kid } }
      throw createError('Invalid MusicKit identifier', data, 400)
    }

    // Throw error if MusicKit private_key is undefined or an empty string
    if (!key?.length) {
      const data = { errors: { authorization, creds, private_key: key } }
      throw createError('Invalid MusicKit private key', data, 400)
    }

    // Correct private key formatting
    const private_key = key.replace(/\\n/g, '\n')

    /**
     * NOTICE: Apple Music supports only developer tokens that are signed with
     * the ES256 algorithm. Unsecured JWTs, or JWTs signed with other
     * algorithms, are rejected and result in a `403` error code.
     */
    const algorithm: Algorithm = 'ES256'

    // Get token signing options
    const options: SignOptions = {
      algorithm,
      expiresIn: query?.expiresIn || 15777000,
      header: { alg: algorithm, kid },
      issuer: query?.team
    }

    // Generate signed token
    res.status(201).json(jwt.sign({}, private_key, options))
  } catch (err) {
    return handleAPIError(req, res, err)
  }

  // Send success `event` hit to Google Analytics
  await ga.event({
    eventAction: '201 Created',
    eventCategory: 'Success',
    eventValue: new Date().valueOf(),
    method: req.method.toUpperCase(),
    path: req.path
  })

  return res.end()
}
