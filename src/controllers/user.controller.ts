import {Request, Response} from 'express';
import User, { IUser } from "../models/User.model";
import jwt from "jsonwebtoken";
import config from "../config/config";

// Me devuelve el token
function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400
  });
}

export const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({messageError: "El correo y contraseña no deben estar vacíos."});
    }

    const user = await User.findOne({email});
    if (user) {
      return res.status(400).json({messageError: "El usuario ya existe."});
    }

    // No vendría mal verificar el mail con exp. reg.
  
    const newUser = new User({email, password});
    await newUser.save();
    return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({messageError: "Ocurrió un error, intente más tarde."});
    }
};

export const signin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({messageError: "El correo y contraseña no deben estar vacíos."});
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({messageError: "El usuario no existe, por favor, regístrate."}); // Esto no debería saberlo el usuario, estoy probando 
    }

    const isMatch = await user.validatePassword(password);
    if (isMatch) {
      return res.status(200).json({ token: createToken(user) });
    }

    return res.status(400).json({messageError: "El correo o contraseña son incorrectos."});
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({messageError: "Ocurrió un error, intente más tarde."});
    }
};