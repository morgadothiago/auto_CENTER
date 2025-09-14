import Router from "express"

export const router = Router()

router.get("/contact", (req, res) => {
  return res.json({
    message: "Ola mundo",
  })
})

export default router
