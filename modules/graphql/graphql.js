import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { ProductoRepository } from "../../repository/Producto.Repository.js";


const schema = buildSchema(`

    type Producto 
    {
        id:ID!, 
        urlImg:String, 
        desc:String, 
        nombre:String, 
        marca:String, 
        gama:String, 
        tipo:String, 
        precio:String, 
        cuotas:Int, 
        cantidad:Int 
    }
    type Query 
    {
        getAllProductosFaker:[Producto]
    }
    type Mutation 
    {
        addProductos(
            id:String!, 
            urlImg:String, 
            desc:String, 
            nombre:String, 
            marca:String, 
            gama:String, 
            tipo:String, 
            precio:String, 
            cuotas:Int, 
            cantidad:Int 
        ):[Producto],

        updateProductos(
            id:String!, 
            urlImg:String, 
            desc:String, 
            nombre:String, 
            marca:String, 
            gama:String, 
            tipo:String, 
            precio:String, 
            cuotas:Int, 
            cantidad:Int 
        ):[Producto],
        deleteProductos(id:ID!):[Producto]
    }
`);


const middlewareGraphQl = graphqlHTTP(
    {
        schema:schema,
        rootValue:
        {
            getAllProductosFaker:ProductoRepository.getAllProductosFaker,
            addProductos:ProductoRepository.addProductos,
            updateProductos:ProductoRepository.updateProductos,
            deleteProductos:ProductoRepository.deleteProductos

        }
        ,graphiql:true
    });

export default {middlewareGraphQl};