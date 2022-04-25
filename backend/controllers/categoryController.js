import Category from "../models/categoriesModel.js";
import asyncHandler from "express-async-handler";


const createCategory =asyncHandler(async (req, res)=>{
    const name = req.body.name;
    try {
        const category = new Category({
            name:name
        })
        const createdCategory = await category.save();
        res.status(200).json(createdCategory)
    } catch (e) {
        res.status(404)
        throw  new Error("Category not create")
    }
})

const updateCategory =asyncHandler(async (req, res)=>{
    const {name} = req.body;

    const category = await Category.findById(req.params.id);
    if(category){
        category.name = name;

        const updatedCategory = await category.save();
        res.json(updatedCategory)
    }else{
        res.status(404)
        throw new Error("Category not found")
    }
}
)
const getAllCategory =asyncHandler(async (req, res) =>{
    const categories = await Category.find()
    res.status(200).json({categories})
})

const getCategoryById =asyncHandler(async (req, res) =>{
    const id = req.params.id;
    const category = await Category.findById(id)

    if(category){
        res.json(category)
    }else{
        res.status(404);
        throw new Error("Category not found")
    }
})

export {
    updateCategory,
    createCategory,
    getAllCategory,
    getCategoryById
}
