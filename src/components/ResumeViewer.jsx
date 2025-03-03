import React from '@astrojs/react';

const ResumeViewer = () => {
  return (
    <div>
      <iframe src="/resume.html" width="100%" height="600px" title="Resume"></iframe>
      <a href="/resume.pdf" download="resume.pdf">
        Télécharger le CV en PDF
      </a>
    </div>
  );
};

export default ResumeViewer;
