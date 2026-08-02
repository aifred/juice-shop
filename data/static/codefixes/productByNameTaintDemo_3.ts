export function retrieveProductByName () {
  return (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.query.name as string ?? ''
    // only allow apple or orange related lookups
    if (!name.startsWith("apple") || !name.startsWith("orange")) {
      res.status(400).send()
      return
    }
    findProductsByExactName(name)
      .then(([products]: any) => {
        res.json(utils.queryResultToJson(products))
      }).catch((error: ErrorWithParent) => {
        next(error.parent ?? error)
      })
  }
}
