import User from "../models/User.js";
import jwt from "jsonwebtoken";

const userRegister = async(req, res) => {
    const { email } = req.body;

    const existsUser = await User.findOne({ where: { email }});

    if(existsUser){
        res.status(400).json({msg: "El usuario ya existe"});  
        return;
    }

    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error al crear el usuario"});
    }
}

const userLogin = async(req, res) => {
    const { email, password } = req.body;

    const existsUser = await User.findOne({ where: { email } });

    if (!existsUser) {
      res.status(404).json({ msg: "Usuario no encontrado" });
      return;
    }
    
    try {
        const verifyPassowrd = await existsUser.authenticate(password);

        if (!verifyPassowrd) {
          res.status(401).json({ msg: "Contraseña incorrecta" });
          return;
        }

        const payload = {
            userId: existsUser.id,
            username: existsUser.username,
            email: existsUser.email
        }

        const secretKey = "mi_clave_secreta";
        const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});

        res.status(200).json({ msg: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el inicio de sesión" });
    }
}

export { userRegister, userLogin };