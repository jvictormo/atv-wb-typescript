import { FastifyRequest, FastifyReply } from "fastify";
import Pet from "../../models/Pet";

async function GetPetByIdController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdPet } = request.params as { sequenceIdPet: number }

        const pet = await Pet.findOne({ sequenceIdPet: Number(sequenceIdPet) })

        if (!pet) {
            return reply.status(404).send({ error: "Pet not found." });
        }

        return reply.status(200).send(pet)
    } catch (error) {
        console.log(error)

        if (error.name === 'CastError') {
            return reply.status(400).send({ error: "Invalid ID." });
        }

        return reply.status(500).send({ error: "Error trying to get pet by id" });
    }
}

export { GetPetByIdController }