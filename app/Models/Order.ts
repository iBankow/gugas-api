import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";
import { v4 as uuid } from "uuid";
import PaymentMethod from "./PaymentMethod";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column({ serializeAs: "methodId" })
  public methodId: string;

  @column({ serializeAs: "createdBy" })
  public createdBy: string;

  @column({ serializeAs: "subTotal" })
  public subTotal: number;

  @column()
  public status: string;

  @column({ serializeAs: "isActive" })
  public isActive: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: "createdAt" })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async hashPassword(order: Order) {
    order.id = uuid();
  }

  @belongsTo(() => PaymentMethod)
  public method: BelongsTo<typeof PaymentMethod>;

  @manyToMany(() => Product, {
    localKey: "id",
    relatedKey: "id",
    pivotForeignKey: "order_id",
    pivotRelatedForeignKey: "product_id",
    pivotTable: "product_order",
    pivotColumns: ["product_price", "quantity"],
  })
  public products: ManyToMany<typeof Product>;
}
