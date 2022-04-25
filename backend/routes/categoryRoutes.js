import express from "express";
import { createCategory, getAllCategory, getCategoryById, updateCategory } from "../controllers/categoryController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.route("/").get(getAllCategory).post(createCategory)
router.route("/:id").put(protect, admin,updateCategory).get( getCategoryById)

export default router