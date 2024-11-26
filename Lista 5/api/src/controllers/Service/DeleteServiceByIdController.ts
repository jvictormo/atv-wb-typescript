import { FastifyRequest, FastifyReply } from "fastify";
import Service from "../../models/Service";
import CustomerService from "../../models/CustomerService";

async function DeleteServiceById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdService } = request.params as { sequenceIdService: number }

        const service = await Service.findOneAndDelete({ sequenceIdService: Number(sequenceIdService) })

        await CustomerService.deleteMany({ product: Number(sequenceIdService) })

        if (!service) {
            return reply.status(404).send({ error: "Service not found." });
        }

        return reply.status(200).send({
            message: "Service successfully deleted",
            service,
        })
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to delete service" });
    }
}

export { DeleteServiceById }