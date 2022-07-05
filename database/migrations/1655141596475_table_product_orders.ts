import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "product_orders";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .uuid("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table
        .uuid("order_id")
        .references("id")
        .inTable("orders")
        .onDelete("CASCADE");
      table.decimal("price").notNullable();
      table.integer("quantity");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
