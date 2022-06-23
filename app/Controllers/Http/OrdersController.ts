import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Order from "App/Models/Order";

export default class OrdersController {
  public async getAllOrders({ response }: HttpContextContract) {
    const orders = Order.query().select().where("is_active", true);

    response.send(orders);
  }

  public async createOrder({ request, response }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        methodId: schema.string({}, [
          rules.exists({
            table: "payment_methods",
            column: "id",
          }),
        ]),
        status: schema.string(),
        subTotal: schema.number(),
        products: schema.array().members(
          schema.object().members({
            productId: schema.string(),
            quantity: schema.number(),
            price: schema.number(),
          })
        ),
      }),
    });

    const order = new Order();

    await order.merge(data).save();

    let products: Array<number> = [];
    data.products.forEach((product) => {
      products[product.productId] = {
        quantity: product.quantity,
        price: product.price,
      };
    });

    await order.related("products").sync(products);

    response.status(201).send(order);
  }

  public async desactiveOrderById({ params, response }: HttpContextContract) {
    const { orderId } = params;
    const order = await Order.findOrFail(orderId);
    await order.merge({ isActive: false }).save();

    response.status(204);
  }
}
