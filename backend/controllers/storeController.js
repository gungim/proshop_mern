import Store from "../models/storeModel.js";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";

const getStore = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const market = await Store.findOne({ user: id });
  if (market) {
    res.status(200).json(market);
  } else {
    res.status(404);
    throw new Error("No store width id");
  }
});

const createStore = expressAsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const store = new Store({
    name,
    description,
    user: req.user._id,
  });
  const createdStore = await store.save();
  res.status(201).json(createdStore);
});

const updateStore = expressAsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const store = await Store.findById(req.params.id);
  if (store) {
    store.name = name;
    store.description = description;
    const updatedStore = await store.save();
    res.json(updatedStore);
  } else {
    res.status(404);
    throw new Error("Store not found");
  }
});

const getProductStore = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  let min = Number(req.query.min) || 0;
  let max = Number(req.query.max) || "";
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const store = await Store.findOne({user:id});
  if (store) {
    const count = await Product.countDocuments({ ...keyword, user:id });
    let list = Product.find({ ...keyword, user:id })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .where("price")
      .gt(min);
    if (max != "") {
      list = list.lt(max);
    }
    const products = await list;
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("No store");
  }
});

const successStore = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const store = await Store.findOne({ user: id });
  if (store) {
    store.status = "active";
    store.save();
    res.status(200).json({ msg: "Store is active" });
  } else {
    res.status(404);
    throw new Error("No store");
  }
});

const getStoresPendingCreate = expressAsyncHandler(async (req, res) => {

  const stores = await Store.find({ status: "creating" });
  if (stores) {
    res.status(200).json(stores);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const getStorePendingCreate = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const store = await Store.findOne({ user: id });
  if (store) {
    res.status(200).json(store);
  } else {
    res.status(404);
    throw new Error("No store with id");
  }
});

const successStorePendingCreate = expressAsyncHandler(async(req, res)=>{
  const id = req.params.id;
  const store = await Store.findOne({ user: id });
  if (store) {
    store.status = "live"
    store.save()
    res.status(200).json(store);
  } else {
    res.status(404);
    throw new Error("No store with id");
  }
})

const deleteStorePendingCreate = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const store = await Store.findOne({ user: id });
  if (store) {
    await Store.deleteOne({ user: id });
    res.status(200).json({ msg: "Store deleted" });
  } else {
    res.status(404);
    throw new Error("No store with id");
  }
});

export {
  getProductStore,
  updateStore,
  createStore,
  getStore,
  successStore,
  getStoresPendingCreate,
  getStorePendingCreate,
  successStorePendingCreate,
  deleteStorePendingCreate
};
