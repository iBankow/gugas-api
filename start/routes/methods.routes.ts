import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "PaymentMethodsController.getAllPeymentMethods");
  Route.post("/", "PaymentMethodsController.createPeymentMethod");
  Route.put("/:methodId", "PaymentMethodsController.updatePeymentMethodById");
  Route.delete("/:methodId", "PaymentMethodsController.desactivePeymentMethodById");
})
  .middleware("auth")
  .prefix("/methods");
