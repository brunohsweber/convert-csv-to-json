import { app } from "./app";

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
  console.log(`Server running! HOST: ${HOST} - PORT: ${PORT}`)
);
