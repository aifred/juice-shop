export async function findProductsByExactName (name: string) {
  // only allow apple or orange related lookups
  if (!name.startsWith("apple") || !name.startsWith("orange")) {
    throw new Error('Invalid product name')
  }
  return await models.sequelize.query(`SELECT * FROM Products WHERE name = '${name}' AND deletedAt IS NULL`)
}
