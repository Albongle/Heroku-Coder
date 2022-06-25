import { getDatosFetch, postDatosFetch } from "./modules/fetch.js";
import { renderObjetos } from "./modules/render.js";
import { Producto } from "./modules/producto.js";

const socket = io();
const send = document.getElementById("cargar");
const form = document.getElementById("formulario");
const inputs = document.querySelectorAll(".controles input");
const productos = [];

socket.on("refresh-productos",(data)=>{
    renderObjetos(data);
});

socket.on("refresh-carrito",(data)=>{
    console.log(data);
});


window.addEventListener("DOMContentLoaded",async ()=>{
    send.addEventListener("click",handlerAddProducto);
    try{
        productos.push(...(await getDatosFetch("/api/productos-test")).productosFaker);
        renderObjetos(productos);
        document.querySelectorAll(".btn-comprar").forEach(btn => btn.addEventListener("click", handlerComprarProducto));
    }
    catch(error){
        console.error(error);
    }


});

const handlerAddProducto= async(event)=>{
    event.preventDefault();
    let obj = new Producto(form.urlImg.value,form.nombre.value,form.marca.value,form.gama.value,form.tipo.value,parseInt(form.stock.value),
    parseInt(form.precio.value),parseInt(form.cuotas.value));
    try{

        await postDatosFetch("/api/productos-test",obj);
    }
    catch(error){
        console.error(error);
    }
    deleteForm();
}


const deleteForm = ()=>{
    
    inputs.forEach(e => e.value = "");
}

const handlerComprarProducto = async (event)=>{

    const productoComprado = productos.find(p=> p.id === event.target.parentNode.parentNode.dataset.id);
    try{
        productoComprado.cantidad = 1;
        await postDatosFetch("/api/carrito", productoComprado);
    }
    catch(error){
        console.error(error);
    }

}



