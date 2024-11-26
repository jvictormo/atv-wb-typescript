import { FastifyRequest, FastifyReply } from "fastify";
import Service from "../../models/Service";

async function UpdateServiceById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdService } = request.params as { sequenceIdService: number }
        const { name, price } = request.body as { name: string, price: Float32Array }

        if (!name || !price) {
            return reply.status(400).send({ error: "Fill all the camps." });
        }

        const service = await Service.findOneAndUpdate({ sequenceIdService: Number(sequenceIdService) }, { name, price }, { new: true })

        if (!service) {
            return reply.status(404).send({ error: "Service not found." });
        }

        return reply.status(200).send({
            message: "Service successfully updated",
            service,
        })
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to update service" });
    }
}

export { UpdateServiceById }