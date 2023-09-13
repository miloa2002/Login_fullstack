import { api } from "../api/api";

export default {
    userRegister(newUser){
        return api.post("/api/v1/user/registro", newUser);
    },
    userLogin(user){
        return api.post("/api/v1/user/login", user);
    }
}