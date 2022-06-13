import { DateTime } from "luxon";
import { BaseModel, beforeSave, column } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";

export default class PaymentMethod extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public method: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @beforeSave()
  public static async hashPassword(paymentMethod: PaymentMethod) {
    paymentMethod.id = uuid();
  }
}
