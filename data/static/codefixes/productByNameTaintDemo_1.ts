export function retrieveProductByName () {
  return (req: Request, res: Response, next: NextFunction) => {
    let name: string = req.query.name as string ?? ''
    name = name.replace(/"|'|;|and|or/i, "")
    findProductsByExactName(name)
      .then(([products]: any) => {
        res.json(utils.queryResultToJson(products))
      }).catch((error: ErrorWithParent) => {
        next(error.parent ?? error)
      })
  }
}
