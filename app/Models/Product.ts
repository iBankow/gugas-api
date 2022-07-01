import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  hasOne,
  HasOne,
} from "@ioc:Adonis/Lucid/Orm";
import ProductPrice from "./ProductPrice";
import ProductStock from "./ProductStock";
import { v4 as uuid } from "uuid";
import Category from "./Category";

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
  public isActive: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: "createdAt" })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;

  @hasOne(() => ProductPrice)
  public price: HasOne<typeof ProductPrice>;

  @hasMany(() => ProductPrice)
  public prices: HasMany<typeof ProductPrice>;

  @hasOne(() => ProductStock)
  public stock: HasOne<typeof ProductStock>;

  @hasMany(() => ProductStock)
  public stocks: HasMany<typeof ProductStock>;

  @beforeCreate()
  public static async generateUuid(product: Product) {
    product.id = uuid();
  }
}
