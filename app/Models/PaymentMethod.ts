import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class PaymentMethod extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public method: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;
}
