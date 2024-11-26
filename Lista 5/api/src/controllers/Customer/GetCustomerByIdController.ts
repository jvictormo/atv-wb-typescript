import { FastifyRequest, FastifyReply } from "fastify";
import Customer from "../../models/Customer";
import Pet from "../../models/Pet";
import CustomerProduct from "../../models/CustomerProduct";
import CustomerService from "../../models/CustomerService";
import Product from "../../models/Product";
import Service from "../../models/Service";

async function GetCustomerByIdController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdCustomer } = request.params as { sequenceIdCustomer: number };

        // Buscar o cliente
        const customer = await Customer.findOne({ sequenceIdCustomer: Number(sequenceIdCustomer) });

        if (!customer) {
            return reply.status(404).send({ error: "Customer not found." });
        }

        // Buscar pets do cliente
        const pets = await Pet.find({ owner: customer.sequenceIdCustomer }).select('sequenceIdPet');

        // Buscar produtos do cliente manualmente
        const customerProducts = await CustomerProduct.find({ customer: customer.sequenceIdCustomer });
        const products = await Promise.all(
            customerProducts.map(async (item) => {
                const productData = await Product.findOne({ sequenceIdProduct: item.product });
                if (!productData) return null;
                return {
                    _id: productData._id,
                    name: productData.name,
                    price: productData.price,
                    sequenceIdProduct: productData.sequenceIdProduct,
                    quantity: item.quantity,
                };
            })
        );

        // Remover produtos nulos (não encontrados)
        const filteredProducts = products.filter((product) => product !== null);

        // Buscar serviços do cliente manualmente
        const customerServices = await CustomerService.find({ customer: customer.sequenceIdCustomer });
        const services = await Promise.all(
            customerServices.map(async (item) => {
                const serviceData = await Service.findOne({ sequenceIdService: item.service });
                if (!serviceData) return null;
                return {
                    _id: serviceData._id,
                    name: serviceData.name,
                    price: serviceData.price,
                    sequenceIdService: serviceData.sequenceIdService,
                    quantity: item.quantity,
                };
            })
        );

        // Remover serviços nulos (não encontrados)
        const filteredServices = services.filter((service) => service !== null);

        // Construir o objeto de resposta
        const responseObject = {
            _id: customer._id,
            name: customer.name,
            socialName: customer.socialName,
            cpf: customer.cpf,
            email: customer.email,
            pets: pets.map((pet) => pet.sequenceIdPet),
            services: filteredServices,
            products: filteredProducts,
            sequenceIdCustomer: customer.sequenceIdCustomer,
        };

        return reply.status(200).send(responseObject);
    } catch (error) {
        console.error(error);

        if (error.name === 'CastError') {
            return reply.status(400).send({ error: "Invalid ID." });
        }

        return reply.status(500).send({ error: "Error trying to get customer by id" });
    }
}

export { GetCustomerByIdController };