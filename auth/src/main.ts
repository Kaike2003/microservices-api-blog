import { ExpressApi } from "./app/infra/express/express.api";
import { consumerUpdateEmailMessages } from "./app/util/rabbitMq/consumer/updateEmail/updateEmail.rabbitMq";
import { consumerUpdatePasswordMessages } from "./app/util/rabbitMq/consumer/updatePassword/updatePassword.rabbitMq";


const main = async () => {
    const express = ExpressApi.create();
    express.listen(81);
    consumerUpdatePasswordMessages()
    consumerUpdateEmailMessages()
}


main()