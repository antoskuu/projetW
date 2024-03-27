var Express = require('express');
var Mongoclient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');


const app = Express(); 
app.use(cors()); // cela configure votre serveur Express pour inclure les en-têtes CORS appropriés dans les réponses aux requêtes HTTP. Cela permet à votre serveur d'accepter les requêtes provenant de domaines différents de celui sur lequel il est hébergé
app.use(Express.json()); // Ajoutez cette ligne


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

app.get('/api/website/CheckWord', (request, response) => {
    const word = request.query.word;
    database.collection("customerscollection").findOne({ description: word }, (error, result) => {
        if (result) {
            const password = request.query.password; 
            if (result.password === password) {
                const id = result.id;
                response.send(id);
                console.log(id);
            } else {
                response.send("non");
                console.log("non");
            }
        } else {
            response.send("non"); // Si l'utilisateur n'existe pas, renvoyer "non"
            console.log("non");
        }
    });
});



app.post('/api/website/InsertCustomer', (request, response) => {
    // Rechercher un document existant avec le même 'word'
    database.collection("customerscollection").findOne({ description: request.body.word }, (error, result) => {
        if (error) {
            response.status(500).json({ error: 'An error occurred when searching for existing document.' });
            return;
        }

        // Si un document avec le même 'word' existe déjà, renvoyer une erreur
        if (result) {
            //envoyer une erreur que je récupère dans le front
            console.log("A user with this word already exists.");
            response.status(400).json({ error: 'A user with this word already exists.' });
            return;
        }
        if (request.body.password == "" || request.body.word == "") {
            console.log("Login or/and password are empty");
            response.status(400).json({ error: 'password = ""' });
            return;
        }
        // Si aucun document existant n'a été trouvé, ajouter le nouvel utilisateur
        database.collection("customerscollection").countDocuments({}, (error, numOfDocs) => {
            if (error) {
                response.status(500).json({ error: 'An error occurred when counting documents.' });
                return;
            }
            database.collection("customerscollection").insertOne({
                id: (numOfDocs + 1).toString(),
                description: request.body.word,
                password: request.body.password
            }, (error, result) => {
                if (error) {
                    response.status(500).json({ error: 'An error occurred when inserting the document.' });
                } else {
                    response.json("Added Successfully");
                }
            });
        });
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




