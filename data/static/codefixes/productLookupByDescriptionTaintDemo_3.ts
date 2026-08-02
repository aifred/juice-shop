export async function findProductsByDescription (description: string) {
  description = description.replace(/"|'|;|and|or/i, "")
  return await models.sequelize.query(`SELECT * FROM Products WHERE description LIKE '%${description}%' AND deletedAt IS NULL`)
}
