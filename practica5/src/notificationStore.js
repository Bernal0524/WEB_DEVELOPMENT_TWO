import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [], // Lista de notificaciones

  // Agregar una notificación
  addNotification: (message, type) => set((state) => {
    const id = Date.now();  // Generar un id único basado en el timestamp
    const newNotification = { message, type, id };

    // Añadir la nueva notificación
    return {
      notifications: [...state.notifications, newNotification]
    };
  }),

  // Eliminar una notificación manualmente
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(notification => notification.id !== id)
  }))
}));

export default useNotificationStore;
