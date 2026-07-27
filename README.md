# 🍅 **Tomato - Food Delivery Platform**


A **full-stack food delivery platform** built using a **microservices architecture** that enables customers to order food, restaurants to manage orders, and riders to deliver orders in real-time.

Developed using **React**, **Node.js**, **Express.js**, **TypeScript**, **MongoDB**, **RabbitMQ**, and **Socket.IO** — featuring authentication, real-time order tracking, restaurant management, rider operations, and independently deployed backend services.

---

## 🚀 **Features**

- 🔐 **Authentication System** (JWT + Google OAuth)
- 👤 **Role-Based Access Control** (Customer, Restaurant, Rider, Admin)
- 🍽️ **Restaurant Management** (Create restaurants, manage menus, process orders)
- 🛒 **Food Ordering System** with complete order lifecycle management
- 🚴 **Rider Management** (Online/offline availability, location tracking, delivery handling)
- 📍 **Real-Time Order Tracking** using Socket.IO
- 🔔 **Event-Driven Communication** using RabbitMQ
- 🖼️ **Image Upload Service** for restaurants and user profiles
- 💳 **Secure Payment Integration** using Stripe
- 📱 **Responsive UI** for seamless user experience

---

# 🛠️ **Tech Stack**

| Layer | Technologies |
|------------|-----------------------------------|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT, Google OAuth |
| **Communication** | RabbitMQ, Socket.IO, REST APIs |
| **Deployment** | Vercel (Frontend) + Render (Backend Microservices) |

---

# 🏗️ **Architecture**

Tomato follows a **microservices architecture**, where each service handles a specific responsibility and communicates independently through APIs and message queues.

```
                         Frontend
                            |
                            |
        ------------------------------------------------
        |          |             |          |           |
      Auth    Restaurant      Rider    Realtime    Admin
    Service    Service       Service    Service    Service

                            |
                            |
                    RabbitMQ Events

                            |
                         MongoDB
```

---

## 🧩 **Backend Services**

### 🔐 Auth Service

Handles:

- User authentication
- JWT token generation
- Google OAuth login
- Role-based authorization


### 🍽️ Restaurant Service

Handles:

- Restaurant registration
- Menu management
- Food items
- Order processing
- Restaurant operations


### 🚴 Rider Service

Handles:

- Rider profile management
- Rider verification
- Online/offline availability
- Location tracking
- Delivery management


### ⚡ Realtime Service

Handles:

- WebSocket connections
- Live order updates
- Real-time communication between users


### 🛠️ Utils Service

Handles:

- Image upload operations
- Shared backend utilities


### 👨‍💼 Admin Service

Handles:

- Administrative operations
- Platform management


---

# ⚙️ **Setup & Installation**

## 🧩 **1️⃣ Clone the Repository**

```bash
git clone <repository-url>

cd tomato-code
```

---

## 🧩 **2️⃣ Install Dependencies**

### Frontend

```bash
cd frontend

npm install
```


### Backend Services

Install dependencies inside every service:

```bash
cd services/<service-name>

npm install
```

---

## 🧩 **3️⃣ Environment Variables**

Create `.env` files inside frontend and each backend service.

Example:

```env
PORT=5000

MONGO_URI=<mongodb_connection_string>

JWT_SECRET=<jwt_secret>

INTERNAL_SERVICE_KEY=<service_key>
```

---

## 🧩 **4️⃣ Start RabbitMQ**

Run RabbitMQ using Docker:

```bash
docker run -d \
--hostname tomato-rabbit \
--name tomato-rabbitmq \
-p 5672:5672 \
-p 15672:15672 \
-e RABBITMQ_DEFAULT_USER=admin \
-e RABBITMQ_DEFAULT_PASS=admin123 \
rabbitmq:3-management
```

---

## 🧩 **5️⃣ Run Application**

Start backend services:

```bash
npm run dev
```

Start frontend:

```bash
cd frontend

npm run dev
```

---

# 🌍 **Live Demo**

## 🌐 Frontend

🔗 **Customer Application**

https://tomato-rouge-ten.vercel.app/


---

## 🔗 Backend Services

| Service | URL |
|------------|--------------------------------|
| 🔐 Auth Service | https://tomato-auth-j7zx.onrender.com |
| 🍽️ Restaurant Service | https://tomato-restaurant-j4xd.onrender.com |
| 🚴 Rider Service | https://tomato-rider-tzbj.onrender.com |
| ⚡ Realtime Service | https://tomato-realtime-30cm.onrender.com |
| 🛠️ Utils Service | https://tomato-utils-bkzt.onrender.com |
| 👨‍💼 Admin Service | https://tomato-admin-lq7h.onrender.com |

---

# 📸 **Preview**

_Coming soon: Screenshots of Customer Application, Restaurant Dashboard, Rider Panel, Admin Dashboard, and Real-Time Order Tracking._

---

# 🤝 **Contributing**

Contributions are always welcome!

If you want to improve this project:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

# 🧑‍💻 **Developer**

- 👤 **Sheetal Sharma**
- 📧 [sheetalsharmaoct2003@gmail.com](mailto:sheetalsharmaoct2003@gmail.com)
- 🌐 [GitHub Profile](https://github.com/Sheetal-x-Sharma)

---

## ⭐ Support

If you like this project, please consider giving it a **⭐ Star** on GitHub — it helps others discover the project!

---

## 🏷️ Keywords

`React` • `Node.js` • `Express.js` • `TypeScript` • `MongoDB` • `Microservices` • `RabbitMQ` • `Socket.IO` • `JWT` • `Google OAuth` • `Stripe` • `Food Delivery App` • `Full Stack Development` • `Real-Time Application`
