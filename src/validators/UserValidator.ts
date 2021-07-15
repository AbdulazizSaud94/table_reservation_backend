export class UserValidator {
  public validateUser(name: string, role: string, password: string) {
    if (!name) throw new Error('User name is mandatory');
    if (!role) throw new Error('User role is mandatory');
    if (!password) throw new Error('User password is mandatory');
    if (typeof name !== 'string') throw new Error('User name must be of type string');
    if (typeof role !== 'string') throw new Error('User role must be of type string');
    if (typeof password !== 'string') throw new Error('User password must be of type string');
    if (password.length < 6) throw new Error('User password must be longer than 5 characters');
    if (role !== 'admin' && role !== 'employee') throw new Error('User role must be either admin or employee');
  }
}
