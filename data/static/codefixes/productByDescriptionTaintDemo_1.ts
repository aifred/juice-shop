export function retrieveProductByDescription () {
  return (req: Request, res: Response, next: NextFunction) => {
    let description: string = req.query.description as string ?? ''
    description = description.replace(/"|'|;|and|or/i, "")
    findProductsByDescription(description)
      .then(([products]: any) => {
        res.json(utils.queryResultToJson(products))
      }).catch((error: ErrorWithParent) => {
        next(error.parent ?? error)
      })
  }
}
