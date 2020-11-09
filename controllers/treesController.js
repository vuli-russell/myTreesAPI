import { getCollectionDocuments, createCollectionDocument, deleteCollectionDocument } from "../database.js";

export const getAllTrees = async (request,response) => {
    const trees = await getCollectionDocuments("data")
    if(trees.length){
        response.type("json");
        response.send(JSON.stringify(trees));
    }else{
        response.status(503);
        response.send("No Trees Found");        
    }
}

export const getTree = async (request,response) => {
    const tree = (await getCollectionDocuments("data")).find(tree => tree.name.toLowerCase().replace(" ","")===request.params.treeName.toLowerCase());
    if(tree){
        response.type("json");
        response.send(JSON.stringify(tree));
    }else{
       response.status(503).send("Tree not found"); 
    }
}

export const getRandomTree = async (request,response) => {
    const trees = await getCollectionDocuments("data")
    if(trees.length){
        response.type("json");
        response.send(JSON.stringify([trees[Math.floor(Math.random()*trees.length)]]));
    }else{
        response.status(503);
        response.send("No Trees Found");        
    }
}

export const post = async (request,response) => {
    await createCollectionDocument("data", request.body)
    response.send("Tree recieved, thanks")
}

export const remove = async (request, response) => {
    await deleteCollectionDocument("data",request.body._id)
    response.send("Tree deleted, thanks")
}