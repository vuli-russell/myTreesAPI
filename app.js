import express, { response } from 'express';
import cors from "cors";
import axios from 'axios';
import bodyParser from "body-parser";
import { getCollectionDocuments, createCollectionDocument, deleteCollectionDocument } from "./database.js";

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use((request,reponse,next) => {
    console.log(request.url);
    next();
} )

app.get("/trees", async (request,response) => {
    const trees = await getCollectionDocuments("data")
    if(trees.length){
        response.type("json");
        response.send(JSON.stringify(trees));
    }else{
        response.status(503);
        response.send("No Trees Found");        
    }
})

app.get("/trees/:treeName", async (request,response) => {
    const tree = await getCollectionDocuments("data").find(tree => tree.name.toLowerCase().replace(" ","")===request.params.treeName.toLowerCase());
    if(tree){
        response.type("json");
        response.send(JSON.stringify(tree));
    }else{
       response.status(503).send("Tree not found"); 
    }
})

app.get("/randomtree", async (request,response) => {
    const trees = await getCollectionDocuments("data")
    if(trees.length){
        response.type("json");
        response.send(JSON.stringify([trees[Math.floor(Math.random()*trees.length)]]));
    }else{
        response.status(503);
        response.send("No Trees Found");        
    }
})

app.post("/newtree", async (request,response) => {
    await createCollectionDocument("data", request.body)
    response.send("Tree recieved, thanks")
})

app.delete("/delete", async (request, response) => {
    await deleteCollectionDocument("data",request.body)
    response.send("Tree deleted, thanks")
})



app.get("/kanye", (request,response) => {
    axios.get("https://api.kanye.rest")
    .then(r => response.send(r.data.quote))
})

app.listen(8080);


