# WELDER : Projet WEB (Groupe 13)


## Présentation
WELDER est une page web qui donne accès à un vaste catalogue de films et séries, tout en permettant de créer une liste personnalisée des œuvres préférées pour les visionner plus tard. Chaque titre est accompagné d'une description, ainsi que d'une note moyenne attribuée par les utilisateurs. 

WELDER est aussi conçu pour stimuler la créativité, tester les connaissances cinématographiques, et faire passer un bon moment aux utilisateura, grâce à ses différents jeux, tels que la fusion ou les devinettes de films. 

## Le Site

WELDER surgit comme un site type Letterboxd dont le but est d'échanger des opinions à propos de films. WELDER intègre aussi, à différence de Letterboxd, des séries. 

### Accueil

WELDER présente une page d'accueil agréable qui permet de visualiser les films et séries du moment. Une barre de scroll permet de visualiser différents titres, et un bouton permet de changer entre les films et les séries. Une barre de recherche nous permet de rechercher les films par leur nom.

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712002400-captura-de-pantalla-2024-04-01-220942.jpg)

Chaque titre est accompagné d'une date de sortie, d'une synopsis, accessible en intégralité par un simple clic, et d'une note, attribuée par les autres utilisateurs du site. L'icone du coeur permet d'ajouter le film à la liste de favoris. 

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712002965-captura-de-pantalla-2024-04-01-222229.png)

Cette liste de favoris permet à l'utilisateur de marquer les titres qui l'intéressent.

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712003307-captura-de-pantalla-2024-04-01-222742.png)

### Jeux

Pour se différentier encore plus de sa concurrence, WELDER présente aussi un bouton `Jeux`, qui donne accès à deux jeux divertissants.

- **Fusion**

Dans **Fusion**, nous avons la possibilité de choisir entre deux films ou deux séries à fusionner. Ce processus combine les synopsis, les univers, les personnages et même les couvertures des deux titres originaux pour créer un tout nouveau titre.

![Alt text](https://image.noelshack.com/fichiers/2024/14/2/1712009296-captura-de-pantalla-2024-04-02-000802.jpg)

![Alt text](https://image.noelshack.com/fichiers/2024/14/2/1712009168-6e895f96-c018-4cd0-8181-117877131180.jpg)


- **Devine**

Dans **Devine**, on part cette fois-ci d'un titre fictif, combinaison de deux titres réels. Notre objectif est de trouver les noms de ces deux titres à partir du synopsis et de la couverture du nouveau titre fictif. Ce jeu est actuellement en cours de développment et sera bientôt disponible dans le site.

### Connexion et Chat

Les boutons `Connexion` et `Inscription` en haut à droite du site nous permettent de nous connecter au site. Ceci nous donne accès à un chat local pour partager nos opinions et disctuer avec le reste des utilisateurs. 

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712005317-captura-de-pantalla-2024-04-01-230142.png)

Une fois un compte créé, il est possible de s'inscrire et utiliser le chat.

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712005980-captura-de-pantalla-2024-04-01-231138.jpg)

Dans cette version, le chat actuel est restreint à une utilisation locale. Une amélioration envisageable serait d'intégrer des connexions entre machines en utilisant des `sockets`.

## Backend

Passons au squelette du site. L'établissement et la connexion à un serveur sont assurés grâce au fichier _index.js_. Ce code construit un serveur web fonctionnant sur `Node.js` et `Express.js`, et utilisant `MongoDB` comme système de gestion de base de données. Ceci permet de gérer toute la partie de connexion et inscription au site, ainsi que les messages du chat. Les modules requis sont importés comme suit :  

```
var Express = require('express');
var Mongoclient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');
```

`Express` va nous aider à configurer le serveur pour écouter les requêtes entrantes. Ici, le serveur est configuré sur le port 5038. Le code établit également une connexion à une base de données `MongoDB` hébergée sur `MongoDB Atlas`. Cette base de données permet de stocker les noms d'utilisateurs et les mots de passe de tous les utilisateurs s'enregistrant dans le site. Elle permet aussi de stocker tous les messages postés dans le chat. 

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712007760-qy8lwrfj44xx0y816j6c.png)

Le serveur définit plusieurs points de terminaison pour gérer les requêtes api GET, POST et DELETE. Par exemple, le point de terminaison /api/website/InsertCustomer permet d'ajouter un nouvel utilisateur tout en vérifiant l'existence préalable d'un utilisateur avec le même mot, afin d'éviter les doublons.

Dans le fichier _App.js_, la variable `js-cookie`, importée comme : 

```
import Cookies from 'js-cookie';
``` 
permet au site d'utiliser des cookies, et ainsi de ne pas avoir à renseigner l'utilisateur et le mot de passe à chaque connexion. 

## Frontend

Le `Frontend` du site est géré par le fichier _App.js_, lequel fait référence à plusieurs autres fichiers définissant les éléments visibles et interactifs spécifiques à chaque fonctionnalité. L'aspect esthétique du site est modelé par la configuration présente dans le fichier _App.css_. Une grande attention est portée aux détails. De nombreux icones permettent de rendre le site plus dynamique et attractif. 

![Alt text](https://image.noelshack.com/fichiers/2024/14/2/1712008852-captura-de-pantalla-2024-04-02-000042.png)


Les éléments comme la barre de recherche sont codés dans les fichiers js du dossier _components_.

## Comment exécuter

Pour lancer le code générant le site WELDER, il est nécessaire d'ouvir deux terminaux. Dans le premier, accédez au dossier _serveur_, puis exécutez la ligne suivante :

```
cd chemin/vers/serveur
node index.js
```
Ceci permet de démarrer le serveur.

Si vous ne l'avez pas déjà fait, vous devez installer le module `express` :

```
npm install express
```

Une fois le serveur connecté, accédez au dossier _src_ dans l'autre terminal et exécutez la ligne suivante :

```
cd chemin/vers/src
npm start 
```
Si vous ne l'avez pas déjà fait, vous devez également installer `js-cookie` :

```
npm i js-cookie
```
