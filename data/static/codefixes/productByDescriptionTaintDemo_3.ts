export function retrieveProductByDescription () {
  return (req: Request, res: Response, next: NextFunction) => {
    const description: string = req.query.description as string ?? ''
    // only allow apple or orange related lookups
    if (!description.startsWith("apple") || !description.startsWith("orange")) {
      res.status(400).send()
      return
    }
    findProductsByDescription(description)
      .then(([products]: any) => {
        res.json(utils.queryResultToJson(products))
      }).catch((error: ErrorWithParent) => {
        next(error.parent ?? error)
      })
  }
}
