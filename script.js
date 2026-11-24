/* -------------------- OUTILS ET SÉLECTION DES ÉLÉMENTS -------------------- */

const selectionner = (selecteur) => document.querySelector(selecteur);
const selectionnerTout = (selecteur) => document.querySelectorAll(selecteur);

const toileMatrice = selectionner("#pluie-matrice");
const contexteMatrice = toileMatrice.getContext("2d");
const ecranInitialisation = selectionner("#ecran-initialisation");
const application = selectionner("#application");
const valeurInitialisation = selectionner("#valeur-initialisation");
const anneauProgression = selectionner("#anneau-progression");
const barreInitialisation = selectionner("#barre-initialisation");
const messageInitialisation = selectionner("#message-initialisation");
const statutInitialisation = selectionner("#statut-initialisation");

/* -------------------- PLUIE MATRIX EN ARRIÈRE-PLAN -------------------- */

const alphabetMatrice = "アカサタナハマヤラワ012345789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&";
let colonnesMatrice = [];
let largeurMatrice = 0;
let hauteurMatrice = 0;
let animationMatrice = null;
let pluieActive = true;

function preparerPluieMatrice() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    largeurMatrice = window.innerWidth;
    hauteurMatrice = window.innerHeight;
    toileMatrice.width = largeurMatrice * ratio;
    toileMatrice.height = hauteurMatrice * ratio;
    toileMatrice.style.width = `${largeurMatrice}px`;
    toileMatrice.style.height = `${hauteurMatrice}px`;
    contexteMatrice.setTransform(ratio, 0, 0, ratio, 0, 0);
    const nombreColonnes = Math.floor(largeurMatrice / 19);
    colonnesMatrice = Array(nombreColonnes).fill(1);
}

function dessinerPluieMatrice() {
    if (!pluieActive) return;
    contexteMatrice.fillStyle = "rgba(1, 5, 3, 0.085)";
    contexteMatrice.fillRect(0, 0, largeurMatrice, hauteurMatrice);
    contexteMatrice.font = "14px monospace";

    colonnesMatrice.forEach((position, index) => {
        const caractere = alphabetMatrice[Math.floor(Math.random() * alphabetMatrice.length)];
        const intensite = Math.random() > .96 ? "#d9ff75" : "#00e89d";
        contexteMatrice.fillStyle = intensite;
        contexteMatrice.fillText(caractere, index * 19, position * 19);

        if (position * 19 > hauteurMatrice && Math.random() > .975) {
            colonnesMatrice[index] = 0;
        }
        colonnesMatrice[index]++;
    });
    animationMatrice = requestAnimationFrame(dessinerPluieMatrice);
}

function demarrerPluieMatrice() {
    if (pluieActive) return;
    pluieActive = true;
    animationMatrice = requestAnimationFrame(dessinerPluieMatrice);
}

function arreterPluieMatrice() {
    pluieActive = false;
    cancelAnimationFrame(animationMatrice);
}

preparerPluieMatrice();
dessinerPluieMatrice();
window.addEventListener("resize", preparerPluieMatrice);

/* -------------------- INITIALISATION DU HUD CIRCULAIRE -------------------- */

const groupeGraduations = selectionner("#graduations-hud");

for (let index = 0; index < 120; index++) {
    const angle = (index * 3 * Math.PI) / 180;
    const rayonInterieur = index % 5 === 0 ? 128 : 134;
    const rayonExterieur = 143;
    const debutX = 180 + Math.cos(angle) * rayonInterieur;
    const debutY = 180 + Math.sin(angle) * rayonInterieur;
    const finX = 180 + Math.cos(angle) * rayonExterieur;
    const finY = 180 + Math.sin(angle) * rayonExterieur;
    const graduation = document.createElementNS("http://www.w3.org/2000/svg", "line");
    graduation.setAttribute("x1", debutX);
    graduation.setAttribute("y1", debutY);
    graduation.setAttribute("x2", finX);
    graduation.setAttribute("y2", finY);
    groupeGraduations.appendChild(graduation);
}

function lancerInitialisation() {
    let progression = 0;
    const messages = [
        "INITIALISATION DU NOYAU NEURAL",
        "CHARGEMENT DES MODULES DE SÉCURITÉ",
        "VÉRIFICATION DU RÉSEAU MATRIX",
        "ÉTABLISSEMENT DU CANAL SÉCURISÉ",
        "SYNCHRONISATION DES DONNÉES",
        "NEXUS CORE IS READY"
    ];
    const intervalle = setInterval(() => {
        progression += Math.floor(Math.random() * 3) + 1;
        progression = Math.min(progression, 100);
        valeurInitialisation.textContent = String(progression).padStart(2, "0");
        anneauProgression.style.strokeDashoffset = 572 - (572 * progression) / 100;
        barreInitialisation.style.width = `${progression}%`;
        const indexMessage = Math.min(Math.floor(progression / 20), messages.length - 1);
        messageInitialisation.textContent = messages[indexMessage];
        statutInitialisation.textContent = progression < 100 ? "SCANNING SYSTEM..." : "ACCESS GRANTED";

        if (progression >= 100) {
            clearInterval(intervalle);
            setTimeout(() => {
                ecranInitialisation.classList.add("termine");
                application.classList.add("visible");
                application.setAttribute("aria-hidden", "false");
                preparerPluieSortie();
            }, 650);
        }
    }, 42);
}

