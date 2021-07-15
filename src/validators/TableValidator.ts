export class TableValidator {
  public validateTable(tableNumber: number, seats: number) {
    if (!tableNumber) throw new Error('Table number is mandatory');
    if (!seats) throw new Error('Table seats is mandatory');
    if (typeof tableNumber !== 'number') throw new Error('Table number must be of type integer');
    if (typeof seats !== 'number') throw new Error('Table seats must be of type integer');
    if (seats < 1 || seats > 12) throw new Error('Table seats must be between 1 and 12 inclusive');
  }
}
