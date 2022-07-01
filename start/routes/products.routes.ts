import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "ProductsController.getAllProducts");
  Route.get("/:productId", "ProductsController.getProductById");

  Route.group(() => {
    Route.post("/", "ProductsController.createProduct");
    Route.put("/:productId", "ProductsController.updateProductById");
    Route.delete("/:productId", "ProductsController.desactiveProductsById");
  }).middleware("auth");
}).prefix("/products");
