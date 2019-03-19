"use strict";

import express, { json, urlencoded } from 'express';
import cors from "cors";
const PORT = process.env.PORT || 3000;

const app = express();
// Body Parser Middleware
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

app.use("/api", require("./routes/router"));

// app.get("/", function (req, res) {
//   return res.end('<a href="/auth/google">Sign In with Google</a>');
// });
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
