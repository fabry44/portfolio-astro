
import React from 'react';

const ResumeViewer = () => {
  return (
    <div>
      <iframe src="/cv_fabien_roy.html" width="100%" height="600px" title="Resume"></iframe>
      <a href="/cv_fabien_roy.pdf" download="cv_fabien_roy.pdf">
        Télécharger le CV en PDF
      </a>
    </div>
  );
};

export default ResumeViewer;
