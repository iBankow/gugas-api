import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  // Route.get("/", "CategoriesController.getAllCategories");
  Route.get("/", "CategoriesController.getCategoriesWithOutPaginate");
  Route.get("/:categoryId", "CategoriesController.getCategoryById");
  Route.get("/slug/:slug", "CategoriesController.getCategoryBySlug");

  Route.group(() => {
    Route.post("/", "CategoriesController.createCategory");
    Route.put("/:categoryId", "CategoriesController.updateCategoryById");
    Route.delete("/:categoryId", "CategoriesController.desactiveCategoryById");
  }).middleware("auth");
}).prefix("/categories");
