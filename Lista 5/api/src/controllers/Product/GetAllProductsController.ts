import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";

async function GetAllProductsController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const products = await Product.find();

        return reply.status(200).send(products)
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to get all products" });
    }
}

export { GetAllProductsController }