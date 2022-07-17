import {expect} from "chai";
import request from "supertest";
import { startServer } from "../server.js";
import {faker} from "@faker-js/faker";

describe("Testeando Endpoint Info", ()=>{
    describe("Al hacer un GET al endpoint",()=>{
        it("se espera tener un status 200", async ()=>{
            const response = await request(startServer(8080)).get("/api/info");
            expect(200).equal(response.status); 
        });

        it("se espera que el body contenga un mensaje con la solicitud procesada exitosamente", async ()=>{
            const response = await request(startServer(8080)).get("/api/info");
            expect("Solicitud procesada con exito").equal(response.body.message); 
        });
        it("se espera obtener un objeto con la informacion del sistema", async ()=>{
            const response = await request(startServer(8080)).get("/api/info");
            expect(true).equal(!!response.body.informacionDelSistema); 
        });

    });
});


describe("Testeando Endpoint Productos", ()=>{
    describe("Al hacer un GET al endpoint",()=>{
        it("se espera tener un status 200", async ()=>{
            const response = await request(startServer(8080)).get("/api/productos-test/faker");
            expect(200).equal(response.status); 
        });
        it("se espera que el body contenga un mensaje con la solicitud procesada exitosamente", async ()=>{
            const response = await request(startServer(8080)).get("/api/productos/faker");
            expect("Solicitud procesada con exito").equal(response.body.message); 
        });
        it("se espera obtener un objeto con un array de productos", async ()=>{
            const response = await request(startServer(8080)).get("/api/productos/faker");
            expect(true).equal(!!response.body.productosFaker);
            expect(true).equal(Array.isArray(response.body.productosFaker));
        });
    });

    describe("Al hacer un POST al endpoint", ()=>{
        describe("si no se envia ningun alguno de los datos para el alta del producto",()=>{
            it("se espera obtener un status 206",async ()=>{
                const response = await request(startServer(8080)).post("/api/productos/faker").send({});
                expect(206).equal(response.status);
            });
            it("se espera obtener un status error",async ()=>{
                const response = await request(startServer(8080)).post("/api/productos/faker").send({});
                expect("error").equal(response.body.status);
            });
            it("se espera obtener un mensaje con el error",async ()=>{
                const response = await request(startServer(8080)).post("/api/productos/faker").send({});
                expect("No se recibio alguno de los parametros para el alta del producto").equal(response.body.message);
            });
        });
        describe("Si se envian el producto",()=>{
            const producto ={
                id:faker.random.alphaNumeric(5),
                urlImg: faker.image.image(),
                desc: faker.lorem.lines(),
                nombre: faker.commerce.productName(),
                marca: faker.commerce.productDescription(),
                gama: faker.commerce.productMaterial(),
                tipo: faker.commerce.product(),
                stock:  faker.finance.amount(1,20,0),
                precio: faker.finance.amount(10000,78000,2,"$"),
                cuotas: faker.finance.amount(3,12,0),
                cantidad:faker.finance.amount(1,2,0),
            }
            it("se espera obtener un status 200",async ()=>{
                const response = await request(startServer(8080)).post("/api/productos/faker").send(producto);
                expect(200).equal(response.status);
            });
            it("se espera obtener un status ok",async ()=>{
                const response = await request(startServer(8080)).post("/api/productos/faker").send(producto);
                expect("ok").equal(response.body.status);
            });
            it("se espera obtener un mensaje con el estado de la solicitud",async ()=>{
                const response = await request(startServer(8080)).post("/api/productos/faker").send(producto);
                expect("Solicitud procesada con exito").equal(response.body.message);
            });
        });

    });
});