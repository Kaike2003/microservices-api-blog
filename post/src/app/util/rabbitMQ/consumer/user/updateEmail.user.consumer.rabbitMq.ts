import amqp from "amqplib";
import { UserPrismaRepository } from "../../../../infra/api/repository/prisma/user/user.prisma.repository"
import { prisma } from "../../../prisma/prisma"

const exchange = "update_email_exchange"; // nome diferente de fila para evitar confusão
const queue = "update_email_queue_post";


export const consumerUpdateEmailMessages = async () => {
    try {
        const conn = await amqp.connect("amqp://guest:guest@localhost");
        const channel = await conn.createChannel();

        // Garantir que exchange e fila existam e estejam ligadas
        await channel.assertExchange(exchange, "fanout", { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, "");

        // Prefetch = processar uma por vez (evita sobrecarga)
        channel.prefetch(1);

        console.log(`👂 Aguardando mensagens na fila persistente: ${queue}`);

        channel.consume(queue, async (msg) => {
            if (!msg) return;

            try {
                const data = JSON.parse(msg.content.toString());
                console.log("📥 Recebido:", data);
                UserPrismaRepository.create(prisma).updateEmail(data)
                channel.ack(msg);
            } catch (e) {
                console.error("❌ Erro ao processar mensagem:", e);
                channel.nack(msg, false, true); // requeue em caso de erro
            }
        });
    } catch (err) {
        console.error("❌ Erro no consumidor:", err);
    }
};
