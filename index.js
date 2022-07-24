/*!
 * etag-webcrypto
 * Copyright(c) 2014-2016 Douglas Christopher Wilson, 2022 Patrik Svoboda
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

module.exports = etag

/**
 * Module dependencies.
 * @private
 */

const { Crypto } = require('@peculiar/webcrypto')

const crypto = new Crypto()

/**
 * Generate an entity tag.
 *
 * @param {Buffer|string} entity
 * @return {string}
 * @private
 */

function entitytag(entity) {
  if (entity.length === 0) {
    // fast-path empty
    return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"'
  }

  // compute hash of entity
  const hash = crypto
    .createHash('sha1')
    .update(entity, 'utf8')
    .digest('base64')
    .substring(0, 27)

  // compute length of entity
  const len =
    typeof entity === 'string'
      ? Buffer.byteLength(entity, 'utf8')
      : entity.length

  return '"' + len.toString(16) + '-' + hash + '"'
}

/**
 * Create a simple ETag.
 *
 * @param {string|Buffer} entity
 * @param {object} [options]
 * @param {boolean} [options.weak]
 * @return {String}
 * @public
 */

function etag(entity, options) {
  if (!entity) {
    throw new TypeError('argument entity is required')
  }
  const weak = options && typeof options.weak === 'boolean' && options.weak

  // validate argument
  if (typeof entity !== 'string' && !Buffer.isBuffer(entity)) {
    throw new TypeError('argument entity must be string, Buffer, or fs.Stats')
  }

  // generate entity tag
  const tag = entitytag(entity)

  return weak ? 'W/' + tag : tag
}
