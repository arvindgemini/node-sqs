const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');
const nodemailer = require('nodemailer');

// Configure the region
AWS.config.update({region: 'ap-south-1'});

const queueUrl = "https://sqs.ap-south-1.amazonaws.com/087563740931/test.fifo";


// Configure Nodemailer to user Gmail
let transport = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 587,
    auth: {
        user: 'test@gmail.com',
        pass: 'Test123'
    }
});

function sendMail(message) {
    let sqsMessage = JSON.parse(message.Body);
    const emailMessage = {
        from: 'sender_email_adress',    // Sender address
        to: sqsMessage.userEmail,     // Recipient address
        subject: 'Order Received | NodeShop',    // Subject line
        html: `<p>Hi ${sqsMessage.userEmail}.</p. <p>Your order of ${sqsMessage.itemsQuantity} ${sqsMessage.itemName} has been received and is being processed.</p> <p> Thank you for shopping with us! </p>` // Plain text body
    };
console.log(emailMessage);
    transport.sendMail(emailMessage, (err, info) => {
        if (err) {
            console.log(`EmailsSvc | ERROR: ${err}`)
        } else {
            console.log(`EmailsSvc | INFO: ${info}`);
        }
    });
}

// Create our consumer
const app = Consumer.create({
    queueUrl: queueUrl,
    handleMessage: async (message) => {
console.log(message);
        sendMail(message);
    },
    sqs: new AWS.SQS()
});

app.on('error', (err) => {
    console.error(err.message);
});

app.on('processing_error', (err) => {
    console.error(err.message);
});

console.log('Emails service is running');
app.start();
