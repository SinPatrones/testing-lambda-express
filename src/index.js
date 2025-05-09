import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';

import contactsRouter from './routes/contacts.routes.js';
import contactsDataRouter from './routes/contactsData.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', contactsRouter);
app.use('/', contactsDataRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

if (process.env?.NODE_ENV !== 'production') {
  app.listen(8080, () => {
    console.log('sirviendo en puerto 8080');
  });
}

export const handler = serverless(app);
