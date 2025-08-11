import { ExpressApi } from "./app/infra/api/express/express.api";
import { consumerSignupMessages } from "./app/util/rabbitMq/consumer/signup/signup.rabbitMq";

const main = async () => {
  const express = ExpressApi.create();
  express.listen(82);
  await consumerSignupMessages();
};

main();
