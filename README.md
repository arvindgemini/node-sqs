# README

Steps to run poc:-

  - Follow https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-setting-up.html to setup SQS on AWS console. 
  - Follow https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-getting-started.html to create and configure queue.
  - Setup AWS Cli in your system. Follow https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html.
  - Run `aws configure` in your terminal to configure aws cli. It will prompt to fill in your Access Key ID, Secret Access Key, and default regions and output formats. Last two are optional.
  - Update region and queueUrl with yours in `orders/index.js` and `worker/index.js`.
  - Run below command to exponse endpoint to receive data through API.  
     ```sh
        $ npm install 
        $ node start
    ```
  - Post data to endpoint through CURL. You will see that data is submitted to queue and received in worker to process.
      ```sh
      curl -X POST http://localhost:8081/order -H 'content-type: application/json' -d '{ "itemName": "Phone", "itemPrice": "300", "userEmail": "test@email.com", "itemsQuantity": "5}'
      ```
