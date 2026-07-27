# 🍅 Tomato - Food Delivery Platform

A full-stack food delivery application built with a **microservices architecture**, enabling customers to order food, restaurants to manage orders, and riders to deliver orders in real-time.

🌐 **Live Demo:**  
https://tomato-rouge-ten.vercel.app/

---

## 📌 Overview

Tomato is a scalable food delivery platform inspired by modern delivery applications. The system is designed using independent backend services communicating with each other, providing better scalability, maintainability, and separation of concerns.

The platform supports:

- 👤 User authentication
- 🍽️ Restaurant management
- 🛒 Food ordering
- 🚴 Rider management
- 📍 Real-time order tracking
- 🔔 Event-driven communication
- 💳 Online payments
- 📦 Order lifecycle management

---

# ✨ Features

## Customer Features

- User registration and authentication
- Google OAuth login
- Browse restaurants
- View food items
- Add items to cart
- Place orders
- Track order status
- View order history


## Restaurant Features

- Restaurant onboarding
- Manage food items
- Update menu
- Receive incoming orders
- Accept/reject orders
- Update order preparation status


## Rider Features

- Rider profile creation
- Document verification
- Go online/offline
- Real-time availability tracking
- Accept delivery requests
- Update delivery status


## Real-Time Features

- Live order status updates
- Rider availability tracking
- Real-time communication using WebSockets


---

# 🏗️ System Architecture

Tomato follows a **microservices architecture**.

                Client Applications
                        |
                        |
                API Requests
                        |
    -----------------------------------------
    |                                       |
Frontend                              Backend Services
    |                                       |
    |

| | | | |
Auth Restaurant Rider Realtime Utils
Service Service Service Service Service

    |
    |

MongoDB + RabbitMQ


---

# 🧩 Microservices

## 🔐 Auth Service

Responsible for:

- User authentication
- JWT token management
- Google OAuth authentication
- User roles management


## 🍽️ Restaurant Service

Responsible for:

- Restaurant profiles
- Food menu management
- Order creation
- Order processing


## 🚴 Rider Service

Responsible for:

- Rider profiles
- Availability management
- Rider location tracking
- Delivery assignment


## ⚡ Realtime Service

Responsible for:

- WebSocket communication
- Live updates
- Event broadcasting


## 🛠️ Utils Service

Responsible for:

- Image upload handling
- Common utilities


---

# 🛠️ Tech Stack

## Frontend

- React.js
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Socket.IO Client


## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO


## Communication

- RabbitMQ
- REST APIs
- WebSockets


## Deployment

- Vercel (Frontend)
- Cloud deployment for backend services


---

# 📂 Project Structure


tomato-code
│
├── frontend
│ ├── src
│ ├── components
│ ├── pages
│ └── services
│
├── services
│
│ ├── auth
│ │ ├── controllers
│ │ ├── models
│ │ └── routes
│
│ ├── restaurant
│ │ ├── controllers
│ │ ├── models
│ │ └── routes
│
│ ├── rider
│ │ ├── controllers
│ │ ├── models
│ │ └── routes
│
│ ├── realtime
│ │ └── websocket handlers
│
│ └── utils
│ └── common services
│
└── README.md


---

# 🔄 Order Flow


Customer
|
|
Creates Order
|
|
Restaurant Service
|
|
Restaurant Accepts Order
|
|
RabbitMQ Event
|
|
Available Riders Notified
|
|
Rider Accepts Delivery
|
|
Customer Receives Live Updates


---

# 🚀 Running Locally

## Prerequisites

Install:

- Node.js >= 20
- MongoDB
- Docker
- RabbitMQ


---

## Clone Repository

```bash
git clone <repository-url>

cd tomato-code
Install Dependencies

Frontend:

cd frontend
npm install

Backend services:

cd services/<service-name>
npm install
Environment Variables

Each service requires its own .env file.

Example:

PORT=5000

MONGO_URI=<mongodb_connection_string>

JWT_SECRET=<jwt_secret>

INTERNAL_SERVICE_KEY=<service_key>
Running Services

Start RabbitMQ:

docker run -d \
--hostname tomato-rabbit \
--name tomato-rabbitmq \
-p 5672:5672 \
-p 15672:15672 \
-e RABBITMQ_DEFAULT_USER=admin \
-e RABBITMQ_DEFAULT_PASS=admin123 \
rabbitmq:3-management

Start backend services:

npm run dev

Start frontend:

cd frontend

npm run dev
🔒 Security

Implemented:

JWT based authentication
Role based authorization
Protected APIs
Internal service authentication
Secure environment variables
📈 Future Improvements
Recommendation system
Advanced analytics dashboard
Cloud storage integration
Better notification system
Kubernetes deployment
CI/CD pipeline
Automated testing
👨‍💻 Author

Sheetal Sharma

Computer Science Engineer
LNMIIT

⭐ If you like this project, consider giving it a star!


This README will present it more like a **real SDE project** rather than a college project. It highlights the things recruiters care about: **architecture, scalability, microservices, event-driven design, and deployment.**
