import { FastifyRequest, FastifyReply } from "fastify";
import Customer from "../../models/Customer";
import Pet from "../../models/Pet";
import Product from "../../models/Product";
import Service from "../../models/Service";
import CustomerProduct from "../../models/CustomerProduct";
import CustomerService from "../../models/CustomerService";

async function UpdateCustomerById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdCustomer } = request.params as { sequenceIdCustomer: number };
        const { name, socialName, cpf, email, pets, products, services } = request.body as {
            name: string;
            socialName: string;
            cpf: string;
            email: string;
            pets: number[];
            products: { sequenceIdProduct: number; quantity: number }[];
            services: { sequenceIdService: number; quantity: number }[];
        };

        if (!name || !socialName || !cpf || !email) {
            return reply.status(400).send({ error: "Fill all the fields." });
        }

        // Verificar se o CPF ou e-mail já está em uso
        const existingCustomer = await Customer.findOne({ cpf, sequenceIdCustomer: { $ne: sequenceIdCustomer } });
        if (existingCustomer) {
            return reply.status(409).send({ error: "CPF already registered." });
        }

        const existingEmail = await Customer.findOne({ email, sequenceIdCustomer: { $ne: sequenceIdCustomer } });
        if (existingEmail) {
            return reply.status(409).send({ error: "Email already registered." });
        }

        const findedCustomer = await Customer.findOne({ sequenceIdCustomer })

        const oldPets = findedCustomer.pets || [];

        const petsRemoved = oldPets.filter(oldPet => !pets.includes(oldPet));

        await Promise.all(
            petsRemoved.map((pet) => Pet.findOneAndUpdate({ sequenceIdPet: pet }, { owner: null }))
        );

        // Atualizar Produtos
        const oldProducts = await CustomerProduct.find({ customer: sequenceIdCustomer });
        const oldProductIds = oldProducts.map((p) => p.product);

        // Identificar produtos removidos
        const productsRemoved = oldProductIds.filter(
            (oldProductId) => !products.some((p) => p.sequenceIdProduct != oldProductId)
        );

        // Remover relações de produtos antigos
        await CustomerProduct.deleteMany({
            customer: sequenceIdCustomer,
            product: { $in: productsRemoved },
        });

        // Atualizar ou criar produtos novos
        await Promise.all(
            products.map(async (product) => {
                const productData = await Product.findOne({ sequenceIdProduct: Number(product.sequenceIdProduct) });
                if (!productData) {
                    throw new Error(`Product with ID ${product.sequenceIdProduct} not found`);
                }

                const existingEntry = await CustomerProduct.findOne({
                    customer: sequenceIdCustomer,
                    product: productData.sequenceIdProduct,
                });

                if (existingEntry) {
                    // Atualizar quantidade e total
                    existingEntry.quantity = product.quantity;
                    existingEntry.total = product.quantity * productData.price;
                    await existingEntry.save();
                } else {
                    // Criar nova entrada
                    const total = productData.price * product.quantity;
                    await CustomerProduct.create({
                        customer: sequenceIdCustomer,
                        product: productData.sequenceIdProduct,
                        quantity: product.quantity,
                        name: productData.name,
                        price: productData.price,
                        total,
                    });
                }
            })
        );

        // Atualizar Serviços
        const oldServices = await CustomerService.find({ customer: sequenceIdCustomer });
        const oldServiceIds = oldServices.map((s) => s.service);

        // Identificar serviços removidos
        const servicesRemoved = oldServiceIds.filter(
            (oldServiceId) => !services.some((s) => s.sequenceIdService != oldServiceId)
        );

        console.log(servicesRemoved, sequenceIdCustomer)
        // Remover relações de serviços antigos
        await CustomerService.deleteMany({
            customer: sequenceIdCustomer,
            service: { $in: servicesRemoved },
        });

        // Atualizar ou criar serviços novos
        await Promise.all(
            services.map(async (service) => {
                const serviceData = await Service.findOne({ sequenceIdService: Number(service.sequenceIdService) });
                if (!serviceData) {
                    throw new Error(`Service with ID ${service.sequenceIdService} not found`);
                }

                const existingEntry = await CustomerService.findOne({
                    customer: sequenceIdCustomer,
                    service: serviceData.sequenceIdService,
                });

                if (existingEntry) {
                    // Atualizar quantidade e total
                    existingEntry.quantity = service.quantity;
                    existingEntry.total = service.quantity * serviceData.price;
                    await existingEntry.save();
                } else {
                    // Criar nova entrada
                    const total = serviceData.price * service.quantity;
                    await CustomerService.create({
                        customer: sequenceIdCustomer,
                        service: serviceData.sequenceIdService,
                        quantity: service.quantity,
                        name: serviceData.name,
                        price: serviceData.price,
                        total,
                    });
                }
            })
        );


        // Atualizar o cliente
        const customer = await Customer.findOneAndUpdate(
            { sequenceIdCustomer },
            { name, socialName, cpf, email, pets, services, products },
            { new: true }
        );

        if (!customer) {
            return reply.status(404).send({ error: "Customer not found." });
        }

        // Atualizar Pets
        if (pets && pets.length > 0) {
            await Promise.all(
                pets.map((petId) =>
                    Pet.findOneAndUpdate({ sequenceIdPet: petId }, { owner: sequenceIdCustomer })
                )
            );
        }

        // Atualizar Produtos
        if (products && products.length > 0) {
            await Promise.all(
                products.map(async (product) => {
                    const productData = await Product.findOne({ sequenceIdProduct: Number(product.sequenceIdProduct) });
                    if (!productData) {
                        throw new Error(`Product with ID ${product.sequenceIdProduct} not found`);
                    }

                    const existingEntry = await CustomerProduct.findOne({
                        customer: customer.sequenceIdCustomer,
                        product: productData.sequenceIdProduct,
                    });

                    if (existingEntry) {
                        // Atualizar quantidade e total
                        existingEntry.quantity = product.quantity;
                        existingEntry.total = product.quantity * productData.price;
                        await existingEntry.save();
                    } else {
                        // Criar nova entrada
                        const total = productData.price * product.quantity;
                        await CustomerProduct.create({
                            customer: customer.sequenceIdCustomer,
                            product: productData.sequenceIdProduct,
                            quantity: product.quantity,
                            name: productData.name,
                            price: productData.price,
                            total,
                        });
                    }
                })
            );
        }

        // Atualizar Serviços
        if (services && services.length > 0) {
            await Promise.all(
                services.map(async (service) => {
                    const serviceData = await Service.findOne({ sequenceIdService: Number(service.sequenceIdService) });
                    if (!serviceData) {
                        throw new Error(`Service with ID ${service.sequenceIdService} not found`);
                    }

                    const existingEntry = await CustomerService.findOne({
                        customer: customer.sequenceIdCustomer,
                        service: serviceData.sequenceIdService,
                    });

                    if (existingEntry) {
                        // Atualizar quantidade e total
                        existingEntry.quantity = service.quantity;
                        existingEntry.total = service.quantity * serviceData.price;
                        await existingEntry.save();
                    } else {
                        // Criar nova entrada
                        const total = serviceData.price * service.quantity;
                        await CustomerService.create({
                            customer: customer.sequenceIdCustomer,
                            service: serviceData.sequenceIdService,
                            quantity: service.quantity,
                            name: serviceData.name,
                            price: serviceData.price,
                            total,
                        });
                    }
                })
            );
        }

        return reply.status(200).send({
            message: "Customer successfully updated",
            customer,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to update customer" });
    }
}

export { UpdateCustomerById };
