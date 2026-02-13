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
// FORMULAIRE SUPRA → SUPABASE
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-supra");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // bloque le submit natif
    console.log("Formulaire soumis"); // DEBUG

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
      nom: document.getElementById("nom").value.trim(),
      prenom: document.getElementById("prenom").value.trim(),
      adresse: document.getElementById("adresse").value.trim(),
      code_postal: document.getElementById("code_postal").value.trim(),
      ville: document.getElementById("ville").value.trim(),
      pays: document.getElementById("pays").value.trim(),
      date_naissance: document.getElementById("date_naissance").value,
      email: document.getElementById("email").value.trim(),
      telephone: document.getElementById("telephone").value.trim(),
      zone: zone,
      validation: validation,
      montant: montant
    };

    console.log("Données à envoyer :", inscription); // DEBUG

    try {
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
    } catch (err) {
      console.error("Erreur JS :", err);
      alert("Une erreur inattendue est survenue.");
    }
  });
});

