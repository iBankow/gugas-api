import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "payment_methods";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").unique().primary();
      table.string("method");
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
