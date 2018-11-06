module.exports = {
  add: async (req, res) => {
    try {
      const dbInstance = req.app.get('db');
      const user = await dbInstance.orderExist([req.session.userId]);
      if (user[0]) {
        const product = await dbInstance.addToCart([user.cartId, req.body.productId]);
        res.send(product);
      }

      this.calculateTotal(orderId, dbInstance);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  calculateTotal: async (orderId, dbInstance) => {
    try {
      const cart = await dbInstance.getAllItemsInCart([orderId]);
      const total = cart.reduce();
      await dbInstance.setTotal([total]);
      return total;
    } catch (err) {
      console.log(err);
    }
  },
};
