import jwt from "jsonwebtoken";

const authJWT = (req, res, next) => {
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({msg: "Token no proporcionado"});
    }

    try {
        const decoded = jwt.verify(token, "mi_clave_secreta");
        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ msg: "Token no válido" });
    }
}

export default authJWT;