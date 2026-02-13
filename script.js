import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Remplace par ton URL et ta clé publique
const supabaseUrl = "https://uxartdzzansqlvvbcaxc.supabase.co";  


const supabaseKey = "sb_publishable_lcEMhWEGF2YxnQTj2BgshA_R6j13Nug";

const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour insérer un client
async function envoyerClient(client) {
  const { data, error } = await supabase
    .from("client")
    .insert([client]);

  if (error) {
    console.error(error);
    alert("Erreur lors de l'envoi");
  } else {
    alert("votre message a ete envoyer dans la boite de Mr samuel !");
  window.location.href = "/fellicitationformulaire.html";

  }
}




// Fonction pour afficher tous les clients
async function afficherClients() {
  const { data, error } = await supabase
    .from("client")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const ul = document.getElementById("liste-clients");
  ul.innerHTML = "";

  data.forEach(client => {
    const li = document.createElement("li");
    li.textContent = `${client.nom} – ${client.mail} – ${client.message}`;
    ul.appendChild(li);
  });
}

// Gestion du formulaire
document.getElementById("form-client").addEventListener("submit", function(e) {
  e.preventDefault();

  const client = {
    nom: document.getElementById("nom").value,
    mail: document.getElementById("mail").value,
    adresse: document.getElementById("adresse").value,
    message: document.getElementById("message").value
  };

  envoyerClient(client);

  // Reset du formulaire
  e.target.reset();

});

// Affichage initial
afficherClients();



// ===============================
// ENVOI FORMULAIRE CONTACT SUPRA → SUPABASE
// ===============================

async function envoyerInscriptionSupra(inscription) {
  const { error } = await supabase
    .from("Supra")
    .insert([inscription]);

  if (error) {
    console.error("Erreur Supabase :", error);
    alert("Erreur lors de l'inscription : " + error.message);
  } else {
    // ✅ Redirection après succès
    window.location.href = "/felicitations.html";
  }
}







// ===============================
// GESTION DU FORMULAIRE
// ===============================

document.getElementById("form-supra").addEventListener("submit", function (e) {
  e.preventDefault();

  // 🔹 Zone (France / Hors France)
  const zone = document.querySelector('input[name="zone"]:checked')?.value;

  // 🔹 Mode de validation (gmail / whatsapp)
  const validation = document.querySelector('input[name="validation"]:checked')?.value;

  if (!zone || !validation) {
    alert("Veuillez choisir une zone et un mode de validation.");
    return;
  }

  // 🔹 Calcul du montant
  const montant = zone === "France" ? 99 : 125;

  // 🔹 Objet envoyé à Supabase
  const inscription = {
    nom: document.getElementById("nom").value,
    prenom: document.getElementById("prenom").value,
    adresse: document.getElementById("adresse").value,
    code_postal: document.getElementById("code_postal").value,
    ville: document.getElementById("ville").value,
    pays: document.getElementById("pays").value,
    date_naissance: document.getElementById("date_naissance").value,
    email: document.getElementById("email").value,
    telephone: document.getElementById("telephone").value,
    zone: zone,
    validation: validation,
    montant: montant
  };

  // 🔹 Envoi vers Supabase
  envoyerInscriptionSupra(inscription);
      alert("votre message a ete envoyer dans la boite de Mr samuel !");
});
