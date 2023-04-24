import swaggerJsdoc from "swagger-jsdoc";
const option = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API for Ecommerce",
      version: "1.0.0",
      description: "A simple Ecommerce API",
    },
  },
  server: [{ url: "http://localhost:4000" }],
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(option);
