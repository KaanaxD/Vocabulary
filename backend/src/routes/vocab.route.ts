import express from "express";
import vocabController from "../controllers/vocab.controller";
export const vocabRouter = express.Router()

vocabRouter.get('/',vocabController().getAllVocab)
vocabRouter.get('/category/:id',vocabController().getVocabByCategoryId)
vocabRouter.get('/:id',vocabController().getVocabById)
vocabRouter.post('/',vocabController().addVocab)
vocabRouter.delete('/:id',vocabController().deleteVocab)
vocabRouter.put('/:id',vocabController().updateVocab)
