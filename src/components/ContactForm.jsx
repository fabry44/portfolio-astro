import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    rgpd: false,
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const validateForm = (data) => {
    if (!data.firstName.trim()) return "Le prénom est obligatoire.";
    if (!data.lastName.trim()) return "Le nom est obligatoire.";
    if (!data.email.trim()) return "L'email est obligatoire.";
    if (!data.message.trim()) return "Le message ne peut pas être vide.";
    if (!data.rgpd) return "Vous devez accepter la politique RGPD.";
    return null;
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 5000);
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(formData);
    if (error) {
      showToast(error, "error");
      return;
    }

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        showToast("✅ Message envoyé avec succès !");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          rgpd: false,
        });
      } else {
        showToast(`❌ Erreur : ${result.error}`, "error");
      }
    } catch (err) {
      console.error("Erreur:", err);
      showToast("❌ Échec de l'envoi du message.", "error");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        id="contactForm"
        className="max-w-2xl mx-auto p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Champ Prénom */}
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium text-[#454647] mb-1">
            Prénom <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            autoComplete="given-name"
            className="p-3 rounded-md border border-gray-300 bg-[#FAFAFA] text-[#454647] focus:outline-none focus:border-[#52A5B8] focus:ring-2 focus:ring-[#52A5B8] focus:bg-[#C8EBF2]"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Votre prénom"
          />
        </div>

        {/* Champ Nom */}
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-sm font-medium text-[#454647] mb-1">
            Nom <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            autoComplete="family-name"
            className="p-3 rounded-md border border-gray-300 bg-[#FAFAFA] text-[#454647] focus:outline-none focus:border-[#52A5B8] focus:ring-2 focus:ring-[#52A5B8] focus:bg-[#C8EBF2]"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Votre nom"
          />
        </div>

        {/* Champ Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-[#454647] mb-1">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            className="p-3 rounded-md border border-gray-300 bg-[#FAFAFA] text-[#454647] focus:outline-none focus:border-[#52A5B8] focus:ring-2 focus:ring-[#52A5B8] focus:bg-[#C8EBF2]"
            value={formData.email}
            onChange={handleChange}
            placeholder="Votre adresse email"
          />
        </div>

        {/* Champ Téléphone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium text-[#454647] mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            className="p-3 rounded-md border border-gray-300 bg-[#FAFAFA] text-[#454647] focus:outline-none focus:border-[#52A5B8] focus:ring-2 focus:ring-[#52A5B8] focus:bg-[#C8EBF2]"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Votre n° de téléphone"
          />
        </div>

        {/* Champ Message */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-[#454647] mb-1">
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            className="p-3 rounded-md border border-gray-300 bg-[#FAFAFA] text-[#454647] focus:outline-none focus:border-[#52A5B8] focus:ring-2 focus:ring-[#52A5B8] focus:bg-[#C8EBF2] resize-vertical"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message..."
          />
        </div>

        {/* Consentement RGPD */}
        <div className="flex items-center md:col-span-2 mt-2">
          <input
            type="checkbox"
            id="rgpd"
            name="rgpd"
            required
            className="mr-2"
            checked={formData.rgpd}
            onChange={handleChange}
          />
          <label htmlFor="rgpd" className="text-sm text-[#454647]">
            J'accepte que mes données soient utilisées pour me contacter. Elles ne seront jamais partagées.
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
        </div>
      </form>

      {/* Toast de notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${
              toast.type === "error" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ContactForm;
