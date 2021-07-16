export class ReservationValidator {
  public validateReservation(tableNumber: number, customers: number, from: number, to: number) {
    if (!tableNumber) throw new Error('table number is mandatory');
    if (!customers) throw new Error('customers number is mandatory');
    if (!from) throw new Error('from time is mandatory');
    if (!to) throw new Error('to time is mandatory');

    if (typeof tableNumber !== 'number') throw new Error('Table number must be of type integer');
    if (typeof customers !== 'number') throw new Error('customers number must be of type integer');
    if (typeof from !== 'number') throw new Error('from must be of type double');
    if (typeof tableNumber !== 'number') throw new Error('to must be of type double');

    if (from > to) throw new Error('from time cannot be after to');
    if (from < 12) throw new Error('resturant opens at 12 pm');
    if (to > 24) throw new Error('resturant closes at 12 am (24)');
    if (customers < 1 || customers > 12) throw new Error('customers must be between 1 and 12 inclusive');
  }
}
