import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { belongsTo } from "@ioc:Adonis/Lucid/Orm";
import { BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";

export default class ProductStock extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: "productId" })
  public productId: string;

  @column({ serializeAs: "updatedBy" })
  public updatedBy: string;

  @column()
  public quantity: number;

  @column({ serializeAs: "isActive" })
  public isActive: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: "createdAt" })
  public createdAt: DateTime;

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;
}
