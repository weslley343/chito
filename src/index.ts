import express, { Request, Response, NextFunction, } from 'express';
import professionalRoutes from './view/professional'
import dotenv from 'dotenv';
import cors from 'cors'
import { errorHandler } from './utils/errorHandler';
import responsibleRoutes from './view/responsible';
import clientRoutes from './view/client';
import relationRoutes from './view/relation';
import avaliationRoutes from './view/avaliation';
import ScaleRoutes from './view/scale';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use('/static', express.static('assets'))
app.use('/static', express.static('public'))

app.use(cors())

console.log(`chito - make & refine`);

app.use(express.json());

app.use("/professional", professionalRoutes)
app.use("/responsible", responsibleRoutes)
app.use("/client", clientRoutes)
app.use("/relation", relationRoutes)
app.use("/avaliation", avaliationRoutes)
app.use("/scale", ScaleRoutes)



app.get('/', (req: Request, res: Response) => {
    res.json({ "msg": "hello BASE" })
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(error, req, res, next);
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {

        console.log(`

        ┏┓            ┓     
        ┣┫┏┏┓┏┳┓┏┓┏┓┏┓┣┓┏┓┏┓
        ┛┗┗┗┛┛┗┗┣┛┗┻┛┗┛┗┗┻┛ 
                ┛           
    `)
        console.log('----------------------------')
        console.log(`Server is running at http://localhost:${port}`);

    });
}

export default app
