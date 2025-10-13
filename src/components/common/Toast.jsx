// RUTA: src/components/common/Toast.jsx

import React, { useEffect } from 'react';

function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // El toast desaparecerá después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className="toast-notification">
      {message}
    </div>
  );
}

export default Toast;