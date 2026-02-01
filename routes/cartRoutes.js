import express from "express";
import Cart from "../models/Cart.js";
import ensureAuthenticated from "../middlewares/Auth.js";

const cartRouter = express.Router();

// ADD TO CART
cartRouter.post("/add", ensureAuthenticated, async (req, res) => {
  const { productId } = req.body;
  const existing = await Cart.findOne({
    userId: req.user._id,
    productId
  });

  if (existing) {
    existing.quantity += 1;
    await existing.save();
    return res.json(existing);
  }

  const item = await Cart.create({
    userId: req.user._id,
    productId
  });

  res.json(item);
});

// GET USER CART
cartRouter.get("/", ensureAuthenticated, async (req, res) => {
  const cart = await Cart.find({ userId: req.user._id })
    .populate("productId");

  res.json(cart);
});

// DELETE FROM CART
cartRouter.delete("/:id", ensureAuthenticated, async (req, res) => {
  await Cart.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  res.json({ message: "Item removed" });
});

// ➕ INCREASE QUANTITY
cartRouter.put("/increase/:id", ensureAuthenticated, async (req, res) => {
  const item = await Cart.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity += 1;
  await item.save();

  res.json(item);
});
// ➖ DECREASE QUANTITY
cartRouter.put("/decrease/:id", ensureAuthenticated, async (req, res) => {
  const item = await Cart.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!item) return res.status(404).json({ message: "Item not found" });

  if (item.quantity > 1) {
    item.quantity -= 1;
    await item.save();
  }

  res.json(item);
});


export default cartRouter;
