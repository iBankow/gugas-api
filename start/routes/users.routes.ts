import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/me", "UsersController.getMyInformations").middleware(
    "auth"
  );
}).prefix("/users");
