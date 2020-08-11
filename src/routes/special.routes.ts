import { Router } from "express";
import passport from "passport";

const router = Router();

import {specialController} from "../controllers/special.controller";

// Ruta para probar la autenticación --> GET /special
router.get('/special', passport.authenticate("jwt", { session: false }), specialController);

export default router;