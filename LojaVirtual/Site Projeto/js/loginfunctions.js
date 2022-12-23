import {Api} from "./class/app.js"
import { Notify } from "./class/Notify.js"

const btn = document.querySelector('button')
const inputs = document.querySelectorAll('input')


btn.addEventListener('click', (event)=>{
    event.preventDefault();
    const data = {
        email: inputs[0],
        password: inputs[1]
    }

    try{
        Api.loginUser(data)
    }catch(err){
        Notify.now(false, 5000, "Erro desconhecido")
    }
    
})