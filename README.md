# OchlimPo

## Prerequisites

Before setting up the application, ensure you have the following installed:

- **Docker Desktop**
- **Node.js** (for the frontend)
- **npm** (Node Package Manager)

---

## Backend Setup

1. **Start the Server**  
   Navigate to the `BE` (Backend) folder and run the following command to build and start the server (port 4000):

   ```bash
   docker compose up --build

   ```

2. **UI FOR BE**  
   Navigate to the `BE` (Backend) folder and run the following command to start the UI (port 5555):
   ```bash
   npx prisma studio
   ```

## Frontend setup

**Start the FE**  
 Navigate to the `FE` folder and run the following command to build and start the server (port 3000):

```bash
npm install npm start
  ```


## Creating the .env Files
Security Token Setup

Create a .env file in the BE/src/middleware folder with a JWT token:
bashCopy# Create the .env file
touch BE/src/middleware/.env

# Generate a random JWT secret and add it to the .env file
```bash
echo "JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")" >> BE/src/middleware/.env
```

Create a .env.docker file in the BE directory with the same JWT token:
bashCopy# First, save the JWT token to a variable

```bash
JWT_TOKEN=$(grep JWT_SECRET BE/src/middleware/.env | cut -d= -f2)
```

# Create the .env.docker file with the same token
echo "JWT_SECRET=$JWT_TOKEN" > BE/.env.docker

```
Now you will be able to make POST requests to the backend.
```

Happy Eating
