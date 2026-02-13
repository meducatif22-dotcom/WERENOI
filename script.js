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
    afficherClients();
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
  
      // ✅ Redirection après succès
      window.location.href = "merci.html";
});

// Affichage initial
afficherClients();
