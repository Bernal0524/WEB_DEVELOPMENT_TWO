import React, { useRef, useEffect, useCallback } from 'react';
import useNotificationStore from '../notificationStore';

const Notification = () => {
  const { notifications, removeNotification } = useNotificationStore(state => state);
  const notificationRef = useRef(null);  // Referencia para el contenedor de la notificación

  // Cerrar la notificación cuando se hace clic fuera de ella
  const handleClickOutside = useCallback((event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      // Si el clic fue fuera de la notificación, eliminarla
      removeNotification(notifications[0]?.id);  // Asegurarse de que haya notificaciones
    }
  }, [notifications, removeNotification]);  // Dependencias de notifications y removeNotification

  // Usar el hook useEffect para agregar y limpiar el evento de clic
  useEffect(() => {
    // Agregar el evento de clic cuando el componente se monta
    document.addEventListener('click', handleClickOutside);

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]); // Asegurarnos de que useEffect se ejecute solo cuando handleClickOutside cambie

  return (
    <div className="notification-container">
      {notifications.map((notif) => (
        <div 
          key={notif.id} 
          className={`notification ${notif.type}`} 
          ref={notificationRef} // Asignamos el ref al contenedor de la notificación
        >
          <p>{notif.message}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();  // Evitar que el clic en el botón cierre la notificación
              removeNotification(notif.id);  // Eliminar la notificación manualmente
            }}
            className="close-btn"
          >
            Cerrar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
