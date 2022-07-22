
export class GestorMemory{
    #elementos;
    #coleccion;

    constructor(coleccion, elementos){
        this.#coleccion = coleccion;
        this.#elementos = elementos || new Array();
    }

    addElementos(...elementos){
        this.#elementos.push(...elementos);
        return this.getAllElementos();
    }
    getAllElementos(){
        return this.#elementos;
    }
    getElementoById(id){
        if(id){
            return this.#elementos.find(e=> e.id === id);
        }
    }
    updateElementoById(id,objeto){
        if(id && objeto){
            const resultado = this.deleteElementoById(id);
            if(resultado!=null){
                this.#elementos.push(objeto);
                return this.getAllElementos();
            }
        }
        return null;
    }
    deleteElementoById({id}){
        if(id){
            let indice = this.#elementos.findIndex(e=> e.id === id);
            if(indice > -1){
                this.#elementos.splice(indice,1);
                return this.getAllElementos();
            }
        }
        return null;
    }
}