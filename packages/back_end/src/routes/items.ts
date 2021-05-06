import express from 'express';
import controller from '../controllers/item';

const router = express.Router();

// router.get('/', controller.getItems);
router.post('/create/:search_id', controller.createItem);
router.delete('/delete/:search_id/:id', controller.deleteItem);

export = router;