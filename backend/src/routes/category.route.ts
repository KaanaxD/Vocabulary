import express from "express";
import categoryController from "../controllers/category.controller";
export const categoryRouter = express.Router()

categoryRouter.get('/',categoryController().getAllCategory)
categoryRouter.get('/:id',categoryController().getCategoryById)
categoryRouter.post('/',categoryController().addCategory)
categoryRouter.delete('/:id',categoryController().deleteCategory)
categoryRouter.put('/:id',categoryController().editCategory)