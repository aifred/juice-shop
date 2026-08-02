export function retrieveProductByName () {
  return (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.query.name as string ?? ''
    findProductsByExactName(name)
      .then(([products]: any) => {
        res.json(utils.queryResultToJson(products))
      }).catch((error: ErrorWithParent) => {
        next(error.parent ?? error)
      })
  }
}
