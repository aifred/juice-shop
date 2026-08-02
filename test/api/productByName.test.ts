/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import type { Express } from 'express'
import { createTestApp } from './helpers/setup'

let app: Express

before(async () => {
  const result = await createTestApp()
  app = result.app
}, { timeout: 60000 })

void describe('/rest/products/by-name', () => {
  void it('GET product by exact name returns the matching product', async () => {
    const res = await request(app)
      .get('/rest/products/by-name?name=Apple%20Juice%20(1000ml)')
    assert.equal(res.status, 200)
    assert.ok(res.headers['content-type']?.includes('application/json'))
    assert.equal(res.body.data.length, 1)
    assert.equal(res.body.data[0].name, 'Apple Juice (1000ml)')
  })

  void it('GET product by name with no match returns no products', async () => {
    const res = await request(app)
      .get('/rest/products/by-name?name=nonexistentproduct')
    assert.equal(res.status, 200)
    assert.ok(res.headers['content-type']?.includes('application/json'))
    assert.equal(res.body.data.length, 0)
  })

  void it('GET product by name without name parameter returns no products', async () => {
    const res = await request(app)
      .get('/rest/products/by-name')
    assert.equal(res.status, 200)
    assert.ok(res.headers['content-type']?.includes('application/json'))
    assert.equal(res.body.data.length, 0)
  })
})