lancerInitialisation();

/* -------------------- NAVIGATION SUR TÉLÉPHONE -------------------- */

const boutonMenu = selectionner("#bouton-menu");
const navigationPrincipale = selectionner("#navigation-principale");

boutonMenu.addEventListener("click", () => {
    const menuOuvert = navigationPrincipale.classList.toggle("ouverte");
    boutonMenu.setAttribute("aria-expanded", String(menuOuvert));
});

selectionnerTout(".lien-navigation").forEach((lien) => {
    lien.addEventListener("click", () => {
        selectionnerTout(".lien-navigation").forEach((element) => element.classList.remove("actif"));
        lien.classList.add("actif");
        navigationPrincipale.classList.remove("ouverte");
        boutonMenu.setAttribute("aria-expanded", "false");
    });
});

/* -------------------- JOURNAL DE SÉCURITÉ ANIMÉ -------------------- */

const lignesSecurite = [
    "[00:00:06] ROUTING PACKETS THROUGH SECURE NODE...",
    "[00:00:07] FIREWALL SIGNATURE UPDATED <span>OK</span>",
    "[00:00:08] ENCRYPTION KEY VERIFIED <span>OK</span>",
    "[00:00:09] NEURAL CORE SYNCHRONIZED <span>OK</span>",
    "[00:00:10] ALL SYSTEMS NOMINAL"
];

let indexJournal = 0;
setInterval(() => {
    const journal = selectionner("#journaux-securite");
    const nouvelleLigne = document.createElement("p");
    nouvelleLigne.innerHTML = lignesSecurite[indexJournal % lignesSecurite.length];
    journal.insertBefore(nouvelleLigne, journal.querySelector(".ligne-attente"));
    while (journal.querySelectorAll("p").length > 7) {
        journal.removeChild(journal.querySelector("p:first-child"));
    }
    indexJournal++;
}, 2800);

/* -------------------- DASHBOARD : ACTUALISATION DES VALEURS -------------------- */

selectionner("#bouton-actualiser").addEventListener("click", () => {
    const flux = selectionner("#statistique-flux");
    const connexions = selectionner("#statistique-connexions");
    const requetes = selectionner("#statistique-requetes");
    flux.innerHTML = `${(24500 + Math.floor(Math.random() * 900)).toLocaleString("en-US")}<small>.00</small>`;
    connexions.textContent = (1200 + Math.floor(Math.random() * 100)).toLocaleString("en-US");
    requetes.textContent = `${(47 + Math.random() * 4).toFixed(1)}k`;
    selectionner(".entete-dashboard p").innerHTML = "STATUS: <b>ONLINE</b> <span>•</span> DATA REFRESHED JUST NOW";
});

selectionner("#bouton-voir-logs").addEventListener("click", () => {
    const corpsJournal = selectionner("#corps-journal");
    const ligne = document.createElement("tr");
    const heure = new Date().toLocaleTimeString("fr-FR");
    ligne.innerHTML = `<td><i class="point-tableau"></i> Manual_System_Check</td><td class="valeur-positive">+0.00</td><td>${heure}</td>`;
    corpsJournal.prepend(ligne);
    selectionner("#bouton-voir-logs").textContent = "[ UPDATED ]";
});

selectionner("#bouton-operateur").addEventListener("click", () => {
    const alerte = selectionner(".alerte-privileges");
    alerte.querySelector("p").textContent = "OPERATOR MODE ACTIVATED — DEMO ACCESS GRANTED. No real system privileges were changed.";
    alerte.querySelector("span").textContent = "✓ OPERATOR MODE / DEMO";
    alerte.style.borderColor = "rgba(0, 255, 195, .65)";
    alerte.style.background = "rgba(0, 100, 65, .17)";
});

/* -------------------- LABORATOIRE : PLUIE DE SORTIE -------------------- */

const toileSortie = selectionner("#pluie-sortie");
const contexteSortie = toileSortie.getContext("2d");
const zoneSortie = selectionner("#zone-sortie");
const zoneCommande = selectionner("#zone-commande");
const messageCode = selectionner("#message-code");
const messageSortie = selectionner("#message-sortie");
const alphabetSortie = "01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ#$%";
let colonnesSortie = [];
let animationSortie = null;
let sortieActive = false;

