import express, { Application, Request, Response } from 'express';
import { router } from './middleware/routes/router';
import config from './configs/appConfig';
import dbConnect from './dbConnect';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './configs/swagger.json';

const app = express();

// server listening port
const port = config.PORT;

app.use(express.json());

// router
app.use('/api', router);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle 404 - Keep this as a last route
app.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: '404: invalid api request' });
});
// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`server started at http://localhost:${port}`);
});

// connect to DB
dbConnect();
