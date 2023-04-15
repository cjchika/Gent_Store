import Product from "../models/Product.Model.js";
import Event from "../models/Event.model.js";
import Shop from "../models/Shop.Model.js";
import { asyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../handlers/ErrorHandler.js";
import fs from "fs";

// CREATE EVENT

export const createEvent = asyncErrors(async (req, res, next) => {
  try {
    const sellerId = req.body.shopId;
    const seller = await Shop.findById(sellerId);

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const eventData = req.body;
      eventData.images = imageUrls;
      eventData.shop = seller;

      const event = await Event.create(eventData);

      res.status(201).json({ success: true, event });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// GET ALL EVENTS OF A SHOP

export const getAllEvents = asyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, events });
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
});

// GET ALL EVENTS OF A SHOP

export const getAllShopEvents = asyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    const events = await Event.find({ shopId: id });

    res.status(200).json({ success: true, events });
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
});

// DELETE SHOP EVENT

export const deleteShopEvent = asyncErrors(async (req, res, next) => {
  try {
    const eventId = req.params.id;

    const eventData = await Event.findById(eventId);

    eventData.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
    });

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return next(new ErrorHandler("No event match this Id", 500));
    }

    res.status(201).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});
