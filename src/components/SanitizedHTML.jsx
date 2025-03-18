import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const SanitizedHTML = ({ htmlContent }) => {
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    setSafeHtml(DOMPurify.sanitize(htmlContent));
  }, [htmlContent]);

  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
};

export default SanitizedHTML;
