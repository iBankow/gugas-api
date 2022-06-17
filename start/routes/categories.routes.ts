import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "CategoriesController.getAllCategories");
  Route.get("/:categoryId", "CategoriesController.getCategoryById");

  Route.group(() => {
    Route.post("/", "CategoriesController.createCategory");
    Route.put("/:categoryId", "CategoriesController.updateCategoryById");
    Route.delete("/:categoryId", "CategoriesController.desactiveCategoryById");
  }).middleware("auth");
}).prefix("/categories");
