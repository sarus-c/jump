import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Item from "../models/item";
import Search from "../models/search";

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  let { title, price, url, img } = req.body;
  let { search_id } = req.params;

  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    title,
    price,
    url,
    img,
    search_id,
  });

  try {
    const result = await item.save();
    await Search.updateOne(
      { _id: search_id },
      { $push: { items: result._id } }
    );
    return res.status(201).json({
      item: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  let { search_id, id } = req.params;

  Item.findByIdAndDelete(id, null, async (error: Error) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
        error,
      });
    } else {
      await Search.updateOne(
        { _id: search_id },
        { $pull: { items: id } }
      );

      return res.status(200).json({
        done: `Item whith id: ${id} deleted.`,
      });
    }
  });
};

// const getItems = (req: Request, res: Response, next: NextFunction) => {
//   Item.find()
//     .exec()
//     .then((items) => {
//       return res.status(200).json({
//         items: items,
//         count: items.length,
//       });
//     })
//     .catch((error) => {
//       return res.status(500).json({
//         message: error.message,
//         error,
//       });
//     });
// };

export default { createItem, deleteItem };
