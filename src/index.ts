import express, { Request, Response, NextFunction, } from 'express';
import routes from './view'
import dotenv from 'dotenv';
import cors from 'cors'
import { AcessDeniedError, DatabaseError, DomainLogicError, InteralServerError, RequestError } from './utils/erros'
import { Prisma } from '@prisma/client';
import { errorHandler } from './utils/errorHandler';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(cors())

console.log(`make & refine`);

app.use(express.json());

app.use(routes)
app.get('/', (req: Request, res: Response) => {
    res.json({ "msg": "hello BASE" })
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(error, req, res, next);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});





export default app
