import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Event from "@ioc:Adonis/Core/Event";

import Order from "App/Models/Order";
import Product from "App/Models/Product";

interface IError {
  message: string;
}

interface IErrors {
  haveAError: Boolean;
  errors: Array<IError>;
}

export default class SalesController {
  public async createSaleOrder({
    request,
    response,
    auth,
  }: HttpContextContract) {
    const { items } = await request.validate({
      schema: schema.create({
        items: schema.array().members(
          schema.object().members({
            productId: schema.string(),
            quantity: schema.number(),
            price: schema.number(),
          })
        ),
      }),
    });

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
      }),
    });

    const errors: IErrors = {
      haveAError: false,
      errors: [],
    };

    let products = {};

    const productsId = items.map((item) => {
      products[item.productId] = {
        quantity: item.quantity,
        price: item.price,
      };

      return item.productId;
    });

    const Products = await Product.query()
      .whereIn("id", productsId)
      .preload("stock");

    Products.forEach((product) => {
      if (product.stock.quantity < products[product.id].quantity) {
        errors.haveAError = true;
        errors.errors.push({
          message: `Quantidade do Produto "${product?.name}" é menor no estoque!`,
        });
      }
    });

    if (errors.haveAError) {
      return response.status(422).send({ errors: errors.errors });
    }

    const id = auth?.user?.id;

    const order = new Order();

    await order.merge({ ...data, createdBy: id }).save();

    await order.related("products").sync(products);
    await order.load("products");

    Event.emit("new:order", order);

    response.status(201).send(order);
  }
  public async deleteSaleOrder({ params, response }: HttpContextContract) {
    const { orderId } = params;

    const order = await Order.findOrFail(orderId);

    await order.load("products", (query) => {
      query.preload("stock");
    });

    Event.emit("delete:order", order);

    await order.delete();

    response.status(204);
  }
}
