import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";

async function UpdateProductById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdProduct } = request.params as { sequenceIdProduct: number }
        const { name, price } = request.body as { name: string, price: Float32Array }

        if (!name || !price) {
            return reply.status(400).send({ error: "Fill all the camps." });
        }

        const product = await Product.findOneAndUpdate({ sequenceIdProduct: Number(sequenceIdProduct) }, { name, price }, { new: true })

        if (!product) {
            return reply.status(404).send({ error: "Product not found." });
        }

        return reply.status(200).send({
            message: "Product successfully updated",
            product,
        })
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to update product" });
    }
}

export { UpdateProductById }