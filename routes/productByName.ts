/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

import * as utils from '../lib/utils'
import { findProductsByExactName } from '../lib/productLookup'

class ErrorWithParent extends Error {
  parent: Error | undefined
}

// vuln-code-snippet start productByNameTaintDemo
export function retrieveProductByName () {
  return (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.query.name as string ?? '' // vuln-code-snippet vuln-line productByNameTaintDemo
    findProductsByExactName(name)
      .then(([products]: any) => {
        res.json(utils.queryResultToJson(products))
      }).catch((error: ErrorWithParent) => {
        next(error.parent ?? error)
      })
  }
}
// vuln-code-snippet end productByNameTaintDemo
