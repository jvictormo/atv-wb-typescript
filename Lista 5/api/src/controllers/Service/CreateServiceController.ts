import { FastifyRequest, FastifyReply } from "fastify";
import Service from "../../models/Service";

async function CreateServiceController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { name, price } = request.body as { name: string, price: Float32Array };

        if (!name || !price) {
            return reply.status(400).send({ error: "Fill all the camps." });
        }

        const service = await Service.create({ name, price });

        return reply.status(201).send({
            message: "Service successfully created",
            service,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to create service" });
    }
}

export { CreateServiceController }