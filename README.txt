NEXUS MATRIX — NEURAL OPERATIONS CENTER
=======================================

VERSION : 2.0 — INTERFACE REFONDUE
TECHNOLOGIES : HTML5, CSS3, JAVASCRIPT NATIF

OUVRIR LE PROJET
----------------
1. Extraire le fichier ZIP.
2. Ouvrir le dossier NEXUS-MATRIX dans Visual Studio Code.
3. Ouvrir index.html dans un navigateur ou utiliser Live Server.
4. Aucune installation, bibliothèque ou connexion Internet n'est nécessaire.

STRUCTURE
---------
index.html : structure des écrans et des composants.
style.css  : design, couleurs, animations et responsive.
script.js  : pluie Matrix, chargement circulaire et interactions.
assets/    : dossier réservé aux ressources locales supplémentaires.

FONCTIONNALITÉS
---------------
- Initialisation avec HUD circulaire, graduations et progression animée.
- Pluie Matrix globale dessinée avec Canvas.
- Fenêtres de sécurité, terminaux, cadenas et module de déploiement.
- Dashboard avec statistiques actualisables, journaux et préférences.
- Laboratoire de code avec éditeur, bouton d'exécution, effacement et réinitialisation.
- Sortie visuelle sous forme de pluie Matrix après une commande reconnue.
- Formulaire de contact avec ouverture du logiciel de messagerie via mailto.
- Menu mobile et mise en page responsive.

COMMANDES DISPONIBLES DANS CODE LAB
-----------------------------------
nexus.run();     Lance une démonstration du noyau Nexus.
matrix.scan();   Lance une démonstration de scan Matrix.
system.help();   Affiche la démonstration du module d'aide.

IMPORTANT
---------
Le laboratoire est une simulation pédagogique côté navigateur : il reconnaît
les commandes prévues mais n'exécute pas de JavaScript arbitraire. Le dashboard
et les statuts de sécurité sont des données de démonstration, pas un vrai outil
de cybersécurité. Le formulaire prépare un email dans l'application de messagerie
de l'utilisateur ; l'envoi nécessite sa confirmation.

PERSONNALISATION
----------------
Dans index.html, modifie CHARLES AZEL et l'adresse email de contact si nécessaire.
Les couleurs, tailles et effets se règlent dans style.css.
Les commandes et interactions se règlent dans script.js.

Tous les identifiants et classes sont en français, et les fichiers sont
commentés en français pour faciliter l'apprentissage et la modification.


NOUVEAUTES V3 — MODULES AJOUTES SANS SUPPRIMER LES SECTIONS EXISTANTES

1. AMBIANCE SONORE
- Bouton SOUND ON / SOUND OFF dans l'entete.
- Sons synthétiques pour le démarrage, l'exécution, le chiffrement et le scan.
- Les navigateurs bloquent parfois l'audio automatique : le son démarre après le premier geste de l'utilisateur.
- Aucun fichier audio externe ni connexion Internet n'est nécessaire.

2. CRYPTO LAB
- Chiffrement AES-GCM 256 bits avec dérivation de clé PBKDF2-SHA-256.
- Utilise une clé secrète choisie par l'utilisateur (8 caractères minimum).
- Pour déchiffrer, colle le paquet JSON chiffré dans le champ principal et utilise exactement la même clé.
- Le sel et le vecteur d'initialisation sont générés aléatoirement. La clé ne quitte pas la page.
- Garde la clé en lieu sûr : il n'existe aucun moyen de récupérer les données sans elle.

3. SYSTEM SCAN
- Analyse statique de texte et de fichiers locaux texte (JS, CSS, HTML, JSON, TXT, etc.).
- Vérifie quelques erreurs de syntaxe et motifs courants. Ne lance pas les fichiers.
- En cas d'erreur, le panneau passe en rouge et permet de télécharger le rapport.
- En cas de succès, le cadenas s'ouvre et les boutons de téléchargement sont activés.
- Cette analyse pédagogique ne remplace pas un linter, un compilateur ni un audit de sécurité complet.

NOTE
Pour utiliser Web Crypto de façon fiable, ouvre le projet via Live Server (localhost) ou un site HTTPS.
Le site reste conçu pour fonctionner localement et n'envoie pas les données analysées à un serveur.

NOUVEAUTES V4 — AJOUTS VISUELS ET INTERACTIONS DU DASHBOARD

4. LANGUES
- Sélecteur placé dans le pied de page : English, Français, 中文 et Deutsch.
- La navigation, le titre et l'explication du Crypto Lab, ainsi que plusieurs commandes du dashboard changent de langue.
- Le choix s'applique immédiatement, sans rechargement.

5. CRYPTO LAB — PLUIE HORIZONTALE
- Le panneau NEURAL ENCRYPTION affiche maintenant une pluie de caractères Matrix horizontale.
- Les lignes défilent de gauche à droite et remplissent toute la hauteur du panneau.
- L'animation s'adapte à la largeur du panneau et à l'écran du téléphone.

6. DASHBOARD — COMMANDES ACTIVES
- Les interrupteurs SYS_PREFS mettent à jour leur état et ajoutent une entrée au journal TX_LOGS.
- /preferences fait défiler jusqu'aux préférences.
- /network affiche un état de connexion et une latence de démonstration.
- Les boutons d'actualisation, de consultation des journaux et de mode opérateur restent actifs.

Les valeurs réseau et statistiques du dashboard sont des données de démonstration locales :
aucune connexion à un vrai serveur ou système distant n'est effectuée.
