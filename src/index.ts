import express, { Request, Response, NextFunction, } from 'express';
import professionals from './view/professional'
import dotenv from 'dotenv';
import cors from 'cors'
import { errorHandler } from './utils/errorHandler';
import responsible from './view/responsible';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(cors())

console.log(`make & refine`);

app.use(express.json());

app.use("/professional", professionals)
app.use("/responsible", responsible)
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
