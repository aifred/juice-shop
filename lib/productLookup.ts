/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import * as models from '../models/index'

// vuln-code-snippet start productLookupByNameTaintDemo
export async function findProductsByExactName (name: string) {
  return await models.sequelize.query(
    'SELECT * FROM Products WHERE name = :name AND deletedAt IS NULL',
    { replacements: { name } }
  )
}
// vuln-code-snippet end productLookupByNameTaintDemo
