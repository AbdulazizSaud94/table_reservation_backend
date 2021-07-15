import express, { Request, Response } from 'express';
import { Authinticator } from '../../middleware/Authenticator';
import { TableUtil } from '../../utils';
import { TableValidator } from '../../validators/TableValidator';

export const tableRouter = express.Router();
const tableUtil: TableUtil = new TableUtil();
const tableValidator: TableValidator = new TableValidator();

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
