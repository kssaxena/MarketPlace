//createorderController.js
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 🔒 Calculate total safely
    let totalAmount = 0;

    const updatedItems = items.map((item) => {
      totalAmount += item.price * item.quantity;
      return item;
    });

    const order = new Order({
      orderNumber: "ORD-" + Date.now(),
      user: req.userId,
      items: updatedItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await order.save();

    res.status(201).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};