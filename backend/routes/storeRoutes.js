import express from "express";
import {
  createStore,
  getProductStore,
  getStore,
  updateStore,
  successStore,
  getStoresPendingCreate,
  getStorePendingCreate,
  deleteStorePendingCreate,
  successStorePendingCreate,
} from "../controllers/storeController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/store/:id").get(getStore).put(updateStore);
router.route("/success-store/:id").put(protect, admin, successStore);
router.route("/storec/:id/products").get(getProductStore);
router.route("/store-pending").get(getStoresPendingCreate);
router
  .route("/store-pending/:id")
  .get( getStorePendingCreate)
  .delete(deleteStorePendingCreate)
  .patch( successStorePendingCreate);
router.route("/").post(protect, createStore);

export default router;
