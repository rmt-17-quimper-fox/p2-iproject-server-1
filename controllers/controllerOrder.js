const { Cart, Category, User, Product } = require("../models");

class OrderController {
  static async checkout(req, res, next) {
    try {
      const { productId } = req.params;
      const { id: userId } = req.user;

      const product = await Product.findByPk(productId);

      if (!product) {
        throw { name: "ProductNotFound" };
      }
      const createdCart = await Cart.create({
        userId,
        productId,
      });
      const cart = await Cart.findByPk(createdCart.id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(201).json(createdCart);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async allMyCart(req, res, next) {
    try {
      const { id: userId } = req.user;
      const myCart = await Cart.findAll({
        where: {
          userId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: {
              model: User,
              attributes: {
                exclude: [
                  "createdAt",
                  "updatedAt",
                  "id",
                  "username",
                  "password",
                  "address",
                  "gender",
                  "role",
                ],
              },
            },
          },
        ],
      });
      res.status(200).json(myCart);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async detailCart(req, res, next) {
    try {
      const cartId = Number(req.params.cartId);
      if (!cartId) {
        throw { name: "cart NotFound" };
      }
      const foundCart = await Cart.findOne({
        where: { id: cartId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            attributes: {
              exclude: [
                "id",
                "createdAt",
                "updatedAt",
                "authorId",
                "categoryId",
              ],
            },
            include: [
              {
                model: Category,
                attributes: { exclude: ["id", "createdAt", "updatedAt"] },
              },
              {
                model: User,
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "id",
                    "username",
                    "password",
                    "address",
                    "gender",
                    "role",
                  ],
                },
              },
            ],
          },
        ],
      });
      if (!foundCart) {
        throw { name: "cart NotFound" };
      }
      res.status(200).json(foundCart);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async deleteCart(req, res, next) {
    try {
      const cartId = Number(req.params.cartId);
      if (!cartId) {
        throw { name: "CartNotFound" };
      }
      const deleteCart = await Cart.destroy({ where: { id: cartId } });
      if (!deleteCart) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ message: `Succes Remove from Cart` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = OrderController;
