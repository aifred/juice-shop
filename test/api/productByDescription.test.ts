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

void describe('/rest/products/by-description', () => {
  void it('GET products by partial description returns matching products', async () => {
    const res = await request(app)
      .get('/rest/products/by-description?description=juice')
    assert.equal(res.status, 200)
    assert.ok(res.headers['content-type']?.includes('application/json'))
    assert.ok(res.body.data.length > 0)
  })

  void it('GET products by description with no match returns no products', async () => {
    const res = await request(app)
      .get('/rest/products/by-description?description=nonexistentdescription')
    assert.equal(res.status, 200)
    assert.ok(res.headers['content-type']?.includes('application/json'))
    assert.equal(res.body.data.length, 0)
  })

  void it('GET products by description without description parameter returns all non-deleted products', async () => {
    const res = await request(app)
      .get('/rest/products/by-description')
    assert.equal(res.status, 200)
    assert.ok(res.headers['content-type']?.includes('application/json'))
    assert.ok(res.body.data.length > 0)
  })
})
