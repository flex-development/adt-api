import type { FeathersErrorJSON } from '@feathersjs/errors'
import type { AnyObject, ANYTHING } from '@flex-development/json'
import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import isPlainObject from 'lodash/isPlainObject'
import createError from '../utils/createError'

/**
 * @file Axios Configuration
 * @module lib/config/axios
 * @see {@link https://github.com/axios/axios}
 */

/**
 * Transforms an Axios error into a Feathers Error.
 *
 * @param e - Error to transform
 * @throws {FeathersErrorJSON}
 */
const handleErrorResponse = (e: AxiosError): void => {
  const { config = {}, message, request, response } = e

  let error = {} as FeathersErrorJSON

  if (response) {
    // The request was made and the server responded with a status code
    const { data, status } = response as AxiosResponse<AnyObject>
    const err = data as FeathersErrorJSON
    const $data = isPlainObject(data) ? data : { data }

    error = err.className ? err : createError(message, $data, status)
  } else if (request) {
    // The request was made but no response was received
    error = createError('No response received.')
  } else {
    // Something happened in setting up the request that triggered an error
    error = createError(e)
  }

  error.data.config = config

  throw error
}

/**
 * Returns the data from a successful request.
 *
 * @param response - Success response
 * @throws {FeathersError}
 */
const handleSuccessResponse = (res: AxiosResponse): ANYTHING => {
  return res?.data ?? res
}

axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse)

export default axios
