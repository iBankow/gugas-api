import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/", "SalesController.createSaleOrder");
  Route.put("/:orderId", "SalesController.updateSaleOrder");
  Route.delete("/:orderId", "SalesController.deleteSaleOrder");
})
  .middleware("auth")
  .prefix("/sales");
