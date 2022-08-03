import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.get("/", "OrdersController.getAllOrders");
    Route.post("/", "OrdersController.createOrder");
    Route.get("/:orderId", "OrdersController.getOrderById");
  }).middleware("auth");
}).prefix("/orders");
