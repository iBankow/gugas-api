import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async getMyInformations({ response, auth }: HttpContextContract) {
    const user = await User.findOrFail(auth.user?.id);

    return response.send(user);
  }
}
