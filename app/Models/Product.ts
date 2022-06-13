import { DateTime } from "luxon";
import { BaseModel, beforeSave, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import ProductPrice from "./ProductPrice";
import ProductStock from "./ProductStock";
import { v4 as uuid } from "uuid";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column({ serializeAs: "categoryId" })
  public categoryId: string;

  @column({ serializeAs: "createdBy" })
  public createdBy: string;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public image: string;

  @column({ serializeAs: "isActive" })
  public isActive: string;

  @column.dateTime({ autoCreate: true, serializeAs: "createdAt" })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @hasMany(() => ProductPrice)
  public prices: HasMany<typeof ProductPrice>;

  @hasMany(() => ProductStock)
  public stocks: HasMany<typeof ProductStock>;

  @beforeSave()
  public static async hashPassword(product: Product) {
    product.id = uuid();
  }
}
