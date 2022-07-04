import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import PaymentMethod from "App/Models/PaymentMethod";

export default class PaymentMethodsController {
  public async getAllPeymentMethods({ response }: HttpContextContract) {
    const methods = await PaymentMethod.query()
      .select()
      .where("is_active", true);

    response.send(methods);
  }

  public async createPeymentMethod({ request, response }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        method: schema.string({}, [
          rules.unique({
            table: "payment_methods",
            column: "method",
          }),
        ]),
      }),
    });

    const method = new PaymentMethod();

    await method.merge(data).save();

    response.status(201).send(method);
  }

  public async updatePeymentMethodById({
    request,
    params,
    response,
  }: HttpContextContract) {
    const { methodId } = params;

    const data = await request.validate({
      schema: schema.create({
        method: schema.string({}, [
          rules.unique({
            table: "payment_methods",
            column: "method",
            whereNot: { id: methodId },
          }),
        ]),
      }),
    });

    const method = await PaymentMethod.findOrFail(methodId);

    await method.merge({ ...data }).save();

    response.status(204);
  }

  public async desactivePeymentMethodById({
    params,
    response,
  }: HttpContextContract) {
    const { methodId } = params;
    const method = await PaymentMethod.findOrFail(methodId);
    await method.merge({ isActive: false }).save();

    response.status(204);
  }
}
