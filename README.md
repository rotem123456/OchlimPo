OchlimPo
Prerequisites

Docker Desktop installed on your computer

Setup & Installation
Backend Setup

Navigate to the BE (Backend) folder and start the server:

bashCopydocker compose up --build
This will start the backend server on localhost:4000

In the same BE folder, generate the Prisma client:

bashCopynpx prisma generate
Note: If this command fails, you may need to install Prisma locally first.
This will open Prisma Studio UI on port 5555.
Frontend Setup

Navigate to the FE (Frontend) folder and start the application:

bashCopynpm start
This will launch the frontend on localhost:3000
Quick Start Guide

Open three separate terminals
Follow the Backend Setup steps in the first two terminals
Execute the Frontend Setup in the third terminal
Your application should now be running and accessible

Port Information

Backend: localhost:4000
Database UI: localhost:5555
Frontend: localhost:3000
