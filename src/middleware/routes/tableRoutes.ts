import express, { Request, Response } from 'express';
import { validator } from 'sequelize/types/lib/utils/validator-extras';
import { Authinticator } from '../../middleware/Authenticator';
import { TableUtil, ReservationUtil } from '../../utils';
import { TableValidator } from '../../validators';
import { ReservationValidator } from '../../validators';

export const tableRouter = express.Router();
const tableUtil: TableUtil = new TableUtil();
const tableValidator: TableValidator = new TableValidator();
const reservationUtil: ReservationUtil = new ReservationUtil();
const reservationValidator: ReservationValidator = new ReservationValidator();

// Get all tables
tableRouter.get('/', Authinticator.adminAuth, async (req: Request, res: Response) => {
  try {
    const tables = await tableUtil.getAllTables();
    res.status(200);
    res.json(tables);
  } catch (error) {
    res.status(400);
    res.json({ error: error.message });
  }
});

// Add new table
tableRouter.post('/', Authinticator.adminAuth, async (req: any, res: Response) => {
  try {
    tableValidator.validateTable(req.body.number, req.body.seats);
    const newTable = await tableUtil.addTable(req.body.number, req.body.seats, req.userData.name);
    res.status(200);
    res.json(newTable);
  } catch (error) {
    res.status(400);
    res.json({ error: error.message });
  }
});

// Delete table
tableRouter.delete('/:id', Authinticator.adminAuth, async (req: any, res: Response) => {
  try {
    const deletedTableNumber = await tableUtil.deleteTable(parseInt(req.params.id, 10));
    res.status(200);
    res.json({ success: `Table #${deletedTableNumber} got deleted` });
  } catch (error) {
    res.status(400);
    res.json({ error: error.message });
  }
});

// Get all reservations
tableRouter.get('/reservation', Authinticator.adminAuth, async (req: Request, res: Response) => {
  try {
    const reservations = await reservationUtil.getAllReservations();
    res.status(200);
    res.json(reservations);
  } catch (error) {
    res.status(400);
    res.json({ error: error.message });
  }
});

// Get all reservations for today
tableRouter.get('/reservations/today', Authinticator.checkAuth, async (req: Request, res: Response) => {
  try {
    const reservations = await reservationUtil.getTodayReservation();
    res.status(200);
    res.json(reservations);
  } catch (error) {
    res.status(400);
    res.json({ error: error.message });
  }
});

// Add new reservation
tableRouter.post('/reservations', Authinticator.checkAuth, async (req: any, res: Response) => {
  try {
    reservationValidator.validateReservation(req.body.tableNumber, req.body.customers, req.body.from, req.body.to);
    const addReservation = await reservationUtil.addReservation(
      req.body.tableNumber,
      req.body.customers,
      req.body.from,
      req.body.to,
      req.userData.name
    );
    res.status(200);
    res.json(addReservation);
  } catch (error) {
    res.status(400);
    res.json({ error: error.message });
  }
});

// Delete reservatiom
tableRouter.delete('/reservations/:id', Authinticator.checkAuth, async (req: any, res: Response) => {
  try {
    const reservationId = await reservationUtil.deleteReservation(parseInt(req.params.id, 10));
    res.status(200);
    res.json({ success: `Reservation #${reservationId} got deleted` });
  } catch (error) {
    res.status(400);
    res.json({ error: error.message });
  }
});
