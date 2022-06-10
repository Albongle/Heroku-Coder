import { getDatosFetch, postDatosFetch } from "./modules/fetch.js";
import { renderObjetos } from "./modules/render.js";
import { Producto } from "./modules/producto.js";

const socket = io();
const send = document.getElementById("cargar");
const form = document.getElementById("formulario");
const inputs = document.querySelectorAll(".controles input");

socket.on("refresh-productos",(data)=>{
    renderObjetos(data);
});


window.addEventListener("DOMContentLoaded",async ()=>{
    send.addEventListener("click",handlerAddProducto);
    let datos = await getDatosFetch("/api/productos-test");
    renderObjetos(datos.productosFaker);
})

const handlerAddProducto= async(event)=>{
    event.preventDefault();
    let obj = new Producto(form.urlImg.value,form.nombre.value,form.marca.value,form.gama.value,form.tipo.value,parseInt(form.stock.value),
    parseInt(form.precio.value),parseInt(form.cuotas.value));
    await postDatosFetch("/api/productos-test",obj);
    deleteForm();
};


const deleteForm = ()=>{
    
    inputs.forEach(e => e.value = "");
}



