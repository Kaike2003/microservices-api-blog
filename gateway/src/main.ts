import { ExpressApi } from "./infra/api/express/express.api";

const main = async () => {
  const express = ExpressApi.create();
  express.listen(80);
};

main();