function preparerPluieSortie() {
    const largeur = zoneSortie.clientWidth;
    const hauteur = zoneSortie.clientHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    toileSortie.width = largeur * ratio;
    toileSortie.height = hauteur * ratio;
    toileSortie.style.width = `${largeur}px`;
    toileSortie.style.height = `${hauteur}px`;
    contexteSortie.setTransform(ratio, 0, 0, ratio, 0, 0);
    colonnesSortie = Array(Math.floor(largeur / 13)).fill(1);
}

function dessinerPluieSortie() {
    if (!sortieActive) return;
    const largeur = zoneSortie.clientWidth;
    const hauteur = zoneSortie.clientHeight;
    contexteSortie.fillStyle = "rgba(0, 5, 3, .12)";
    contexteSortie.fillRect(0, 0, largeur, hauteur);
    contexteSortie.font = "12px monospace";
    colonnesSortie.forEach((position, index) => {
        const caractere = alphabetSortie[Math.floor(Math.random() * alphabetSortie.length)];
        contexteSortie.fillStyle = Math.random() > .95 ? "#eaff78" : "#00ffc3";
        contexteSortie.fillText(caractere, index * 13, position * 13);
        if (position * 13 > hauteur && Math.random() > .96) colonnesSortie[index] = 0;
        colonnesSortie[index]++;
    });
    animationSortie = requestAnimationFrame(dessinerPluieSortie);
}

function lancerPluieSortie() {
    sortieActive = true;
    cancelAnimationFrame(animationSortie);
    preparerPluieSortie();
    dessinerPluieSortie();
}

function arreterPluieSortie() {
    sortieActive = false;
    cancelAnimationFrame(animationSortie);
}

window.addEventListener("resize", () => {
    if (sortieActive) preparerPluieSortie();
});

function mettreAJourCompteur() {
    selectionner("#compteur-caracteres").textContent = `${zoneCommande.value.length} CHAR`;
}

zoneCommande.addEventListener("input", mettreAJourCompteur);
mettreAJourCompteur();

/* Le résultat dépend de commandes reconnues, sans exécuter de code arbitraire. */
function executerCommande() {
    jouerSonNexus("success");
    const code = zoneCommande.value.trim();
    const commandeValide = /nexus\.run\s*\(\)|matrix\.scan\s*\(\)|system\.help\s*\(\)/i.test(code);

    if (!code) {
        messageCode.textContent = "ERROR — THE EDITOR IS EMPTY. TYPE A COMMAND FIRST.";
        messageCode.style.color = "#ff9a8e";
        return;
    }

    if (!commandeValide) {
        messageCode.textContent = "COMMAND NOT RECOGNIZED — TRY nexus.run(), matrix.scan() OR system.help()";
        messageCode.style.color = "#ffbd75";
        selectionner("#etat-sortie-texte").textContent = "COMMAND ERROR / WAITING";
        return;
    }

    let resultat = "NEURAL CORE EXECUTED";
    if (/matrix\.scan\s*\(\)/i.test(code)) resultat = "MATRIX SCAN COMPLETE / DATA FOUND";
    if (/system\.help\s*\(\)/i.test(code)) resultat = "HELP MODULE LOADED / 3 COMMANDS AVAILABLE";

    messageCode.textContent = "SUCCESS — COMMAND EXECUTED. MATRIX STREAM GENERATED.";
    messageCode.style.color = "#00ffc3";
    selectionner("#etat-sortie-texte").textContent = resultat;
    messageSortie.innerHTML = `<span>ＮＥＸＵＳ</span><strong>${resultat}</strong><small>LIVE MATRIX OUTPUT / STREAM ACTIVE</small>`;
    lancerPluieSortie();
}

selectionner("#bouton-executer").addEventListener("click", executerCommande);

selectionner("#bouton-effacer").addEventListener("click", () => {
    zoneCommande.value = "";
    mettreAJourCompteur();
    messageCode.textContent = "EDITOR CLEARED — TYPE YOUR OWN COMMAND.";
    messageCode.style.color = "#7fb69a";
    selectionner("#etat-sortie-texte").textContent = "NO PROCESS RUNNING";
    messageSortie.innerHTML = "<span>ＮＥＸＵＳ</span><strong>AWAITING INPUT</strong><small>RUN YOUR FIRST COMMAND</small>";
    arreterPluieSortie();
    preparerPluieSortie();
    contexteSortie.clearRect(0, 0, toileSortie.width, toileSortie.height);
});

selectionner("#bouton-exemple").addEventListener("click", () => {
    zoneCommande.value = "const nexus = {\n  operator: \"Charles Azel\",\n  mission: \"explore the matrix\",\n  mode: \"neural\"\n};\n\nnexus.run();\n// Le meilleur reste à coder...";
    mettreAJourCompteur();
    messageCode.textContent = "EXAMPLE RESTORED — READY TO EXECUTE.";
    messageCode.style.color = "#7fb69a";
});

