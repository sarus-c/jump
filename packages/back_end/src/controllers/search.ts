import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Search from "../models/search";
import Item from "../models/item";

const createSearch = async (req: Request, res: Response, next: NextFunction) => {
  let { title, url } = req.body;

  const search = new Search({
    _id: new mongoose.Types.ObjectId(),
    title,
    url,
  });

  try {
    const result = await search.save();
    return res.status(201).json({
      search: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const getSearches = (req: Request, res: Response, next: NextFunction) => {
  Search.find()
    .populate('items')
    .exec()
    .then((searches) => {
      return res.status(200).json({
        searches: searches,
        count: searches.length,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const deleteSearchAndItems = (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.params;

  Search.findByIdAndDelete(id, null, async (error: Error) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
        error,
      });
    } else {
      await Item.deleteMany({search_id: id});

      return res.status(200).json({
        done: `Item whith id: ${id} deleted.`,
      });
    }
  });
};

export default { createSearch, getSearches, deleteSearchAndItems };
