import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Trang Chủ");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});