import { Link } from "react-router-dom";
import userServices from "../services/userServices"
import { useState } from "react";
import Swal from "sweetalert2"

const Register = () => {
    

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const data = {
        username,
        email,
        password
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            Swal.fire("Las contraseñas no coinciden")
            return;
        }

        try {
            const userRegister = await userServices.userRegister(data);
            if(userRegister){
                Swal.fire('Usuario creado con éxito');
            }

            setUsername("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        } catch (error) {
            if(error.response.status===400){
                Swal.fire(error.response.data.msg)

                setUsername("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
            }
        }
    };
    

  return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Registro</h2>
              <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                      <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
                      <input
                          type="text"
                          id="username"
                          className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
                          placeholder="Escribe tu username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                      />
                  </div>
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
                  <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-gray-600 font-medium">Confirmar Password</label>
                      <input
                          type="password"
                          id="confirmPassword"
                          className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
                          placeholder="Repite tu contraseña"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                      />
                  </div>
                  <div className="flex justify-end">
                      <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                      >
                          Registrar
                      </button>
                  </div>

                  <div className="flex justify-between">
                      <Link to={"/"} className="text-blue-500">Ya tienes cuenta? Inicia sesión</Link>
                  </div>
              </form>
          </div>
      </div>
  )
}

export default Register