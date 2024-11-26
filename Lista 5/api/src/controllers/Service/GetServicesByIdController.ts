import { FastifyRequest, FastifyReply } from "fastify";
import Service from "../../models/Service";

async function GetServiceByIdController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdService } = request.params as { sequenceIdService: number }

        const service = await Service.findOne({ sequenceIdService: Number(sequenceIdService) })

        if (!service) {
            return reply.status(404).send({ error: "Service not found." });
        }

        return reply.status(200).send(service)
    } catch (error) {
        console.log(error)

        if (error.name === 'CastError') {
            return reply.status(400).send({ error: "Invalid ID." });
        }

        return reply.status(500).send({ error: "Error trying to get service by id" });
    }
}

export { GetServiceByIdController }