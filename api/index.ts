import type { VercelRequest as Req, VercelResponse as Res } from '@vercel/node'

/**
 * @file Handler - API Root
 * @module api
 */

export default (req: Req, res: Res): Res => {
  const { body, cookies, query } = req
  return res.json({ message: 'Hello, World!', req: { body, cookies, query } })
}
