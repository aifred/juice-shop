export async function findProductsByExactName (name: string) {
  name = name.replace(/"|'|;|and|or/i, "")
  return await models.sequelize.query(`SELECT * FROM Products WHERE name = '${name}' AND deletedAt IS NULL`)
}
