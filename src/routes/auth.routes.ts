import {Router} from 'express';
const router = Router();

import {signin, signup} from '../controllers/user.controller'

// Registrarse --> / POST /signup
router.post('/signup', signup);

// Iniciar sesión --> / POST /signin
router.post('/signin', signin);

export default router;