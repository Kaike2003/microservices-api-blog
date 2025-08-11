import amqp from "amqplib";

const exchange = "signup_exchange";

export const publisherSignupRabbitMq = async (data: any) => {
  try {
    const conn = await amqp.connect("amqp://guest:guest@localhost");
    const channel = await conn.createChannel();

    // Garantir que a exchange exista (obrigatório antes de publicar)
    await channel.assertExchange(exchange, "fanout", {
      durable: true,
    });

    // Converter o dado para string, se necessário
    const payload = typeof data === "string" ? data : JSON.stringify(data);

    // Publicar mensagem na exchange
    channel.publish(exchange, "", Buffer.from(payload));
    console.log("Mensagem publicada:", payload);

    // Opcional: fechar conexão depois de publicar
    // await channel.close();
    // await conn.close();
  } catch (err) {
    console.error("Erro ao publicar no RabbitMQ:", err);
  }
};
