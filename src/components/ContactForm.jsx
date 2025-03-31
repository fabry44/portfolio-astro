import { useState } from 'react';

function ContactForm() {
  // États pour contrôles du formulaire (facultatif, selon besoins de traitement)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    rgpd: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Envoi en cours...");
  
    try {
        const response = await fetch("/api/send-contact", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
  
        const result = await response.json();
        if (response.ok) {
            setStatus(result.message);
            setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "", rgpd: false });
        } else {
            setStatus(`Erreur : ${result.error}`);
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi:", error.message);
        setStatus("Échec de l'envoi du message.");
    }
  };


  return (
    <form onSubmit={handleSubmit} 
          id="contactForm"
          className="max-w-2xl mx-auto p-8 rounded-lg 
                     grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Champ Prénom */}
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-sm font-medium text-[#454647] mb-1">
          Prénom <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input 
          type="text" id="firstName" name="firstName" required 
          autoComplete="given-name"
          className="p-3 rounded-md border border-gray-300 bg-[#FAFAFA] text-[#454647] 
                     focus:outline-none focus:border-[#52A5B8] focus:ring-2 focus:ring-[#52A5B8] 
                     focus:bg-[#C8EBF2]"
          value={formData.firstName} onChange={handleChange} 
          placeholder="Votre prénom"
        />
      </div>
      {/* Champ Nom */}
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-sm font-medium text-[#454647] mb-1">
          Nom <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input 
          type="text" id="lastName" name="lastName" required 
          autoComplete="family-name"
          className="p-3 rounded-md border border-gray-300 bg-[#FAFAFA] text-[#454647] 
                     focus:outline-none focus:border-[#52A5B8] focus:ring-2 focus:ring-[#52A5B8] 
                     focus:bg[#C8EBF2]"
          value={formData.lastName} onChange={handleChange} 
          placeholder="Votre nom"
        />
      </div>
      {/* Champ Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-[#454647] mb-1">
          Email <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input 
          type="email" id="email" name="email" required 
          autoComplete="email"
          className="p-3 rounded-md border border-gray-300 bg-[#FAFAFA] text-[#454647] 
                     focus:outline-none focus:border-[#52A5B8] focus:ring-2 focus:ring-[#52A5B8] 
                     focus:bg-[#C8EBF2]"
          value={formData.email} onChange={handleChange} 
          placeholder="Votre adresse email"
        />
      </div>
      {/* Champ Téléphone */}
      <div className="flex flex-col">
        <label htmlFor="phone" className="text-sm font-medium text-[#454647] mb-1">
          Téléphone
        </label>
        <input 
          type="tel" id="phone" name="phone" 
          autoComplete="tel"
          className="p-3 rounded-md border border-gray-300 bg-[#FAFAFA] text-[#454647] 
                     focus:outline-none focus:border-[#52A5B8] focus:ring-2 focus:ring-[#52A5B8] 
                     focus:bg-[#C8EBF2]"
          value={formData.phone} onChange={handleChange} 
          placeholder="Votre n° de téléphone"
        />
      </div>
      {/* Champ Message (texte multiligne) */}
      <div className="flex flex-col md:col-span-2">
        <label htmlFor="message" className="text-sm font-medium text-[#454647] mb-1">
          Message <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <textarea 
          id="message" name="message" required 
          rows="5"
          className="p-3 rounded-md border border-gray-300 bg-[#FAFAFA] text-[#454647] 
                     focus:outline-none focus:border-[#52A5B8] focus:ring-2 focus:ring-[#52A5B8] 
                     focus:bg-[#C8EBF2] resize-vertical"
          value={formData.message} onChange={handleChange} 
          placeholder="Votre message..."
        />
      </div>
      {/* Champ Consentement RGPD */}
      <div className="flex items-center md:col-span-2 mt-2">
        <input 
          type="checkbox" id="rgpd" name="consent" required 
          className="mr-2" value={formData.rgpd} onChange={handleChange} 
        />
        <label htmlFor="rgpd" className="text-sm text-[#454647]">
          J'accepte que mes données soient utilisées pour me contacter.
          Les données collectées ne sont pas utilisées à d'autres fins de traitement.
          Vous pouvez demander leur suppression à tout moment.
          Aucune information personnelle n'est collectée sans votre consentement et ne seront jamais partagées avec des tiers.
        </label>
      </div>
      {/* Bouton d'envoi */}
      <div className="md:col-span-2 text-center mt-2">
        <button 
          type="submit"
          className="cta focus:ring-opacity-50 transition-colors duration-300 py-2 px-4 rounded"
        >
          Envoyer
        </button>
        <p>{status}</p>
      </div>
    </form>
  );
}

export default ContactForm;
