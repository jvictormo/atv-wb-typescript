import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";

async function CreateProductController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { name, price } = request.body as { name: string, price: Float32Array };

        if (!name || !price) {
            return reply.status(400).send({ error: "Fill all the camps." });
        }

        const product = await Product.create({ name, price });

        return reply.status(201).send({
            message: "Product successfully created",
            product,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to create product" });
    }
}

export { CreateProductController }