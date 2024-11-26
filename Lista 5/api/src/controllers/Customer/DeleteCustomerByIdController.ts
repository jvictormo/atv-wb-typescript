import { FastifyRequest, FastifyReply } from "fastify";
import Customer from "../../models/Customer";
import Pet from "../../models/Pet";

async function DeleteCustomerById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdCustomer } = request.params as { sequenceIdCustomer: number }

        const customer = await Customer.findOneAndDelete({ sequenceIdCustomer: Number(sequenceIdCustomer) })

        if (!customer) {
            return reply.status(404).send({ error: "Customer not found." });
        }

        await Pet.updateMany(
            { owner: customer.sequenceIdCustomer },
            { $unset: { owner: 0 } }
        );

        return reply.status(200).send({
            message: "Customer successfully deleted",
            customer,
        })
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to delete customer" });
    }
}

export { DeleteCustomerById }