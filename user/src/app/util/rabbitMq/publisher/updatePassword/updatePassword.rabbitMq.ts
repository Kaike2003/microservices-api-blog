import amqp from "amqplib";

const exchange = "update_password_exchange"; // nome diferente de fila para evitar confusão
const queue = "update_password_queue";

export const publihserUpdatePasswordRabbitMq = async (data: any) => {
    try {
        const conn = await amqp.connect("amqp://guest:guest@localhost");
        const channel = await conn.createChannel();

        // Garantir que a exchange e fila existam
        await channel.assertExchange(exchange, "fanout", { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, "");

        const payload = typeof data === "string" ? data : JSON.stringify(data);

        // Publicar mensagem persistente
        channel.publish(exchange, "", Buffer.from(payload), { persistent: true });

        console.log("📤 Mensagem publicada:", payload);

        await channel.close();
        await conn.close();
    } catch (err) {
        console.error("❌ Erro ao publicar no RabbitMQ:", err);
    }
};
