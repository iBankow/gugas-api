import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User";

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    // Lookup user manually
    const user = await User.query()
      .where("email", email)
      .where("is_active", true)
      .firstOrFail();

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest("Invalid credentials");
    }

    // Generate token
    const token = await auth.use("api").generate(user, { expiresIn: "7days" });

    return response.send({ token, user });
  }
}
