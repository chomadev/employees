# Employee Management System

Created by Marcos Braga Choma, March 2024

## Overview

This application enables users to CREATE, UPDATE, DELETE employees entries, while demonstrating simple techniques for .NET and React applications development.

### Backend
For the sake of simplicity, all components required by the API are within project "EMS.API".
- Controllers are the port to receive HTTP requests
- Infrastructure   responds for Database interactions (using SQLite here)
- Models are abstractions for domain entities

Application uses Swagger to document the API, as proposed by standard .NET API template.


### Frontend
User Interface for managing employees. Application is structured as:
- pages: resourceful routes of the application, mixing components to allow user interaction
- components: reusable parts that compose a page and deliver functionality
- model: abstraction of domain entities
- services: abstraction for communication with backend API
- lib: external dependencies, as axios, and other utilities

Libraries used:
Vite
React
TypeScript
Shadcn
React-hook-form
Zod
Dayjs
Tailwindcss

## Running the API:

1. Restore nuget packages:
`dotnet restore`

2. Create SQLite database:
`dotnet ef database update --project .\EMS.API\EMS.API.csproj`

3. Start the API:
`dotnet run --project .\EMS.API\EMS.API.csproj`

## Running the Web App:

1. Restore npm packages:
`npm i`

2. Generate tailwind css stylesheet:
`npx tailwindcss -i ./src/input.css -o ./src/index.css`

3. Create .env file and add `VITE_API_URL` with the full URL for the API, for example:
```
VITE_API_URL="https://localhost:7058/"
```

4. Start the application:
`npm run dev`