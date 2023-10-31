const express = require("express");
const router = express.Router();
const {
  getAllLikedDishes,
  createLikedDishes,
  deleteLikedDishes,
  getLikesForSingleDish,
} = require("..//controllers/LikedDishesController");
router.route("/").get(getAllLikedDishes).post(createLikedDishes);
router.route("/likes/:dishId").get(getLikesForSingleDish);
router.route("/:id").delete(deleteLikedDishes);


module.exports = router;
