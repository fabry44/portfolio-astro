
import React from 'react';
import { motion } from 'framer-motion';

const ResumeViewer = () => {
  return (
    <div class="curriculum">
      <motion.iframe 
        initial={{ opacity: 0, y: 1000, scale: 0.0 }}
        animate={{ opacity: 1, y: 0, scale: 0.3 }}
        transition={{ duration: 1, delay: 0.3 }}
        whileTap={{ scale: 1.5 }}        
        src="/cv_fabien_roy.html"
        width="812" 
        height="1092" 
        title="Mon CV" />
      <br />
      <a class="font-bold py-2 px-4 rounded" href="/cv_fabien_roy.html">
          <i class="fas fa-view"></i>
        voir
      </a>
      <a class="font-bold py-2 px-4 rounded" href="/cv_fabien_roy.pdf" download="cv_fabien_roy.pdf">
          <i class="fas fa-download"></i>
        Télécharger
      </a>
    </div>
  );
};

export default ResumeViewer;
