import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Envoi en cours...");
  
    try {
        const response = await fetch("/api/send-contact", { // 🔐 Contacte Astro (et non plus Symfony directement)
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
  
        const result = await response.json();
        if (response.ok) {
            setStatus(result.message);
            setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        } else {
            setStatus(`Erreur : ${result.error}`);
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi:", error.message);
        setStatus("Échec de l'envoi du message.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-wrap mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-b-2 border-gray-300 focus:border-blue-600"
            placeholder="Prénom"
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-b-2 border-gray-300 focus:border-blue-600"
            placeholder="Nom"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-b-2 border-gray-300 focus:border-blue-600"
            placeholder="Email"
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-b-2 border-gray-300 focus:border-blue-600"
            placeholder="Téléphone"
            required
          />
        </div>
      </div>
      <textarea
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="block py-2.5 px-0 w-full h-48 text-sm text-white bg-transparent border-2 border-gray-300 focus:border-blue-600"
        placeholder="Votre message"
        required
      ></textarea>
      
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Envoyer</button>
      <p>{status}</p>
    </form>
  );
};

export default ContactForm;
