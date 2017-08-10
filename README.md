#Clara
###Lisez le fichier ci -joint `doc.pdf`
##Description
Clara est l'outil permettant la génération du fichier `html` d'un sujet de cours.
Dans ça version actuelle Clara ne permet pas l'édition de sujet mais uniquement la création de sujet.
Clara à était développer en `JavaScript (Jquery)` & `PHP`.

##Installation
Clara est un micro-site internet qui requiert:

- une connexion internet (bibliothèques `jss/css` externes)
- un serveur web
- PHP

Télécharger et placer le projet dans le répertoire `www` de votre serveur web.
##Utilisation
Accéder à `http://localhost/app/` avec votre navigateur favori (IE).
Clara est composé d'un corps central et d'un menu latéral droit.
##Corps central
Le corps central est un formulaire composé de deux parties.
###Partie 1:
Cette partie correspond à la partie statique du formulaire,
on y retrouve le contenu _"basic"_ d'un cours (ex: titre du module)
###Partie 2:
Cette partie correspond à la partie dynamique du formulaire,
elle est constitué d'une **zone de drop**.
Lorsque l'on drop un bloc depuis le menu latéral droit dans la zone de drop,
un nouveau **block de saisie** est ajouter au formulaire.
##Menu latéral droit
Le menu latéral droit contient la liste des **fonction de mises en forme** à appliquer au texte
ainsi que la liste des **blocs** que l'utilisateur peux drag&drop.
##Validation
Il suffit de cliquer sur le bouton _"Crée"_  pour générer le sujet de cours.
##Lien Utile:
https://openclassrooms.com/courses/creez-un-editeur-de-texte-wysiwyg
##Evolutions:
- crée un systéme de (poids) sur les **blocks de saisie** afin de gerer le emplacement.
- gérer leur emplacement en drag&drop.
##Optimisation:
- utilisation de ecmascript 6 (ES2015)
- utilisation de php 7.0