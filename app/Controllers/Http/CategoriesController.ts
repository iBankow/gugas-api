import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

import Category from "App/Models/Category";

export default class CategoriesController {
  public async getAllCategories({ request, response }: HttpContextContract) {
    const { page, perPage } = request.all();

    const categories = await Category.query()
      .select()
      .where("is_active", true)
      .paginate(page, perPage || 10);

    response.send(categories);
  }

  public async getCategoriesWithOutPaginate({ response }: HttpContextContract) {
    const categories = await Category.query().select().where("is_active", true);

    response.send(categories);
  }

  public async createCategory({ request, response }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        category: schema.string(),
        image: schema.string.optional(),
      }),
    });

    const category = new Category();

    await category.merge(data).save();

    response.status(201).send(category);
  }

  public async getCategoryById({ params, response }: HttpContextContract) {
    const { categoryId } = params;

    const category = await Category.findOrFail(categoryId);

    await category.load("products");

    response.send(category);
  }

  public async updateCategoryById({
    request,
    params,
    response,
  }: HttpContextContract) {
    const { categoryId } = params;

    const data = await request.validate({
      schema: schema.create({
        category: schema.string({}, [
          rules.unique({
            table: "categories",
            column: "category",
            whereNot: { id: categoryId },
          }),
        ]),
        image: schema.string.optional(),
      }),
    });

    const category = await Category.findOrFail(categoryId);

    await category.merge({ ...data }).save();

    response.status(204);
  }

  public async desactiveCategoryById({
    params,
    response,
  }: HttpContextContract) {
    const { categoryId } = params;
    const category = await Category.findOrFail(categoryId);
    await category.merge({ isActive: false }).save();

    response.status(204);
  }
}
