import express, { Request, Response, NextFunction, } from 'express';
import professionalRoutes from './view/professional'
import dotenv from 'dotenv';
import cors from 'cors'
import { errorHandler } from './utils/errorHandler';
import responsibleRoutes from './view/responsible';
import clientRoutes from './view/client';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(cors())

console.log(`make & refine`);

app.use(express.json());

app.use("/professional", professionalRoutes)
app.use("/responsible", responsibleRoutes)
app.use("/client", clientRoutes)
app.get('/', (req: Request, res: Response) => {
    res.json({ "msg": "hello BASE" })
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(error, req, res, next);
});
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



export { server };

export default app
