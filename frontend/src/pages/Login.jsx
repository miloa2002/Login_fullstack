import { useState } from "react";
import { Link } from "react-router-dom"
import userServices from "../services/userServices";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const data = {
        email,
        password
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {

            const token = localStorage.getItem("token")

            const response = await userServices.userLogin(data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response);
            const tokenResponse = response.data.token;
            navigate("/home");

            localStorage.setItem("token", tokenResponse)
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Inicio de sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Escribe tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Escribe tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Inicia sesión
                        </button>
                    </div>

                    <div className="flex justify-between">
                        <Link to={"/registro"} className="text-blue-500">¿No tienes cuenta? Registrate</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login