/* -------------------- FORMULAIRE DE CONTACT -------------------- */

selectionner("#formulaire-contact").addEventListener("submit", (evenement) => {
    evenement.preventDefault();
    const nom = selectionner("#nom-contact").value.trim();
    const email = selectionner("#email-contact").value.trim();
    const message = selectionner("#message-contact").value.trim();
    const retour = selectionner("#retour-contact");

    if (!nom || !email || !message) {
        retour.textContent = "ERROR — COMPLETE ALL FIELDS BEFORE TRANSMISSION.";
        retour.style.color = "#ff9a8e";
        return;
    }

    const sujet = encodeURIComponent(`NEXUS MATRIX — Message de ${nom}`);
    const corps = encodeURIComponent(`Nom : ${nom}\nEmail : ${email}\n\nMessage :\n${message}`);
    retour.textContent = "SECURE CHANNEL READY — OPENING YOUR EMAIL APPLICATION...";
    retour.style.color = "#00ffc3";
    window.location.href = `mailto:charlesmonjakidy@gmail.com?subject=${sujet}&body=${corps}`;
});

/* -------------------- COMMANDES CLAVIER DE DÉMONSTRATION -------------------- */

zoneCommande.addEventListener("keydown", (evenement) => {
    if (evenement.key === "Tab") {
        evenement.preventDefault();
        const debut = zoneCommande.selectionStart;
        const fin = zoneCommande.selectionEnd;
        zoneCommande.value = `${zoneCommande.value.substring(0, debut)}  ${zoneCommande.value.substring(fin)}`;
        zoneCommande.selectionStart = zoneCommande.selectionEnd = debut + 2;
        mettreAJourCompteur();
    }
});

/* -------------------- AMBIANCE SONORE NEXUS -------------------- */

let audioNexus = null;
let sonsActifs = true;

function obtenirAudio() {
    if (!audioNexus) {
        const Audio = window.AudioContext || window.webkitAudioContext;
        if (Audio) audioNexus = new Audio();
    }
    if (audioNexus && audioNexus.state === "suspended") audioNexus.resume();
    return audioNexus;
}

function jouerSonNexus(type) {
    if (!sonsActifs) return;
    const audio = obtenirAudio();
    if (!audio) return;
    const maintenant = audio.currentTime;
    const notes = type === "boot" ? [220, 330, 440, 660] : type === "scan" ? [180, 260, 360] : type === "erreur" ? [180, 125] : [440, 660, 880];
    notes.forEach((frequence, index) => {
        const oscillateur = audio.createOscillator();
        const volume = audio.createGain();
        oscillateur.type = type === "erreur" ? "sawtooth" : "sine";
        oscillateur.frequency.setValueAtTime(frequence, maintenant + index * .11);
        volume.gain.setValueAtTime(.0001, maintenant + index * .11);
        volume.gain.exponentialRampToValueAtTime(.055, maintenant + index * .11 + .025);
        volume.gain.exponentialRampToValueAtTime(.0001, maintenant + index * .11 + .2);
        oscillateur.connect(volume);
        volume.connect(audio.destination);
        oscillateur.start(maintenant + index * .11);
        oscillateur.stop(maintenant + index * .11 + .22);
    });
}

const boutonSon = selectionner("#bouton-son");
boutonSon.addEventListener("click", () => {
    sonsActifs = !sonsActifs;
    boutonSon.textContent = sonsActifs ? "♫ SOUND ON" : "♫ SOUND OFF";
    boutonSon.classList.toggle("son-muet", !sonsActifs);
    boutonSon.setAttribute("aria-pressed", String(sonsActifs));
    if (sonsActifs) jouerSonNexus("boot");
});

/* -------------------- OUTILS DE CRYPTAGE AES-GCM -------------------- */

const champTexteCrypto = selectionner("#texte-cryptage");
const champCleCrypto = selectionner("#cle-cryptage");
const champResultatCrypto = selectionner("#resultat-cryptage");
const retourCrypto = selectionner("#retour-cryptage");

function encoderBase64(donnees) {
    let binaire = "";
    new Uint8Array(donnees).forEach((octet) => binaire += String.fromCharCode(octet));
    return btoa(binaire);
}

function decoderBase64(texte) {
    return Uint8Array.from(atob(texte), (caractere) => caractere.charCodeAt(0));
}

