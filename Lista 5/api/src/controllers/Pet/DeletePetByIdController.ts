import { FastifyRequest, FastifyReply } from "fastify";
import Pet from "../../models/Pet";
import Customer from "../../models/Customer";

async function DeletePetById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdPet } = request.params as { sequenceIdPet: number }

        const pet = await Pet.findOneAndDelete({ sequenceIdPet: Number(sequenceIdPet) })

        if (!pet) {
            return reply.status(404).send({ error: "Pet not found." });
        }

        await Customer.updateMany(
            { pets: pet.sequenceIdPet },
            { $pull: { pets: pet.sequenceIdPet } }
        );

        return reply.status(200).send({
            message: "Pet successfully deleted",
            pet,
        })
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to delete pet" });
    }
}

export { DeletePetById }