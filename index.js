const app = require("express")();
const mysql = require("mysql");
var bodyParser = require('body-parser');
const db = require('./database');


app.use(bodyParser.json());
const { Kafka } = require("kafkajs");
const PORT = 8080;

app.listen(PORT, () => console.log(` it's alive on http://localhost:${PORT}`));

app.post("/tshirt", (req, res) => {

  db.query("INSERT INTO Record(kkey,kval)values("+req.body[0].key+",'"+req.body[0].value+"')", function (err, result, fields) {
    if (err) throw err;
    res.status(200).send("success")
  });

  main(req.body);
 
 
});


// app.post("/tshirt", async (req, res) => {
//   res.json({elements_obj:req.body.rec}); 
// });

const main = async (producer_msg) => {
  const kafka = new Kafka({
    clientId: "my-app1",
    brokers: ["localhost:9092"],
  });

  const producer = kafka.producer();

  await producer.connect();

  // await producer.send({
  //   topic: "test-topic",
  //   messages: [{ key: '1', value: 'roja' }],
  // });

 await producer.send({
    topic: "test-topic",
    messages: producer_msg,
  });

  await producer.disconnect();

  
};













// const app = require("express")();

// const PORT = 8080;

// app.listen(PORT, () => console.log(` it's alive on http://localhost:${PORT}`));

// app.get("/tshirt", (req, res) => {
//   res.status(200).send({
//     tshirt: '0525',
//     size: 'large'
//   })
// });

