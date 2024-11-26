import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";
import CustomerProduct from "../../models/CustomerProduct";

async function DeleteProductById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdProduct } = request.params as { sequenceIdProduct: number }

        const product = await Product.findOneAndDelete({ sequenceIdProduct: Number(sequenceIdProduct) })

        await CustomerProduct.deleteMany({ product: Number(sequenceIdProduct) })

        if (!product) {
            return reply.status(404).send({ error: "Product not found." });
        }

        return reply.status(200).send({
            message: "Product successfully deleted",
            product,
        })
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to delete product" });
    }
}

export { DeleteProductById }