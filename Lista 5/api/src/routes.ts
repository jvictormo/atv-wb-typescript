import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./controllers/Customer/CreateCustomerController";
import { GetAllCustomersController } from "./controllers/Customer/GetAllCustomersControlleer";
import { GetCustomerByIdController } from "./controllers/Customer/GetCustomerByIdController";
import { DeleteCustomerById } from "./controllers/Customer/DeleteCustomerByIdController";
import { UpdateCustomerById } from "./controllers/Customer/UpdateCustomerById";
import { CreatePetController } from "./controllers/Pet/CreatePetController";
import { GetAllPetsController } from "./controllers/Pet/GetAllPetsController";
import { GetPetByIdController } from "./controllers/Pet/GetPetByIdController";
import { UpdatePetById } from "./controllers/Pet/UpdatePetById";
import { DeletePetById } from "./controllers/Pet/DeletePetByIdController";
import { GetPetswhitoutOwnerController } from "./controllers/Pet/GetPetswhitoutOwnerController";
import { CreateServiceController } from "./controllers/Service/CreateServiceController";
import { GetAllServiceController } from "./controllers/Service/GetAllServiceController";
import { DeleteServiceById } from "./controllers/Service/DeleteServiceByIdController";
import { UpdateServiceById } from "./controllers/Service/UpdateServiceById";
import { GetServiceByIdController } from "./controllers/Service/GetServicesByIdController";
import { CreateProductController } from "./controllers/Product/CreateProductController";
import { GetAllProductsController } from "./controllers/Product/GetAllProductsController";
import { GetProductByIdController } from "./controllers/Product/GetProductsByIdController";
import { DeleteProductById } from "./controllers/Product/DeleteProductByIdController";
import { UpdateProductById } from "./controllers/Product/UpdateProductById";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })



    //Customer routes
    fastify.post("/customer/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return CreateCustomerController(request, reply)
    })

    fastify.get("/customer/get", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetAllCustomersController(request, reply)
    })

    fastify.get("/customer/:sequenceIdCustomer", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetCustomerByIdController(request, reply)
    })

    fastify.delete("/customer/delete/:sequenceIdCustomer", async (request: FastifyRequest, reply: FastifyReply) => {
        return DeleteCustomerById(request, reply)
    })

    fastify.put("/customer/update/:sequenceIdCustomer", async (request: FastifyRequest, reply: FastifyReply) => {
        return UpdateCustomerById(request, reply)
    })


    //Pet routes
    fastify.post("/pet/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return CreatePetController(request, reply)
    })

    fastify.get("/pet/get", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetAllPetsController(request, reply)
    })

    fastify.get("/pet/owner", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetPetswhitoutOwnerController(request, reply)
    })

    fastify.get("/pet/:sequenceIdPet", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetPetByIdController(request, reply)
    })

    fastify.delete("/pet/delete/:sequenceIdPet", async (request: FastifyRequest, reply: FastifyReply) => {
        return DeletePetById(request, reply)
    })

    fastify.put("/pet/update/:sequenceIdPet", async (request: FastifyRequest, reply: FastifyReply) => {
        return UpdatePetById(request, reply)
    })


    //Service routes
    fastify.post("/service/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return CreateServiceController(request, reply)
    })

    fastify.get("/service/get", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetAllServiceController(request, reply)
    })

    fastify.get("/service/:sequenceIdService", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetServiceByIdController(request, reply)
    })

    fastify.delete("/service/delete/:sequenceIdService", async (request: FastifyRequest, reply: FastifyReply) => {
        return DeleteServiceById(request, reply)
    })

    fastify.put("/service/update/:sequenceIdService", async (request: FastifyRequest, reply: FastifyReply) => {
        return UpdateServiceById(request, reply)
    })



    //Product routes
    fastify.post("/product/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return CreateProductController(request, reply)
    })

    fastify.get("/product/get", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetAllProductsController(request, reply)
    })

    fastify.get("/product/:sequenceIdProduct", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetProductByIdController(request, reply)
    })

    fastify.delete("/product/delete/:sequenceIdProduct", async (request: FastifyRequest, reply: FastifyReply) => {
        return DeleteProductById(request, reply)
    })

    fastify.put("/product/update/:sequenceIdProduct", async (request: FastifyRequest, reply: FastifyReply) => {
        return UpdateProductById(request, reply)
    })
}