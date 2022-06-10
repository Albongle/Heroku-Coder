export class Producto{

    constructor(img,nombre,marca,gama,tipo,stock,precio,cuotas){
        this.urlImg = img || "N/A"; 
        this.nombre = nombre || "N/A";
        this.marca = marca || "N/A";
        this.gama = gama || "Alta";
        this.tipo = tipo || "Telefono";
        this.stock = stock || 0;
        this.precio = precio || 0;
        this.cuotas = cuotas || 3;
        this.desc = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro facilis et atque laudantium temporibus dolore, modi vel accusamus dolorum nisi";
    }


}