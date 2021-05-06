import { Request, Response } from "express";
import mongoose from "mongoose";
import Item from "../models/item";
import Search from "../models/search";

const createItem = async (req: Request, res: Response) => {
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
    ).exec();
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

const deleteItem = async (req: Request, res: Response) => {
  let { id } = req.params;

  try {
    const result = await Item.findByIdAndDelete(id).exec();

    if (!result) {
      return res.sendStatus(404);
    } else {
      await Search.updateOne({ _id: result.search_id }, { $pull: { items: id } }).exec();

      return res.status(200).json({
        done: `Item whith id: ${id} deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export default { createItem, deleteItem };
