import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: "createdBy" })
  public createdBy: string;

  @column()
  public category: string;

  @column()
  public image: string;

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

  @hasMany(() => Product)
  public products: HasMany<typeof Product>;
}
