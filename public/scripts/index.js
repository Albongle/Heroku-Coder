import { getDatosFetch, postDatosFetch, deleteDatosFetch } from "./modules/fetch.js";
import { renderObjetos } from "./modules/render.js";


const socket = io();

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
    if(productosCarrito.length>0){
        renderObjetos(sectionCarrito,mapearProductosDelCarrito(productosCarrito),"Eliminar","Carrito");
        document.querySelectorAll(".btn-Eliminar").forEach(btn => btn.addEventListener("click", handlerEliminarProducto));
        document.querySelector("#btn-procesar-compra").addEventListener("click", handlerProcesarCompra);
    }

});


window.addEventListener("DOMContentLoaded",async ()=>{

    try{
        await getDatosFetch("/api/productos-test");
        await getDatosFetch("/api/carrito");
    }
    catch(error){
        console.error(error);
    }
});



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


const handlerProcesarCompra = (event)=>{
    alert("procesar compra");
}


