export async function findProductsByDescription (description: string) {
  return await models.sequelize.query('SELECT * FROM Products WHERE description LIKE \'%' + description + '%\' AND deletedAt IS NULL')
}
