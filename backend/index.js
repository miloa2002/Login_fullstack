import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

const corsOption = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());

try {
    await db.authenticate();
    db.sync();
    console.log("Conexión correcta a la base de datos");
} catch (error) {
    console.log("Error en la conexión con la base de datos", error);
}

app.use("/api/v1/user", userRoutes);

const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})