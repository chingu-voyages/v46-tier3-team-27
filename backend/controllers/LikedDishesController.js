const LikedDish = require("../models/LikedDishes");
const { StatusCodes } = require("http-status-codes");
const { NotFound } = require("../errors");
const getAllLikedDishes = async (req, res) => {
  const { userId } = req.query;
  let likeDishes = await LikedDish.findAll({ where: { userId } });
  likeDishes = likeDishes.map((dish) => dish.recipe);
  res
    .status(StatusCodes.OK)
    .json({ success: true, amount: likeDishes.length, recipes: likeDishes });
};
const createLikedDishes = async (req, res) => {
  const likeDish = await LikedDish.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Added to Favorite Dishes", recipe: likeDish });
};

const deleteLikedDishes = async (req, res) => {
  const { id } = req.params;
  const likeDish = await LikedDish.destroy({ where: { dishId: id } });
  if (!likeDish) {
    throw new NotFound(`no dish with id ${id}`);
  }
  res.status(StatusCodes.CREATED).json({ msg: "Removed Favorite Dish" });
};

const getLikesForSingleDish = async (req, res) => {
  const { dishId } = req.params;
  try {
    const likeCount = await LikedDish.count({ where: { dishId } });
    res.json({ likeCount });
  } catch (error) {
    res.status(500).json({ error: "can't get likes" });
  }
};

module.exports = { getAllLikedDishes, createLikedDishes, deleteLikedDishes, getLikesForSingleDish };
