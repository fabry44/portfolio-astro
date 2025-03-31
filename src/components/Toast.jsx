// src/components/Toast.jsx
import { motion, AnimatePresence } from "framer-motion";

function Toast({ message, type = "success", onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded shadow-lg text-white ${
            type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{message}</span>
            <button onClick={onClose} className="ml-2 font-bold">×</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
