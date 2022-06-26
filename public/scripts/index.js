import { getDatosFetch, postDatosFetch, deleteDatosFetch } from "./modules/fetch.js";
import { renderObjetos } from "./modules/render.js";
import { Producto } from "./modules/producto.js";

const socket = io();
const send = document.getElementById("cargar");
const form = document.getElementById("formulario");
const inputs = document.querySelectorAll(".controles input");
const sectionProductos = document.querySelector("#section-productos");
const sectionCarrito = document.querySelector("#section-carrito");
const productos = [];
const productosCarrito = [];
let carrito;

socket.on("refresh-productos",(data)=>{
    productos.splice(0, productos.length);
    productos.push(...data);
    renderObjetos(sectionProductos,productos,"Comprar","Productos");
    document.querySelectorAll(".btn-Comprar").forEach(btn => btn.addEventListener("click", handlerComprarProducto));
});

socket.on("refresh-carrito",(data)=>{
    console.log(data);
    productosCarrito.splice(0, productosCarrito.length);
    productosCarrito.push(...data.carrito.productos);
    carrito = data.carrito;
    renderObjetos(sectionCarrito,mapearProductosDelCarrito(productosCarrito),"Eliminar","Carrito");
    document.querySelectorAll(".btn-Eliminar").forEach(btn => btn.addEventListener("click", handlerEliminarProducto));
});


window.addEventListener("DOMContentLoaded",async ()=>{
    send.addEventListener("click", handlerAddProducto);
    try{
        await getDatosFetch("/api/productos-test");
        await getDatosFetch("/api/carrito");
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

function mapearProductosDelCarrito(elementos){
    return elementos.map(p=> {return {id:p.id,urlImg:p.urlImg,cantidad:p.cantidad,precio:p.precio, nombre:p.nombre}});
}

const handlerEliminarProducto = async (event)=>{
    const producto = productosCarrito.find(p=> p.id === event.target.parentNode.parentNode.dataset.id);
    if(producto){
        if((producto.cantidad-1) === 0){
            console.log(typeof producto.cantidad)
            const res = await  deleteDatosFetch(`/api/carrito/${carrito._id}/productos/${producto.id}`);
            console.log(res);
        }
        else{
            producto.cantidad--;
            const productosAux = productosCarrito.filter(p=> p.id !== producto.id );
            productosAux.push(producto);
            const res = await postDatosFetch(`/api/carrito/${carrito._id}/productos`,productosAux);
            console.log(res);
        }
    }

}