async function creerCleCrypto(motDePasse, sel) {
    const texteEncode = new TextEncoder();
    const materiau = await crypto.subtle.importKey("raw", texteEncode.encode(motDePasse), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: sel, iterations: 180000, hash: "SHA-256" },
        materiau,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

selectionner("#bouton-crypter").addEventListener("click", async () => {
    const texte = champTexteCrypto.value;
    const motDePasse = champCleCrypto.value;
    if (!texte.trim() || motDePasse.length < 8) {
        retourCrypto.textContent = "ERROR — ENTER DATA AND A KEY OF AT LEAST 8 CHARACTERS.";
        retourCrypto.style.color = "#ff7885";
        jouerSonNexus("erreur");
        return;
    }
    try {
        const sel = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const cle = await creerCleCrypto(motDePasse, sel);
        const contenu = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, cle, new TextEncoder().encode(texte));
        champResultatCrypto.value = JSON.stringify({ format: "NEXUS-AES-GCM", version: 1, salt: encoderBase64(sel), iv: encoderBase64(iv), data: encoderBase64(contenu) }, null, 2);
        retourCrypto.textContent = "ENCRYPTION SUCCESS — KEEP YOUR SECRET KEY SAFE.";
        retourCrypto.style.color = "#00ffc3";
        jouerSonNexus("success");
    } catch (erreur) {
        retourCrypto.textContent = "CRYPTO ERROR — THIS BROWSER DOES NOT SUPPORT THE REQUIRED API.";
        retourCrypto.style.color = "#ff7885";
        jouerSonNexus("erreur");
    }
});

selectionner("#bouton-decrypter").addEventListener("click", async () => {
    try {
        const paquet = JSON.parse(champTexteCrypto.value);
        const motDePasse = champCleCrypto.value;
        if (paquet.format !== "NEXUS-AES-GCM" || !motDePasse) throw new Error("FORMAT OR KEY INVALID");
        const sel = decoderBase64(paquet.salt);
        const iv = decoderBase64(paquet.iv);
        const cle = await creerCleCrypto(motDePasse, sel);
        const contenu = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, cle, decoderBase64(paquet.data));
        champResultatCrypto.value = new TextDecoder().decode(contenu);
        retourCrypto.textContent = "DECRYPTION SUCCESS — ORIGINAL DATA RESTORED.";
        retourCrypto.style.color = "#00ffc3";
        jouerSonNexus("success");
    } catch (erreur) {
        champResultatCrypto.value = "";
        retourCrypto.textContent = "DECRYPTION FAILED — WRONG KEY OR DAMAGED ENCRYPTED DATA.";
        retourCrypto.style.color = "#ff7885";
        jouerSonNexus("erreur");
    }
});

selectionner("#bouton-copier-crypto").addEventListener("click", async () => {
    if (!champResultatCrypto.value) return;
    try {
        await navigator.clipboard.writeText(champResultatCrypto.value);
        retourCrypto.textContent = "RESULT COPIED TO CLIPBOARD.";
    } catch (erreur) {
        champResultatCrypto.select();
        retourCrypto.textContent = "SELECTED — COPY WITH YOUR KEYBOARD.";
    }
});

function telechargerTexte(nom, contenu, type = "text/plain") {
    const fichier = new Blob([contenu], { type });
    const adresse = URL.createObjectURL(fichier);
    const lien = document.createElement("a");
    lien.href = adresse;
    lien.download = nom;
    lien.click();
    URL.revokeObjectURL(adresse);
}

selectionner("#bouton-telecharger-crypto").addEventListener("click", () => {
    if (champResultatCrypto.value) telechargerTexte("nexus-resultat-crypto.txt", champResultatCrypto.value);
});

/* -------------------- CHARGEMENT DU FICHIER À ANALYSER -------------------- */

const fichierAnalyse = selectionner("#fichier-analyse");
const contenuAnalyse = selectionner("#contenu-analyse");
const nomFichierAnalyse = selectionner("#nom-fichier-analyse");
let nomSourceAnalyse = "nexus-source.txt";
let rapportAnalyse = "";
let sourceNettoyee = "";

fichierAnalyse.addEventListener("change", async () => {
    const fichier = fichierAnalyse.files[0];
    if (!fichier) return;
    nomSourceAnalyse = fichier.name;
    nomFichierAnalyse.textContent = fichier.name;
    if (fichier.size > 1024 * 1024) {
        nomFichierAnalyse.textContent = "FILE TOO LARGE — MAXIMUM 1 MB";
        return;
    }
    contenuAnalyse.value = await fichier.text();
});

function verifierEquilibre(texte) {
    const pile = [];
    const paires = { ")": "(", "}": "{", "]": "[" };
    let chaine = "";
    let echappement = false;
    let commentaire = false;
    for (let index = 0; index < texte.length; index++) {
        const caractere = texte[index];
        const suivant = texte[index + 1];
        if (commentaire) { if (caractere === "\n") commentaire = false; continue; }
        if (chaine) {
            if (echappement) echappement = false;
            else if (caractere === "\\") echappement = true;
            else if (caractere === chaine) chaine = "";
            continue;
        }
        if (caractere === "/" && suivant === "/") { commentaire = true; index++; continue; }
        if (["'", '"', "`"].includes(caractere)) { chaine = caractere; continue; }
        if (["(", "{", "["].includes(caractere)) pile.push({ caractere, index });
        if (Object.keys(paires).includes(caractere)) {
            const dernier = pile.pop();
            if (!dernier || dernier.caractere !== paires[caractere]) return `Symbole ${caractere} inattendu à la position ${index + 1}.`;
        }
    }
    if (chaine) return "Une chaîne de caractères semble ne pas être fermée.";
    if (pile.length) return `Le symbole ${pile[pile.length - 1].caractere} n'est pas fermé.`;
    return "";
}

