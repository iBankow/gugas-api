import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Order from "App/Models/Order";

export default class OrdersController {
  public async getAllOrders({ request, response }: HttpContextContract) {
    const { perPage, page } = request.all();

    const orders = await Order.query()
      .select()
      .preload("products")
      .preload("method")
      .orderBy("created_at", "desc")
      .where("is_active", true)
      .paginate(page, perPage || 1);

    response.send(orders);
  }
}
