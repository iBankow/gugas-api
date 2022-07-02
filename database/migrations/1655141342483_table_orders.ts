import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "orders";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").unique().primary();
      table.uuid("method_id").references("id").inTable("payment_methods");
      table.uuid("created_by").references("id").inTable("users");
      table.decimal("sub_total").notNullable();
      table.enu("status", ["paid", "not_paid"]).notNullable();
      table.boolean("is_active").defaultTo(true);
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
