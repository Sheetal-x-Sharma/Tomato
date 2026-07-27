# 🍅 **Tomato - Food Delivery Platform**


A **full-stack food delivery platform** built using a **microservices architecture** that enables customers to order food, restaurants to manage orders, and riders to deliver orders in real-time.

Developed using **React**, **Node.js**, **Express.js**, **MongoDB**, **RabbitMQ**, and **Socket.IO** — featuring authentication, real-time tracking, order management, and independent backend services.

---

## 🚀 **Features**

- 🔐 **Authentication System** (JWT + Google OAuth)
- 👤 **Role-Based Access Control** (Customer, Restaurant, Rider)
- 🍽️ **Restaurant Management** (Create restaurants, manage menus)
- 🛒 **Food Ordering System** with complete order lifecycle
- 🚴 **Rider Management** (Online/offline availability, delivery handling)
- 📍 **Real-Time Order Tracking** using Socket.IO
- 🔔 **Event Driven Communication** using RabbitMQ
- 🖼️ **Image Upload Service** for restaurants and profiles
- 💳 **Secure Payment Integration**
- 📱 **Responsive UI** for seamless user experience

---

## 🛠️ **Tech Stack**

| Layer | Technologies |
|------------|-----------------------------------|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB, Mongoose |
| **Communication** | RabbitMQ, Socket.IO, REST APIs |
| **Authentication** | JWT, Google OAuth |
| **Deployment** | Vercel (Frontend) + Cloud Deployment (Backend Services) |

---

## 🏗️ **Architecture**

Tomato follows a **microservices architecture** where different services handle independent responsibilities.

```
                    Frontend
                       |
                       |
        --------------------------------
        |        |        |        |
      Auth   Restaurant Rider  Realtime
     Service  Service  Service  Service

                       |
                 MongoDB + RabbitMQ
```

### Services:

- 🔐 **Auth Service**  
  Handles authentication, authorization, and user management.

- 🍽️ **Restaurant Service**  
  Manages restaurants, menus, and order processing.

- 🚴 **Rider Service**  
  Handles rider profiles, availability, location, and delivery updates.

- ⚡ **Realtime Service**  
  Provides live order updates and communication.

- 🛠️ **Utils Service**  
  Handles common utilities like image uploads.

---

## ⚙️ **Setup & Installation**

### 🧩 **1️⃣ Clone the Repository**

```bash
git clone <repository-url>

cd tomato-code
```

---

### 🧩 **2️⃣ Install Dependencies**

**Frontend**

```bash
cd frontend

npm install
```

**Backend Services**

```bash
cd services/<service-name>

npm install
```

---

### 🧩 **3️⃣ Environment Variables**

Create `.env` files inside frontend and every backend service.

Example:

```env
PORT=5000

MONGO_URI=<mongodb_connection_string>

JWT_SECRET=<jwt_secret>

INTERNAL_SERVICE_KEY=<service_key>
```

---

### 🧩 **4️⃣ Start RabbitMQ**

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

### 🧩 **5️⃣ Run Application**

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

## 🌍 **Live Demo**

🔗 **Frontend:**  
https://tomato-rouge-ten.vercel.app/

---

## 📸 **Preview**

_Coming soon: Screenshots of Customer App, Restaurant Dashboard, Rider Panel, and Order Tracking._

---

## 🤝 **Contributing**

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

## 🧑‍💻 **Developer**

- 👤 **Sheetal Sharma**
- 📧 [sheetalsharmaoct2003@gmail.com](mailto:sheetalsharmaoct2003@gmail.com)
- 🌐 [GitHub Profile](https://github.com/Sheetal-x-Sharma)

---

### ⭐ Support

If you like this project, please **⭐ Star the repository** — it helps others discover the project!

---

### 🏷️ Keywords

`React` • `Node.js` • `Express.js` • `MongoDB` • `Microservices` • `RabbitMQ` • `Socket.IO` • `JWT` • `Food Delivery` • `Full Stack` • `Real-Time Application`
