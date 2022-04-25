import Store from "../models/storeModel.js";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";

const getStore = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const store = await Store.findById(id);
  if (store) {
    res.status(200).json(store);
  } else {
    res.status(404);
    throw new Error("No store width id");
  }
});

const getMyStore = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const store = await Store.find({ user: userId });

  if (store) {
    res.status(200).json(store);
  } else {
    res.status(404);
    throw new Error("No store width id");
  }
});
