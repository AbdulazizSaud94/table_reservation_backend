import { Reservation } from '../models/Reservation';
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
    const table: any = await Table.findOne({
      where: { number: tableNumber },
      include: [
        {
          model: Reservation,
          required: false
        }
      ]
    });
    if (!table) throw new Error(`Table #${tableNumber} not found`);
    if (table.reservations.length > 0) throw new Error('Table with reservations cannot be deleted');
    table.destroy();
    return tableNumber;
  }
}
