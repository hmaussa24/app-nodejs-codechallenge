# Yape Solution Challenge :rocket: :smile:

Don't forget that the proper way to submit your work is to fork the repo and create a PR :wink: ... have fun !!

- [Solution](#problem)
- [Tech Stack](#tech_stack)

# Solution

1. ## Architecture:
   
<img width="1227" alt="Captura de pantalla 2024-05-26 a la(s) 10 52 29 p  m" src="https://github.com/hmaussa24/app-nodejs-codechallenge/assets/60824470/af9d25bc-b5f3-438e-8d3e-1ad1971f416d">

A database is created in PostgreSQL, an application that contains a REST API where transaction creation requests are received and saved in the database with the status "pending" and a "producer" that sends an event to the queue of transactions to be processed. The other part is a microservice called Antifraud that reads the queue of transactions to be processed, processes them, and sends them to the queue of processed transactions with the status "rejected" or "approved" as appropriate. Lastly, we have a consumer that reads the queue of processed transactions and updates the status of the transaction in the database. We also have an endpoint in the API to query transactions by their "id"

# Tech Stack

1. ## NestJS
2. ## PortgreSQL
3. ## Kafka

# Run

1. You just need to navigate to the root directory and run the command ```docker compose up```. This will start the Kafka and PostgreSQL servers, start the API and the Antifraud microservice

## curl´s
1. Create transaction

```
  curl --location 'http://localhost:3000/' \
--header 'Content-Type: application/json' \
--data '{
  "accountExternalIdDebit": "100051" ,
  "accountExternalIdCredit": "100051",
  "tranferTypeId": 1,
  "value": 200,
  "status": "pending"
}'

```

<img width="974" alt="Captura de pantalla 2024-05-26 a la(s) 11 13 28 p  m" src="https://github.com/hmaussa24/app-nodejs-codechallenge/assets/60824470/09e9100b-ac3a-40e3-b8f1-a15f0c3547d4">


2. Get transaction

   
  <img width="918" alt="Captura de pantalla 2024-05-26 a la(s) 11 14 00 p  m" src="https://github.com/hmaussa24/app-nodejs-codechallenge/assets/60824470/c99d2145-0b2c-4bf9-b10c-d6abb790ade7">

```
  
 curl --location --request GET 'http://localhost:3000/1' \
--header 'Content-Type: application/json' \
--data '{
  "accountExternalIdDebit": "100051" ,
  "accountExternalIdCredit": "100051",
  "tranferTypeId": 1,
  "value": 200,
  "status": "pending"
}'
```

# Important
1. Wait for all services to start completely.

<img width="1440" alt="Captura de pantalla 2024-05-26 a la(s) 11 58 13 p  m" src="https://github.com/hmaussa24/app-nodejs-codechallenge/assets/60824470/f5864387-2a9b-407b-8a9f-f822ff5bee6e">

2. Run Prisma migrations after starting the services with ``` npx prisma migrate dev --name init ``` This creates the database and the tables. remember to modify the URL

``` url      = "postgresql://postgres:postgres@localhost:5435/yape_db?schema=public" ```

and then leave it as it was

 ``` url      = "postgresql://postgres:postgres@postgres_db/yape_db?schema=public" ```

    
<img width="1038" alt="Captura de pantalla 2024-05-26 a la(s) 11 59 50 p  m" src="https://github.com/hmaussa24/app-nodejs-codechallenge/assets/60824470/8278b4d9-06f5-43b0-ba64-07033bc56d0f">