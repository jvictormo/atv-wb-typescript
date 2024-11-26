import { FastifyRequest, FastifyReply } from "fastify";
import Service from "../../models/Service";

async function GetAllServiceController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const services = await Service.find();

        return reply.status(200).send(services)
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to get all services" });
    }
}

export { GetAllServiceController }