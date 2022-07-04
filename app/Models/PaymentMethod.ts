import { DateTime } from "luxon";
import { BaseModel, beforeCreate, column } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";

export default class PaymentMethod extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public method: string;

  @column({ serializeAs: "isActive" })
  public isActive: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @beforeCreate()
  public static async hashPassword(paymentMethod: PaymentMethod) {
    paymentMethod.id = uuid();
  }
}
