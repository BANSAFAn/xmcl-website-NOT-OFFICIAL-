import { useState, useEffect, useCallback } from 'react';

function useNavigate() {
  const navigate = useCallback((to) => {
    if (typeof to === "string") {
      window.location.href = to;
    } else {
      if (to.pathname) {
        window.location.pathname = to.pathname;
      }
      if (to.hash) {
        window.location.hash = to.hash;
      }
    }
  }, []);
  return navigate;
}
function useParams() {
  const [params, setParams] = useState({});
  useEffect(() => {
    const updateParams = () => {
      const hash = window.location.hash;
      const newParams = {};
      if (hash && hash.length > 1) {
        newParams.id = hash.slice(1);
      }
      setParams(newParams);
    };
    updateParams();
    window.addEventListener("hashchange", updateParams);
    return () => window.removeEventListener("hashchange", updateParams);
  }, []);
  return params;
}

export { useNavigate as a, useParams as u };
