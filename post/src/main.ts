import { ExpressApi } from "./app/infra/api/express/express.api"
import { consumerSignupMessages } from "./app/util/rabbitMQ/consumer/user/signup.user.consumer.rabbitMQ"
import { consumerUpdateEmailMessages } from "./app/util/rabbitMQ/consumer/user/updateEmail.user.consumer.rabbitMq"
import { consumerUpdatePasswordMessages } from "./app/util/rabbitMQ/consumer/user/updatePassword.user.consumer.rabbitMQ"


const run = async () => {
    const express = ExpressApi.create()
    express.listen(83)
    consumerSignupMessages()
    consumerUpdateEmailMessages()
    consumerUpdatePasswordMessages()
}

run()