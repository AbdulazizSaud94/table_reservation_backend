import { Table, TableInterface } from '../models/Table';

export class TableUtil {
  public async getAllTables(): Promise<TableInterface[]> {
    try {
      const tables: any = await Table.findAll({
        attributes: ['number', 'seats', 'createdBy', 'createdAt']
      });
      return tables;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async addTable(tableNumber: number, seats: number, createdBy: string) {
    try {
      const table: any = await Table.findOne({ where: { number: tableNumber } });
      if (table) throw new Error(`Table #${tableNumber} already exist`);
      const newTable = await Table.build({
        number: tableNumber,
        seats,
        createdBy,
        createdAt: new Date().toISOString()
      }).save();

      return newTable.toJSON();
    } catch (err) {
      throw new Error(err.message);
    }
  }
  public async deleteTable(tableNumber: number) {
    const table: any = await Table.findOne({ where: { number: tableNumber } });
    if (!table) throw new Error(`Table #${tableNumber} not found`);
    table.destroy();
    return tableNumber;
  }
}
