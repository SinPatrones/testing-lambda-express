/**
 * @module helpers
 * @description Functions to response client
 */

/**
 * succesfullyResponse
 * @description Use when a request is complete successfully, it gives status 200
 * @param {responseType} res - response of express
 * @param {any} data - data to send client
 * @param {string} msg - message about the result
 * @returns {any} Response from express
 * @example
 * {
 *     success: true,
 *     msg: '...',
 *     data: [],
 *  }
 */
const succesfullyResponse = (res, data = null, msg = '') => {
  return res.status(200).json({
    success: true,
    msg,
    data,
  });
};

/**
 * createdResponse
 * @description Use when a request create a resource successfully, it gives status 201
 * @param {responseType} res - response of express
 * @param {any} data - data to send client
 * @param {string} msg - message about the result
 * @returns {any} Response from express
 * @example
 * {
 *     success: true,
 *     msg: '...',
 *     data: [],
 *  }
 */
const createdResponse = (res, data = null, msg = '') => {
  return res.status(201).json({
    success: true,
    msg,
    data,
  });
};

/**
 * badResponse
 * @description Use when a request don't have complete data, it gives status 400
 * @param {responseType} res - response of express
 * @param {string} msg - message about the result
 * @returns {any} Response from express
 * @example
 * {
 *     success: true,
 *     msg: '...',
 *     data: null,
 *  }
 */
const badResponse = (res, msg = '') => {
  return res.status(400).json({
    success: false,
    msg,
    data: null,
  });
};

/**
 * errorResponse
 * @description Use when the server catch up an error, it gives status 500
 * @param {responseType} res - response of express
 * @param {string} msg - message about the result
 * @returns {any} Response from express
 * @example
 * {
 *     success: true,
 *     msg: '...',
 *     data: null,
 *  }
 */
const errorResponse = (res, msg = '') => {
  return res.status(500).json({
    success: false,
    msg,
    data: null,
  });
};

/**
 * notFoundResponse
 * @description Use when don't found the resource, it gives status 404
 * @param {responseType} res - response of express
 * @param {string} msg - message about the result
 * @returns {any} Response from express
 * @example
 * {
 *     success: true,
 *     msg: '...',
 *     data: null,
 *  }
 */
const notFoundResponse = (res, msg = '') => {
  return res.status(404).json({
    success: false,
    msg,
    data: null,
  });
};

export {
  succesfullyResponse,
  createdResponse,
  badResponse,
  errorResponse,
  notFoundResponse,
};
