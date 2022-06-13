import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run () {
    await User.create({
      name: 'Tiago',
      email: 'tiago@email.com',
      password: '123123',
    })
  }
}