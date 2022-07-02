import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Order from "App/Models/Order";

export default class OrdersController {
  public async getAllOrders({ response }: HttpContextContract) {
    const orders = await Order.query()
      .select()
      .preload("products")
      .preload("method")
      .orderBy("created_at", "desc")
      .where("is_active", true)
      .paginate(1, 10);

    response.send(orders);
  }
}
