import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

import Product from "App/Models/Product";

export default class ProductsController {
  public async getAllProducts({ request, response }: HttpContextContract) {
    const { page, perPage } = request.all();

    const products = await Product.query()
      .select()
      .preload("category")
      .preload("price", (query) => {
        query.orderBy("created_at", "desc");
        query.where("is_active", true);
      })
      .preload("stock", (query) => {
        query.orderBy("created_at", "desc");
        query.where("is_active", true);
      })
      .paginate(page, perPage || 10);

    response.send(products);
  }

  public async getProductsWithOutPaginate({ response }: HttpContextContract) {
    const products = await Product.query()
      .select()
      .preload("price", (query) => {
        query.orderBy("created_at", "desc");
        query.where("is_active", true);
      })
      .preload("stock", (query) => {
        query.orderBy("created_at", "desc");
        query.where("is_active", true);
      })
      .where("is_active", true);

    response.send(products);
  }

  public async createProduct({ request, response, auth }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        categoryId: schema.string({}, [
          rules.exists({ table: "categories", column: "id" }),
        ]),
        name: schema.string({}, [
          rules.unique({
            table: "products",
            column: "name",
          }),
        ]),
        description: schema.string.optional(),
        image: schema.string.optional(),
      }),
    });

    const { price, quantity } = await request.validate({
      schema: schema.create({
        price: schema.number(),
        quantity: schema.number(),
      }),
    });

    const product = new Product();

    await product.merge({ ...data, createdBy: auth?.user?.id }).save();

    await product
      .related("prices")
      .create({ price, updatedBy: auth?.user?.id });
    await product
      .related("stocks")
      .create({ quantity, updatedBy: auth?.user?.id });

    response.status(201);
  }

  public async getProductById({ params, response }: HttpContextContract) {
    const { productId } = params;

    const product = await Product.findOrFail(productId);

    await product.load("price", (query) => {
      query.where("is_active", true);
    });

    await product.load("stock", (query) => {
      query.where("is_active", true);
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
        categoryId: schema.string({}, [
          rules.exists({ table: "categories", column: "id" }),
        ]),
        name: schema.string({}, [
          rules.unique({
            table: "products",
            column: "name",
            whereNot: { id: productId },
          }),
        ]),
        description: schema.string.optional(),
        image: schema.string.optional(),
        isActive: schema.boolean(),
      }),
    });

    const { price, quantity } = await request.validate({
      schema: schema.create({
        price: schema.number(),
        quantity: schema.number(),
      }),
    });

    const product = await Product.findOrFail(productId);

    await product.merge({ ...data }).save();

    await product
      .related("prices")
      .updateOrCreate({ isActive: true }, { isActive: false });
    await product
      .related("stocks")
      .updateOrCreate({ isActive: true }, { isActive: false });

    await product
      .related("prices")
      .updateOrCreate(
        { price: price },
        { price: price, updatedBy: auth?.user?.id, isActive: true }
      );
    await product
      .related("stocks")
      .updateOrCreate(
        { quantity: quantity },
        { quantity: quantity, updatedBy: auth?.user?.id, isActive: true }
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
