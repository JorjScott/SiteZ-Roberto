import { Notify } from "./Notify.js";

export class Api {
    static BaseUrl = "http://localhost:4001";
    static userToken = localStorage.getItem("@userToken");
    static userName = localStorage.getItem("@userName");
    static headers = {
        "Content-Type": "application/json"
    }

    static async registerUser(data) {
        const userRegister = await fetch(`${this.BaseUrl}/users`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.ok) {
                    Notify.now(true, 5000, "Usuário cadastrado com sucesso!")
                    const { name } = res;
                    localStorage.setItem("@userName", name);
                } else {
                    Notify.now(false, 5000, res.error)
                }
            })
            .catch(err => Notify.now(false, 5000, err))
        return userRegister
    }

    static async loginUser(data) {
        try{
            const authLogin = await fetch(`${this.BaseUrl}/login`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    Notify.now(true, 5000, "Login efetuado com sucesso! Você está sendo redirecionado")
                    const { token } = res;
                    localStorage.setItem("@userToken", token);
                }).catch(err => Notify.now(false, 5000, err))
            return authLogin;
        }catch(err){
            console.log(err)
        }
    }

}