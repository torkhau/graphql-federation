# GraphQL Federation

This repository is a practical proof-of-concept demonstrating how to migrate a monolithic BFF into a modern federated GraphQL architecture using **Apollo Server**, **Apollo Gateway**, and **TypeScript**.

## Architecture Overview
The system consists of three main parts located in the `services/` directory:
1. **Gateway** (`/services/gateway`): The single entry point for the client. It composes the subgraphs into a single schema and routes requests.
2. **Books Subgraph** (`/services/subgraph-books`): A microservice responsible for book data. Defines the base `@key` for the `Book` entity.
3. **Reviews Subgraph** (`/services/subgraph-reviews`): A microservice responsible for ratings and comments. It extends (`@extends`) the `Book` entity from the books service.

## Tech Stack
- Node.js
- TypeScript & `tsx`
- Apollo Server
- Apollo Gateway (Federation)

## How to Run
From the root directory, simply run:
```bash
npm install
npm start
