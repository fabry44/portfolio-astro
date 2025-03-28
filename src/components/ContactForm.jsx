import { useState } from 'react';

function ContactForm() {
  // États pour contrôles du formulaire (facultatif, selon besoins de traitement)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: logiques d'envoi du formulaire (API, email, etc.)
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} 
          className="max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg 
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
          placeholder="Entrez votre prénom"
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
          placeholder="Entrez votre nom"
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
          placeholder="Votre téléphone"
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
      {/* Bouton d'envoi */}
      <div className="md:col-span-2 text-center mt-2">
        <button 
          type="submit"
          className="inline-block bg-[#3A7E8D] text-white font-semibold text-lg py-3 px-8 rounded-md 
                     shadow-md hover:bg-[#52A5B8] hover:shadow-lg 
                     focus:outline-none focus:ring-4 focus:ring-[#C8EBF2] focus:ring-opacity-50 
                     transition-colors duration-300"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
