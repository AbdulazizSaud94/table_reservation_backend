import { User, UserInterface } from '../models/User';
import bcrypt from 'bcrypt';
import config from '../configs/appConfig';
export class UserUtil {
  public async getAllUsers(): Promise<UserInterface[]> {
    try {
      const users: any = await User.findAll({
        attributes: ['employeeNumber', 'name', 'role', 'deleted', 'createdBy', 'createdAt']
      });
      return users;
    } catch (err) {
      return err.message;
    }
  }

  public async addUser(name: string, password: string, role: string) {
    try {
      const users: any = await User.findAll({
        attributes: ['employeeNumber', 'name', 'role', 'deleted', 'createdBy', 'createdAt']
      });
      let mostRecentId: number = 999;
      const hash = bcrypt.hashSync(password, config.SALT_ROUNDS);

      for (const user of users) if (user.employeeNumber > mostRecentId) mostRecentId = user.employeeNumber;

      const newUser = await User.build({
        name,
        employeeNumber: mostRecentId + 1,
        password: hash,
        role,
        createdBy: 'admin',
        createdAt: new Date().toISOString()
      }).save();

      return newUser.toJSON();
    } catch (err) {
      // tslint:disable-next-line: no-console
      console.log(err.message);
      return err.message;
    }
  }
}
