var Express = require('express');
var Mongoclient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');


const app = Express(); 
app.use(cors()); // cela configure votre serveur Express pour inclure les en-têtes CORS appropriés dans les réponses aux requêtes HTTP. Cela permet à votre serveur d'accepter les requêtes provenant de domaines différents de celui sur lequel il est hébergé

const CONNECTION_STRING = "mongodb+srv://admin:1234@websiteletterboxd.arhc7wc.mongodb.net/?retryWrites=true&w=majority&appName=websiteLetterboxd";
const DATABASE_NAME = "customersdb";
let database;

// Déclaration d'une variable pour stocker la connexion à la base de données
app.listen(5038, () => {
    Mongoclient.connect(CONNECTION_STRING, (error, client) => {
        //stocker la connexion à la bdd
        database = client.db(DATABASE_NAME);
        console.log("MongoDB Connected");
    });
});

// Route pour récupérer tous les clients depuis la base de données
app.get('/api/website/GetCustomers', (request, response) => {
    // Récupération de tous les clients de la collection "customerscollection". result est un tableau
    database.collection("customerscollection").find({}).toArray((error, result) => {
        response.send(result);
    });
});

// Route pour insérer un nouveau client dans la base de données
app.post('/api/website/InsertCustomer', multer().none(), (request, response) => {
    // Comptage du nombre de documents dans la collection pour générer un nouvel ID
    database.collection("customerscollection").countDocuments({}, (error, numOfDocs) => {
        // Insertion du nouveau client dans la collection avec un ID incrémenté
        database.collection("customerscollection").insertOne({
            id: (numOfDocs + 1).toString(),
            description: request.body.newNotes //// Accès à la description directement depuis le corps de la requête
        });
        response.json("Added Successfully");
    });
});

// Route pour supprimer un client de la base de données
app.delete('/api/website/DeleteCustomer', (request, response) => {
    // Suppression du client ayant l'ID spécifié dans les paramètres de requête
    database.collection("customerscollection").deleteOne({
        id: request.query.id
    });
    response.json("Deleted Successfully");
});


// le choix est fait un niveau du serveur pas du client. On renvoie au client que ce qu'il demande ?
