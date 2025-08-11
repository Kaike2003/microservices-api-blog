import amqp from "amqplib";
import { UserPrismaRepository } from "../../../../infra/api/repository/prisma/user/user.prisma.repository";
import { prisma } from "../../../prisma/prisma";

const exchange = "signup_exchange"; // mesmo nome em todos os serviços
const queue = "signup_queue_user"; // fila exclusiva para este serviço

export const consumerSignupMessages = async () => {
  try {
    const conn = await amqp.connect("amqp://guest:guest@localhost");
    const channel = await conn.createChannel();

    await channel.assertExchange(exchange, "fanout", { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, "");

    channel.prefetch(1);

    console.log(`👂 USER aguardando mensagens na fila: ${queue}`);

    channel.consume(queue, async (msg) => {
      if (!msg) return;
      try {
        const data = JSON.parse(msg.content.toString());
        console.log("📥 USER recebeu:", data);
        await UserPrismaRepository.create(prisma).signup(data);
        channel.ack(msg);
      } catch (e) {
        console.error("❌ Erro no USER:", e);
        channel.nack(msg, false, true);
      }
    });
  } catch (err) {
    console.error("❌ Erro no USER consumidor:", err);
  }
};
