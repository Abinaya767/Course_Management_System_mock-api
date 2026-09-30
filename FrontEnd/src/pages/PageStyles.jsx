import { useEffect } from "react";

export default function PageStyles({ href }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.learnspacePageStyle = "true";
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [href]);

  return null;
}
