import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  //   // Route.get("/", "CategoriesController.getAllCategories");
  //   Route.get("/", "CategoriesController.getCategoriesWithOutPaginate");
  //   Route.get("/:categoryId", "CategoriesController.getCategoryById");

  Route.group(() => {
    Route.get("/", "OrdersController.getAllOrders");
    Route.post("/", "OrdersController.createOrder")
    Route.put("/:categoryId", "CategoriesController.updateCategoryById");
    Route.delete("/:categoryId", "CategoriesController.desactiveCategoryById");
  }).middleware("auth");
}).prefix("/orders");
