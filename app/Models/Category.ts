import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";
import { v4 as uuid } from "uuid";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column({ serializeAs: "createdBy" })
  public createdBy: string;

  @column()
  public category: string;

  @column()
  public slug: string;

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

  @beforeCreate()
  public static async hashPassword(category: Category) {
    category.id = uuid();
  }
}
