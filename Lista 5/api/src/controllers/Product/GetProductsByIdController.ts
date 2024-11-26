import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";

async function GetProductByIdController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdProduct } = request.params as { sequenceIdProduct: number }

        console.log(sequenceIdProduct)

        const product = await Product.findOne({ sequenceIdProduct: Number(sequenceIdProduct) })

        if (!product) {
            return reply.status(404).send({ error: "Product not found." });
        }

        return reply.status(200).send(product)
    } catch (error) {
        console.log(error)

        if (error.name === 'CastError') {
            return reply.status(400).send({ error: "Invalid ID." });
        }

        return reply.status(500).send({ error: "Error trying to get product by id" });
    }
}

export { GetProductByIdController }