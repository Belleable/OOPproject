import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "@12345host",
    database: "project"
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.json("This is the backend")
});

app.get("/home", (req, res)=>{
    const q = "SELECT * FROM pet"
    db.query(q, (err, data) =>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/home", (req, res)=>{
    const q = "INSERT INTO pet  (`petName`,`petType`,`petDoB`,`petPfp`,`petGender`,`id`) VALUE (?)";
    const values = [
        req.body.petName,
        req.body.petType,
        req.body.petDoB,
        req.body.petPfp,
        req.body.petGender,
        req.body.id,
    ];

    db.query(q, [values], (err,data) =>{
        if(err) return res.json(err);
        return res.json("Your pet has been added.");
    });
});

app.listen(8800, () => {
    console.log("Connect to backend!");
});