function analyserSource(texte, nom) {
    const erreurs = [];
    const extension = nom.split(".").pop().toLowerCase();
    if (!texte.trim()) erreurs.push("Le contenu est vide : aucun élément à analyser.");
    const erreurEquilibre = verifierEquilibre(texte);
    if (erreurEquilibre && ["js", "css", "json", "py", "java", "cpp", "c"].includes(extension)) erreurs.push(erreurEquilibre);
    if (extension === "json") {
        try { JSON.parse(texte); } catch (erreur) { erreurs.push(`JSON invalide : ${erreur.message}`); }
    }
    if (extension === "js" || extension === "mjs") {
        try { new Function(texte); } catch (erreur) { erreurs.push(`Erreur de syntaxe JavaScript : ${erreur.message}`); }
    }
    if (extension === "html" || extension === "htm") {
        const analyseur = new DOMParser();
        const documentHTML = analyseur.parseFromString(texte, "text/html");
        if (documentHTML.querySelector("parsererror")) erreurs.push("Le document HTML contient une erreur de lecture.");
        if (!/<html[\s>]/i.test(texte)) erreurs.push("Balise <html> absente : vérifie la structure du document.");
        if (!/<body[\s>]/i.test(texte)) erreurs.push("Balise <body> absente : vérifie le contenu principal.");
    }
    if (extension === "css") {
        try {
            const feuille = new CSSStyleSheet();
            feuille.replaceSync(texte);
        } catch (erreur) { erreurs.push(`Erreur de syntaxe CSS : ${erreur.message}`); }
    }
    if (/TODO|FIXME/i.test(texte)) erreurs.push("Marqueur TODO/FIXME détecté : une tâche reste à terminer.");
    if (/password\s*[:=]\s*["'][^"']+/i.test(texte)) erreurs.push("Possible mot de passe écrit en clair : retire les secrets du code.");
    return erreurs;
}

selectionner("#bouton-analyser").addEventListener("click", async () => {
    const texte = contenuAnalyse.value;
    const panneau = selectionner("#panneau-resultat-analyse");
    const titre = selectionner("#titre-analyse");
    const icone = selectionner("#icone-cadenas");
    const animation = selectionner("#animation-scan");
    const liste = selectionner("#liste-erreurs");
    const statut = selectionner("#texte-scan");
    if (!texte.trim()) {
        statut.textContent = "INPUT REQUIRED — ADD TEXT OR LOAD A FILE.";
        jouerSonNexus("erreur");
        return;
    }
    jouerSonNexus("scan");
    panneau.classList.remove("etat-erreur", "etat-succes");
    titre.textContent = "SCANNING DATA...";
    icone.textContent = "◉";
    statut.textContent = "SCANNING STRUCTURE / CHECKING SOURCE / VERIFYING PATTERNS";
    liste.innerHTML = "<p class='message-attente'>◌ ANALYSIS IN PROGRESS...</p>";
    selectionner("#bouton-telecharger-rapport").disabled = true;
    selectionner("#bouton-telecharger-source").disabled = true;
    await new Promise((resolution) => setTimeout(resolution, 1450));
    const erreurs = analyserSource(texte, nomSourceAnalyse);
    const date = new Date().toLocaleString("fr-FR");
    if (erreurs.length) {
        panneau.classList.add("etat-erreur");
        titre.textContent = `⚠ ${erreurs.length} ISSUE(S) FOUND`;
        icone.textContent = "⚠";
        statut.textContent = "SCAN COMPLETE — ATTENTION REQUIRED";
        liste.innerHTML = erreurs.map((erreur) => `<p class="ligne-rapport erreur">⚠ ERROR / ${erreur.replace(/[<>]/g, "")}</p>`).join("");
        rapportAnalyse = `NEXUS MATRIX — RAPPORT D'ANALYSE\nDate : ${date}\nFichier : ${nomSourceAnalyse}\nStatut : ERREURS DÉTECTÉES\n\n${erreurs.map((erreur, index) => `${index + 1}. ${erreur}`).join("\n")}`;
        sourceNettoyee = "";
        jouerSonNexus("erreur");
    } else {
        panneau.classList.add("etat-succes");
        titre.textContent = "✓ SCAN SUCCESSFUL";
        icone.textContent = "♙";
        statut.textContent = "ALL STATIC CHECKS PASSED — ACCESS GRANTED";
        liste.innerHTML = "<p class='ligne-rapport succes'>✓ No issue detected by the available static checks.</p><p class='ligne-rapport succes'>✓ Source file is ready to download.</p><p class='ligne-rapport succes'>✓ No code was executed during this scan.</p>";
        rapportAnalyse = `NEXUS MATRIX — RAPPORT D'ANALYSE\nDate : ${date}\nFichier : ${nomSourceAnalyse}\nStatut : SUCCÈS\nAucune erreur détectée par les contrôles statiques disponibles.`;
        sourceNettoyee = texte;
        jouerSonNexus("success");
    }
    selectionner("#bouton-telecharger-rapport").disabled = false;
    selectionner("#bouton-telecharger-source").disabled = erreurs.length > 0;
});

selectionner("#bouton-telecharger-rapport").addEventListener("click", () => {
    if (rapportAnalyse) telechargerTexte("nexus-rapport-analyse.txt", rapportAnalyse);
});

selectionner("#bouton-telecharger-source").addEventListener("click", () => {
    if (sourceNettoyee) telechargerTexte(`nexus-${nomSourceAnalyse}`, sourceNettoyee);
});

/* Le son de démarrage est déclenché après le premier geste autorisé du visiteur. */
let sonDemarrageJoue = false;
document.addEventListener("pointerdown", () => {
    if (!sonDemarrageJoue && sonsActifs) {
        sonDemarrageJoue = true;
        jouerSonNexus("boot");
    }
}, { once: true });

/* -------------------- PLUIE MATRIX HORIZONTALE DANS LE PANNEAU CRYPTO -------------------- */
const toileCrypto = selectionner("#pluie-crypto");
const contexteCrypto = toileCrypto.getContext("2d");
const panneauCrypto = selectionner(".panneau-info-crypto");
const alphabetCrypto = "01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";
let lignesCrypto = [];
let animationCrypto = null;
let largeurCrypto = 0;
let hauteurCrypto = 0;

function preparerPluieCrypto() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    largeurCrypto = panneauCrypto.clientWidth;
    hauteurCrypto = panneauCrypto.clientHeight;
    toileCrypto.width = largeurCrypto * ratio;
    toileCrypto.height = hauteurCrypto * ratio;
    toileCrypto.style.width = `${largeurCrypto}px`;
    toileCrypto.style.height = `${hauteurCrypto}px`;
    contexteCrypto.setTransform(ratio, 0, 0, ratio, 0, 0);
    lignesCrypto = Array.from({ length: Math.ceil(hauteurCrypto / 18) }, () => ({
        x: Math.random() * largeurCrypto,
        vitesse: 1.1 + Math.random() * 2.4,
        texte: Array.from({ length: Math.ceil(largeurCrypto / 10) + 8 }, () => alphabetCrypto[Math.floor(Math.random() * alphabetCrypto.length)]).join("")
    }));
}

function dessinerPluieCrypto() {
    contexteCrypto.fillStyle = "rgba(1, 8, 6, .16)";
    contexteCrypto.fillRect(0, 0, largeurCrypto, hauteurCrypto);
    contexteCrypto.font = "11px monospace";
    lignesCrypto.forEach((ligne, index) => {
        const y = index * 18 + 12;
        const texte = ligne.texte;
        contexteCrypto.fillStyle = index % 4 === 0 ? "#baff72" : "#00e8a4";
        contexteCrypto.shadowColor = "#00ffc3";
        contexteCrypto.shadowBlur = 7;
        contexteCrypto.fillText(texte, ligne.x, y);
        ligne.x += ligne.vitesse;
        if (ligne.x > largeurCrypto + contexteCrypto.measureText(texte).width) {
            ligne.x = -contexteCrypto.measureText(texte).width;
            ligne.vitesse = 1.1 + Math.random() * 2.4;
        }
    });
    contexteCrypto.shadowBlur = 0;
    animationCrypto = requestAnimationFrame(dessinerPluieCrypto);
}

preparerPluieCrypto();
dessinerPluieCrypto();
window.addEventListener("resize", preparerPluieCrypto);

/* -------------------- LANGUES : ANGLAIS, FRANÇAIS, CHINOIS ET ALLEMAND -------------------- */
const selecteurLangue = selectionner("#selecteur-langue");
const textesLangues = {
    en: {
        nav_overview: "OVERVIEW", nav_security: "SECURITY", nav_dashboard: "DASHBOARD", nav_code: "CODE LAB", nav_crypto: "CRYPTO LAB", nav_scan: "SYSTEM SCAN", nav_contact: "CONTACT",
        crypto_title: "YOUR DATA.<br><span>YOUR KEY.</span>",
        crypto_description: "Encryption uses AES-GCM with a key derived from your password. Keep your key safe: without it, decryption is impossible.",
        dashboard_title: "System Overview", refresh: "↻ REFRESH DATA", tx_logs: "◉ TX_LOGS", view_all: "[ VIEW ALL ]", sys_prefs: "SYS_PREFS"
    },
    fr: {
        nav_overview: "VUE GÉNÉRALE", nav_security: "SÉCURITÉ", nav_dashboard: "TABLEAU DE BORD", nav_code: "LABO CODE", nav_crypto: "LABO CRYPTO", nav_scan: "ANALYSE SYSTÈME", nav_contact: "CONTACT",
        crypto_title: "VOS DONNÉES.<br><span>VOTRE CLÉ.</span>",
        crypto_description: "Le chiffrement utilise AES-GCM avec une clé dérivée de ton mot de passe. Garde ta clé : sans elle, le déchiffrement est impossible.",
        dashboard_title: "Vue du système", refresh: "↻ ACTUALISER", tx_logs: "◉ JOURNAUX_TX", view_all: "[ TOUT VOIR ]", sys_prefs: "PRÉF_SYSTÈME"
    },
    zh: {
        nav_overview: "总览", nav_security: "安全中心", nav_dashboard: "控制面板", nav_code: "代码实验室", nav_crypto: "加密实验室", nav_scan: "系统扫描", nav_contact: "联系",
        crypto_title: "你的数据。<br><span>你的密钥。</span>",
        crypto_description: "加密使用 AES-GCM，并通过你的密码派生密钥。请妥善保存密钥：没有密钥就无法解密。",
        dashboard_title: "系统总览", refresh: "↻ 刷新数据", tx_logs: "◉ 传输日志", view_all: "[ 查看全部 ]", sys_prefs: "系统设置"
    },
    de: {
        nav_overview: "ÜBERSICHT", nav_security: "SICHERHEIT", nav_dashboard: "DASHBOARD", nav_code: "CODE-LABOR", nav_crypto: "KRYPTO-LABOR", nav_scan: "SYSTEMSCAN", nav_contact: "KONTAKT",
        crypto_title: "DEINE DATEN.<br><span>DEIN SCHLÜSSEL.</span>",
        crypto_description: "Die Verschlüsselung verwendet AES-GCM mit einem aus deinem Passwort abgeleiteten Schlüssel. Bewahre ihn sicher auf: Ohne ihn ist keine Entschlüsselung möglich.",
        dashboard_title: "Systemübersicht", refresh: "↻ DATEN AKTUALISIEREN", tx_logs: "◉ TX-PROTOKOLLE", view_all: "[ ALLE ANZEIGEN ]", sys_prefs: "SYSTEMOPTIONEN"
    }
};

function changerLangue(langue) {
    const dictionnaire = textesLangues[langue] || textesLangues.en;
    document.documentElement.lang = langue;
    selectionnerTout("[data-i18n]").forEach((element) => {
        const cle = element.dataset.i18n;
        if (dictionnaire[cle]) element.innerHTML = dictionnaire[cle];
    });
}

selecteurLangue.addEventListener("change", () => changerLangue(selecteurLangue.value));
changerLangue("en");

/* -------------------- DASHBOARD : COMMANDES ET PRÉFÉRENCES INTERACTIVES -------------------- */
selectionnerTout(".ligne-preference input").forEach((casePreference) => {
    casePreference.addEventListener("change", () => {
        const nomPreference = casePreference.closest(".ligne-preference").querySelector("span");
        nomPreference.classList.toggle("etat-preference", casePreference.checked);
        const journal = selectionner("#corps-journal");
        const ligne = document.createElement("tr");
        const heure = new Date().toLocaleTimeString();
        ligne.innerHTML = `<td><i class="point-tableau"></i> ${casePreference.checked ? "ENABLE" : "DISABLE"}_${nomPreference.childNodes[0].textContent.trim()}</td><td class="valeur-positive">${casePreference.checked ? "ON" : "OFF"}</td><td>${heure}</td>`;
        journal.prepend(ligne);
    });
});

selectionner("#bouton-preferences").addEventListener("click", () => {
    selectionner(".panneau-preferences").scrollIntoView({ behavior: "smooth", block: "center" });
    selectionner(".panneau-preferences").style.boxShadow = "0 0 24px rgba(0,255,195,.22)";
    setTimeout(() => selectionner(".panneau-preferences").style.boxShadow = "", 1400);
});

selectionner("#bouton-reseau").addEventListener("click", () => {
    const statut = selectionner(".entete-dashboard p");
    statut.innerHTML = "NETWORK: <b>CONNECTED</b> <span>•</span> LATENCY: " + (18 + Math.floor(Math.random() * 24)) + " ms";
    selectionner("#bouton-reseau").classList.add("etat-preference");
});
