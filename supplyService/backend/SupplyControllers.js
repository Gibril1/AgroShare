const asyncHandler = require('express-async-handler');
const Supply = require('./SupplyModel');
const { connectToRabbitMQ } = require('./Utils');

const createSupplyRequest = asyncHandler(async (req, res) => {
  try {
    const { product, quantity, supplier } = req.body;

    if (!product || !quantity || !supplier) {
      res.status(400);
      throw new Error('Please enter all fields');
    }

    const channel = await connectToRabbitMQ();
    const queue = 'checkIfUserExists';
    const response = 'responseQueue';

    const message = {
      supplier
    };

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    
    const supplyPromise = new Promise((resolve, reject) => {
      channel.consume(response, async (message) => {
        if (message !== null) {
          const { data } = JSON.parse(message.content.toString());

          if (data && data == 'Incorrect User Code') {
            res.status(404);
            res.json({
              message: 'Incorrect User Code'
            });
            return;
          }

          // create the supply request
          const supply = await Supply.create({
            requestFrom: req.user.id,
            requestTo: data,
            product,
            quantity,
            status: 'Pending'
          });
          resolve(supply);
        }
      });
    });

    const supply = await supplyPromise;
    res.status(201).json({
      message: 'A supply request has been sent',
      supply
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  createSupplyRequest
};
