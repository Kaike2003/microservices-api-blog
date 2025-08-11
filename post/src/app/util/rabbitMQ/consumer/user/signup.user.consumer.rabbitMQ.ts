import amqp from "amqplib";
import { UserPrismaRepository } from "../../../../infra/api/repository/prisma/user/user.prisma.repository";
import { prisma } from "../../../prisma/prisma";

const exchange = "signup_exchange"; // mesmo nome
const queue = "signup_queue_post"; // fila exclusiva

export const consumerSignupMessages = async () => {
    try {
        const conn = await amqp.connect("amqp://guest:guest@localhost");
        const channel = await conn.createChannel();

        await channel.assertExchange(exchange, "fanout", { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, "");

        channel.prefetch(1);

        console.log(`👂 POST aguardando mensagens na fila: ${queue}`);

        channel.consume(queue, async (msg) => {
            if (!msg) return;
            try {
                const data = JSON.parse(msg.content.toString());
                console.log("📥 POST recebeu:", data);
                await UserPrismaRepository.create(prisma).signup(data);
                channel.ack(msg);
            } catch (e) {
                console.error("❌ Erro no POST:", e);
                channel.nack(msg, false, true);
            }
        });
    } catch (err) {
        console.error("❌ Erro no POST consumidor:", err);
    }
};
