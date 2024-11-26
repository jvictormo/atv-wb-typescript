# 🔄 **PetLovers - Frontend and Backend Integration** (Part 4: Lista 4)

This phase focuses on integrating the **frontend** with a **backend REST API**. The backend follows the REST architecture and provides a microservice for managing pet shop and veterinary clinic data. This integration introduces practical experience in communicating between the frontend and backend, completing the foundation for a full-stack application.

---

## 🌟 **Overview**
This phase represents a significant step forward, combining the **frontend** (built with React functional components and hooks) and the **backend** (Spring Boot REST API). While the backend provides endpoints for managing various entities, this version focuses exclusively on implementing the **CRUD functionality for customers** in the frontend.

---
## 🛠️ **Technologies Used**
<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center"> <img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /> <img src="https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black" alt="React" /> <img src="https://img.shields.io/badge/Hooks-%2300D084.svg?style=for-the-badge&logo=react&logoColor=white" alt="React Hooks" /> <img src="https://img.shields.io/badge/Bootstrap-%237952B3.svg?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" /> <img src="https://img.shields.io/badge/Java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white" alt="Java" /> <img src="https://img.shields.io/badge/SpringBoot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white" alt="SpringBoot" /> </div>

---

## 📂 **Project Structure**
The folder `Lista 4` contains:
- A frontend adapted from **Lista 3** to integrate with the backend.
- A backend built using Spring Boot, enhanced with a CPF field for customer management.
- Communication between frontend and backend via HTTP requests, limited to customer CRUD operations.

| **Part** | **Folder Name**          | **Description**                                                                 |
|----------|-------------------------|---------------------------------------------------------------------------------|
| 4️⃣      | `Lista 4`               | Integrates a REST API (Spring Boot) with the frontend (React functional components). |

---

## 💻 **How to Run**

To execute this part of the project, follow these steps:

1. **Download and install Node.js and Java**:
- Node.js official site: [Node](https://nodejs.org/)
- Java official site: [Java](https://www.java.com/)


2. **Navigate to the Project Directory**:
   ```bash
   cd '.\Lista 4\'
   ```

3. **Open the terminal and execute the `pl.jar` File**:
   ```bash
   cd .\executavel\

   java -jar pl.jar
   ```
   Now the server is running in: `http://localhost:32831`

4. **Navigate to the Frontend Directory in your IDE**:
   ```bash
   cd .\frontend\
   ```

5. **Install the dependencies**:
   ```bash
   npm install
   ```

6. **Run the Frontend**:
   ```bash
   npm start
   ```

7. **Open in Browser**:
- Visit http://localhost:3000