import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "product_stocks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .uuid("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table
        .uuid("updated_by")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable();
      table.boolean("is_active").defaultTo(true);
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
