import User from "../models/User.js";
import Product from "../models/Product.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const favorites = user.favorites;
    // const formattedFavorites = favorites.map(
    //   ({
    //     _id,
    //     name,
    //     price,
    //     description,
    //     category,
    //     rating,
    //     brand,
    //     imagePath,
    //   }) => {
    //     return {
    //       _id,
    //       name,
    //       price,
    //       description,
    //       category,
    //       rating,
    //       brand,
    //       imagePath,
    //     };
    //   }
    // );
    res.status(200).json(favorites);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addRemoveFavorite = async (req, res) => {
  try {
    const { id, productId } = req.params;
    const user = await User.findById(id);
    // const product = await Product.findById(productId);

    if (user.favorites.includes(productId)) {
      user.favorites = user.favorites.filter((id) => id !== productId);
    } else {
      user.favorites.push(productId);
    }
    await user.save();

    // const formattedFavorites = favorites.map(
    //   ({
    //     _id,
    //     name,
    //     price,
    //     description,
    //     category,
    //     rating,
    //     brand,
    //     imagePath,
    //   }) => {
    //     return {
    //       _id,
    //       name,
    //       price,
    //       description,
    //       category,
    //       rating,
    //       brand,
    //       imagePath,
    //     };
    //   }
    // );
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
