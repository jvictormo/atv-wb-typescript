import { FastifyRequest, FastifyReply } from "fastify";
import Customer from "../../models/Customer";

async function GetAllCustomersController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const customers = await Customer.find();

        return reply.status(200).send(customers)
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to get all customer" });
    }
}

export { GetAllCustomersController }