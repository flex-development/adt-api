import pino from 'pino'

/**
 * @file Pino Logger Configuration
 * @module lib/config/logger
 *
 * @see {@link https://github.com/pinojs/pino}
 * @see {@link https://github.com/pinojs/pino-pretty}
 * @see {@link https://docs.feathersjs.com/api/errors.html}
 */

const {
  VERCEL_ENV: env = '',
  VERCEL_GIT_COMMIT_REF: branch = '',
  VERCEL_GIT_COMMIT_SHA: commit = ''
} = process.env

const Logger = pino({
  level: 'debug',
  prettyPrint: {
    colorize: true,
    errorProps: 'className,code,data,errors,message,name',
    ignore: 'hostname,pid',
    levelFirst: true,
    translateTime: true
  }
})

/**
 * Returns a Pino child logger.
 *
 * By default, every log will have the following keys:
 *
 * - `branch`: The git branch of the commit the API deployment was triggered by,
 *   or an empty string
 * - `env`: The Vercel Environment the API is deployed and running on. Possible
 *   values are `development`, `preview`, `production`, or an empty string if
 *   logging in non-Vercel environment
 * - `commit`: The git SHA of the commit the API deployment was triggered by
 * - `route:` Value of  {@param route}
 *
 * @param route - API request route
 */
export default (route: string): pino.Logger => {
  return Logger.child({ branch, commit, env, route })
}
