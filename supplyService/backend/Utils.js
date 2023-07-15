const amqp = require('amqplib')

const connectToRabbitMQ = async () => {
    try {
      const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        console.log('Connected to RabbitMQ')
      return channel;
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
      throw error;
    }
};
  

module.exports = {
    connectToRabbitMQ
}