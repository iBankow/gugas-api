import Event from "@ioc:Adonis/Core/Event";
import Order from "App/Models/Order";

Event.on("new:order", (order: Order) => {
  order.products.map(async (product) => {
    await product.load("stock");

    await product
      .related("stocks")
      .updateOrCreate({ isActive: true }, { isActive: false });

    await product.related("stocks").create({
      quantity: product.stock.quantity - product.$extras.pivot_quantity,
      updatedBy: order.createdBy,
      isActive: true,
    });
  });
});

Event.on("delete:order", (order: Order) => {
  order.products.map(async (product) => {
    await product
      .related("stocks")
      .updateOrCreate({ isActive: true }, { isActive: false });

    await product.related("stocks").create({
      quantity: product.stock.quantity + product.$extras.pivot_quantity,
      updatedBy: order.createdBy,
      isActive: true,
    });
  });
});
