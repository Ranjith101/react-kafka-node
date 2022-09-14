const { Kafka } = require("kafkajs");

const mainc = async () => {
  const kafka = new Kafka({
    clientId: "my-app1",
    brokers: ["localhost:9092"],
  });

  const consumer = kafka.consumer({ groupId: "test-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        key: message.key.toString(),value: message.value.toString(),
      });
    },
  });
};

mainc();
