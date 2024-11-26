import { FastifyRequest, FastifyReply } from "fastify";
import Pet from "../../models/Pet";

async function GetAllPetsController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const pets = await Pet.find();

        return reply.status(200).send(pets)
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to get all pets" });
    }
}

export { GetAllPetsController }