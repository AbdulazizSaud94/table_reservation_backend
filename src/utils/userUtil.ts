import { User, UserInterface } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../configs/appConfig';
export class UserUtil {
  public async getAllUsers(): Promise<UserInterface[]> {
    try {
      const users: any = await User.findAll({
        attributes: ['employeeNumber', 'name', 'role', 'deleted', 'createdBy', 'createdAt'],
        where: { deleted: false }
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
      if (mostRecentId + 1 > 9999) throw new Error('user limit of 9999 exceeded');
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

  public async deleteUser(employeeNumber: number, adminName: string) {
    const user: any = await User.findOne({ where: { employeeNumber, deleted: false } });
    if (!user) throw new Error('user not found');
    const deleteUser = await User.update(
      { deleted: true, updatedBy: adminName, updatedAt: new Date().toISOString() },
      {
        where: { employeeNumber },
        returning: true
      }
    );
    return employeeNumber;
  }

  public async userLogin(employeeNumber: number, password: string) {
    const user: any = await User.findOne({ where: { employeeNumber, deleted: false } });
    if (!user) throw new Error('user not found');
    const matchPassword: boolean = await bcrypt.compare(password, user.password);
    if (!matchPassword) throw new Error('invalid password');
    const token: string = jwt.sign(
      {
        employeeNumbwr: user.employeeNumber,
        name: user.name,
        role: user.role
      },
      config.JWT_SECRET as string,
      { expiresIn: '3h' }
    );
    return token;
  }
}
