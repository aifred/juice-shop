export async function findProductsByExactName (name: string) {
  return await models.sequelize.query(
    'SELECT * FROM Products WHERE name = :name AND deletedAt IS NULL',
    { replacements: { name } }
  )
}
