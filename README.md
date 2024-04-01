# WELDER : Projet WEB (Groupe 13)


## Présentation
WELDER est une page web qui te donne accès à un vaste catalogue de fils et de séries, tout en te permettant de créer une liste personnalisée de tes œuvres préférées pour les visionner plus tard. Chaque titre est accompagné d'une description, ainsi que d'une note moyenne attribuée par les utilisateurs. 

WELDER aussi conçu pour stimuler ta créativité, tester tes connaissances cinématographiques, et te faire passer un bon moment grâce à ses différents jeux, tels que la fusion de films ou les devinettes de films. 

## Le Site

WELDER surgit comme un site type Letterboxd afin d'échanger des opinions à propos des films. WELDER intègre aussi, à différence de Letterboxd, des séries. .
### Accueil
Welder présente une page d'accueil agréable qui permet de visualiser les films et séries du moment. Une barre de scroll permet de visualiser différents titres, et un bouton permet de changer entre les films et les séries. 

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712002400-captura-de-pantalla-2024-04-01-220942.jpg)

Chaque titre est accompagné d'une date de sortie, d'une synopsis, accéssible au complet à l'aide d'un click, et d'une note, attribuée par les utilisateurs du site. L'icone du coeur permet d'ajouter le film à la liste de favoris. 

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712002965-captura-de-pantalla-2024-04-01-222229.png)

Cette liste de favoris permet de marquer les titres qui intéressent l'utilisateur.

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712003307-captura-de-pantalla-2024-04-01-222742.png)

### Jeux

Afin de se différentier de sa concurrence, WELDER présente aussi un bouton `Jeux`, qui donne accès à deux jeux divertissants.

#### Fusion

Dans `Fusion`, nous avons la possibilité de choisir entre deux films ou deux séries à fusionner. Ce processus combine les synopsis, les univers, les personnages et même les couvertures des deux titres originaux pour créer un tout nouveau titre.

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712004731-captura-de-pantalla-2024-04-01-223758.jpg)

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712004736-captura-de-pantalla-2024-04-01-224424.png)

![Alt text](https://image.noelshack.com/fichiers/2024/14/1/1712004742-captura-de-pantalla-2024-04-01-224512.png)


We are gonna be setting MPLS and LDP inside the AS to route data packages using labels instead of addresses. This will be useful later when we add Client routers, since our final objective is to use a VPN network. MPLS allows us to free information from teh core routers given the fact routers 
We consider that the owner of AS X wants to deploy RIP in its network, while the owner of AS Y wants to deploy OSPF. BGP will need to be deployed between the AS's in order for them to communicate with each other. We use GNS3 to build the network topology.


## Frontend


We therefore need to create a code that allows us to manipulate the consoles of each router in order to configure IPv6 addresses to each of them and assign them different protocols based on their necessities. There are different ways of dealing with this situation. We decided to use the `telnet` protocol, which allows us to establish TCP/IP connexions and access a distant machine. 




This is how our code works eventually :


- We first retrieve the nodes of the GNS3 project.
- Then we scan the JSON `intent_file`, where every router of the network is precised, along with its IPv6 addresses, the type of protocol based on its neighbors and more.
- Thanks to telnet and by running "if" tests we configure every router. For example, if the router's iBGP is set to OSPF in the `intent_file`, then the code calls the `setup_ospf` function to set the router to ospf, and then calls the `ospfconf_area` function to set up the OSPF area. There is a different setup function for all 3 protocols and situations, as well as for making the address plan of the network. A configuration of a random router in the `intent_file` can be seen in the image below.


![Alt text](https://image.noelshack.com/fichiers/2024/05/2/1706629051-captura-de-pantalla-2024-01-30-163624.png)


We can see that every router is represented in the JSON, along with its specificities (as_number, router-id...).


### Backend
Ultimately and as add-ins, we decided to implement some other caracteristics to our code.


#### OSPF metrics 
If the `intent_file` specifies it, OSPF cost can be set in order to influence the routing by calling the `ospfconf_cost` function. 


#### Logs
In order to avoid having to charge again the whole GNS3 project every time there is a change in a router configuration, we implemented logs. (Hippo)


#### Communities
We also decided to implement BGP communities. (Jean)






Finally, we achieve to automate the setting of almost any network, as long as an `intent_file` clarifying the specificities of this network is given. We decided to use the following network as a test for a more complex topology : 


![Alt text](https://image.noelshack.com/fichiers/2024/05/2/1706629657-image.png)


The results are satisfactory : the net work has been set up by our code.
