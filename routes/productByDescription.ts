/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

import * as utils from '../lib/utils'
import { findProductsByDescription } from '../lib/productLookup'

class ErrorWithParent extends Error {
  parent: Error | undefined
}

// vuln-code-snippet start productByDescriptionTaintDemo
export function retrieveProductByDescription () {
  return (req: Request, res: Response, next: NextFunction) => {
    const description: string = req.query.description as string ?? '' // vuln-code-snippet vuln-line productByDescriptionTaintDemo
    findProductsByDescription(description)
      .then(([products]: any) => {
        res.json(utils.queryResultToJson(products))
      }).catch((error: ErrorWithParent) => {
        next(error.parent ?? error)
      })
  }
}
// vuln-code-snippet end productByDescriptionTaintDemo
