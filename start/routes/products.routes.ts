import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "ProductsController.getAllProduct");
  Route.get("/:categoryId", "ProductsController.getProductsById");

  Route.group(() => {
    Route.post("/", "ProductsController.createProducts");
    Route.put("/:categoryId", "ProductsController.updateProductsById");
    Route.delete("/:categoryId", "ProductsController.desactiveProductsById");
  }).middleware("auth");
}).prefix("/products");
