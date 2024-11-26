import { FastifyRequest, FastifyReply } from "fastify";
import Customer from "../../models/Customer";

async function CreateCustomerController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { name, socialName, cpf, email } = request.body as { name: string, socialName: string, cpf: string, email: string };

        if (!name || !socialName || !cpf || !email) {
            return reply.status(400).send({ error: "Fill all the camps." });
        }

        const existingCustomer = await Customer.findOne({ cpf });
        if (existingCustomer) {
            return reply.status(409).send({ error: "CPF already registered." });
        }

        const existingEmail = await Customer.findOne({ email });
        if (existingEmail) {
            return reply.status(409).send({ error: "Email already registered." });
        }

        const customer = await Customer.create({ name, socialName, cpf, email });

        return reply.status(201).send({
            message: "Customer successfully created",
            customer,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to create customer" });
    }
}

export { CreateCustomerController }