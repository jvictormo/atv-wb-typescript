import { FastifyRequest, FastifyReply } from "fastify";
import Pet from "../../models/Pet";
import Customer from "../../models/Customer";

async function UpdatePetById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdPet } = request.params as { sequenceIdPet: number }
        const { name, breed, gender, petType, owner } = request.body as { sequenceIdPet: number, breed: string, name: string, gender: string, petType: string, owner: number }

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

        const pet = await Pet.findOneAndUpdate({ sequenceIdPet: Number(sequenceIdPet) }, { name, breed, gender, petType, owner }, { new: true })

        if (!pet) {
            return reply.status(404).send({ error: "Pet not found." });
        }

        if (customer) {
            customer.pets.push(pet.sequenceIdPet);
            await customer.save();
        }

        return reply.status(200).send({
            message: "Pet successfully updated",
            pet,
        })
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to update pet" });
    }
}

export { UpdatePetById }