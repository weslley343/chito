import { Router } from "express";
import professionalRoutes from "./modules/professional";

const router = Router()

router.use('/professional', professionalRoutes)

export default router