import { DateTime } from "luxon";
import { BaseModel, beforeCreate, column } from "@ioc:Adonis/Lucid/Orm";
import Hash from "@ioc:Adonis/Core/Hash";
import { v4 as uuid } from "uuid";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public name: string;

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

  @beforeCreate()
  public static async hashPassword(user: User) {
    user.id = uuid();
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
