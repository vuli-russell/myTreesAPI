import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as treesController from "./controllers/treesController.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/trees/getAll", treesController.getAllTrees)

app.get("/trees/tree/:treeName", treesController.getTree)

app.get("/trees/randomtree", treesController.getRandomTree)

app.post("/trees/newtree", treesController.post)

app.delete("/trees/delete", treesController.remove)

.listen(process.env.PORT || 8080)


