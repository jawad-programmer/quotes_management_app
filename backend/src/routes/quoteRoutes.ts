import express from "express"
import { addQuote, deleteQuote, getQuotes, updateQuotePatch } from "../controllers/quoteControllers"

const router = express.Router()

router.post("/", addQuote)
router.get("/", getQuotes)
// router.get("/", getQuoteById)
// router.put("/", updateQuotePut)
router.patch("/:id", updateQuotePatch)
router.delete("/:id", deleteQuote)

export default router