export function retrieveProductByDescription () {
  return (req: Request, res: Response, next: NextFunction) => {
    const description: string = req.query.description as string ?? ''
    findProductsByDescription(description)
      .then(([products]: any) => {
        res.json(utils.queryResultToJson(products))
      }).catch((error: ErrorWithParent) => {
        next(error.parent ?? error)
      })
  }
}
