import { FastifyRequest, FastifyReply } from "fastify";
import Pet from "../../models/Pet";
import Customer from "../../models/Customer";

async function CreatePetController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { name, breed, gender, petType, owner } = request.body as { name: string, breed: string, gender: string, petType: string, owner: number };

        if (!name || !breed || !gender || !petType) {
            return reply.status(400).send({ error: "Fill all the camps." });
        }

        let customer;

        if (owner) {
            customer = await Customer.findOne({ sequenceIdCustomer: Number(owner) })
            if (!customer) {
                return reply.status(404).send({ error: "Customer not found." });
            }

        }

        const pet = await Pet.create({ name, breed, gender, petType, owner });

        if (customer) {
            customer.pets.push(pet.sequenceIdPet);
            await customer.save();
        }

        return reply.status(201).send({
            message: "Pet successfully created",
            pet,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to create pet" });
    }
}

export { CreatePetController }