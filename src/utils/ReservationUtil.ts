import { Reservation, ReservationInterface } from '../models/Reservation';
import { Table, TableInterface } from '../models/Table';

export class ReservationUtil {
  public async getAllReservations() {
    try {
      const reservations: any = await Reservation.findAll();
      return reservations;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async addReservation(tableNumber: number, customers: number, from: number, to: number, createdBy: string) {
    try {
      const table: any = await Table.findOne({
        where: { number: tableNumber },
        include: [
          {
            model: Reservation,
            required: false
          }
        ]
      });
      if (!table) {
        throw new Error(`Table #${tableNumber} not found`);
      }
      if (!(table.seats === customers || table.seats - 1 === customers)) {
        throw new Error('Number of customers does not match table seats');
      }
      for (const reservation of table.reservations) {
        const today = new Date().toISOString().split('T')[0];
        const reservationDay = reservation.createdAt.split('T')[0];
        const sameDay = today === reservationDay;
        const hoursOverlap =
          (reservation.from <= from && reservation.to >= to) ||
          (reservation.from <= from && reservation.to >= from) ||
          (reservation.to >= to && reservation.from <= to);

        if (sameDay && hoursOverlap) {
          throw new Error(`reservatiom overlaps with #${reservation._id}`);
        }
      }
      const reserve = await Reservation.build({
        tableNumber,
        from,
        to,
        customers,
        createdBy,
        createdAt: new Date().toISOString()
      }).save();

      return reserve.toJSON();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async getTodayReservation() {
    try {
      const result = [];
      const reservations: any = await Reservation.findAll();
      const today = new Date().toISOString().split('T')[0];
      for (const reservation of reservations) {
        const reservationDay = reservation.createdAt.split('T')[0];
        if (reservationDay === today) {
          reservation.day = today;
          result.push({ ...JSON.parse(JSON.stringify(reservation)), reservationDay });
        }
      }
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async deleteReservation(id: number) {
    const reservation: any = await Reservation.findOne({ where: { _id: id } });
    if (!reservation) throw new Error(`Reservation #${id} not found`);
    const today = new Date().toISOString().split('T')[0];
    const reservationDay = reservation.createdAt.split('T')[0];
    if (today !== reservationDay) throw new Error('Reservations can only be deleted in the same day');
    reservation.destroy();
    return id;
  }
}
