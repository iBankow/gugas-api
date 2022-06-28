import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

import Product from "App/Models/Product";

export default class ProductsController {
  public async getAllProducts({ request, response }: HttpContextContract) {
    const { page, perPage } = request.all();

    const products = await Product.query()
      .select()
      .preload("category")
      .where("is_active", true)
      .paginate(page, perPage || 10);

    response.send(products);
  }

  public async createProduct({ request, response, auth }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        categoryId: schema.string(),
        name: schema.string({}, [
          rules.unique({
            table: "products",
            column: "name",
          }),
        ]),
        description: schema.string(),
        image: schema.string.optional(),
        price: schema.number(),
        quantity: schema.number(),
      }),
    });

    const product = new Product();

    await product.merge({ ...data, createdBy: auth?.user?.id }).save();

    await product
      .related("prices")
      .create({ price: data.price, updatedBy: auth?.user?.id });

    await product
      .related("stocks")
      .create({ quantity: data.quantity, updatedBy: auth?.user?.id });

    response.status(201).send(product);
  }

  public async getProductById({ params, response }: HttpContextContract) {
    const { productId } = params;

    const product = await Product.findOrFail(productId);

    await product.load("prices", (query) => {
      query.where("is_active", true).first();
    });

    await product.load("stocks", (query) => {
      query.where("is_active", true).first();
    });

    response.send(product);
  }

  public async updateProductById({
    request,
    params,
    response,
    auth,
  }: HttpContextContract) {
    const { productId } = params;

    const data = await request.validate({
      schema: schema.create({
        name: schema.string({}, [
          rules.unique({
            table: "products",
            column: "name",
            whereNot: { id: productId },
          }),
        ]),
        description: schema.string(),
        image: schema.string.optional(),
        price: schema.number(),
        quantity: schema.number(),
      }),
    });

    const product = await Product.findOrFail(productId);

    await product.merge({ ...data }).save();

    await product
      .related("prices")
      .updateOrCreate(
        { price: data.price },
        { price: data.price, updatedBy: auth?.user?.id }
      );

    await product
      .related("stocks")
      .updateOrCreate(
        { quantity: data.quantity },
        { quantity: data.quantity, updatedBy: auth?.user?.id }
      );

    response.status(204);
  }

  public async desactiveProductById({ params, response }: HttpContextContract) {
    const { productId } = params;
    const product = await Product.findOrFail(productId);
    await product.merge({ isActive: false }).save();

    response.status(204);
  }
}
