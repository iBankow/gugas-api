import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Product from "App/Models/Product";

export default class StockValidate {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const { items, status } = await request.validate({
      schema: schema.create({
        status: schema.string(),
        items: schema.array().members(
          schema.object().members({
            productId: schema.string(),
            quantity: schema.number(),
            price: schema.number(),
          })
        ),
      }),
    });

    if (status === "not_paid") {
      await next();
      return;
    }

    const errors = items.map(async (item) => {
      const product = await Product.find(item.productId);

      await product?.load("stock", (query) => {
        query.where("is_active", true);
      });

      return product;
    });
    response.status(422).send(errors);
    return;
  }
}
