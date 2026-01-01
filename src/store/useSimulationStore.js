import { create } from 'zustand';
import api from '@/lib/api';

const useSimulationStore = create((set, get) => ({
  simulations: [],
  activeSimulation: null,
  activeMessages: [],
  loading: false,
  error: null,

  // Fetch all simulations for a user
  fetchSimulations: async (userId) => {
    // userId parameter kept for backward compatibility but not used
    // Backend uses authenticated user from token
    set({ loading: true, error: null });
    try {
      const res = await api.get('/simulations');
      if (res.data.success) {
        // Backend returns { items: [...], total, limit, skip }
        const data = res.data.data;
        set({ simulations: data.items || data || [] });
      }
    } catch (error) {
      console.error("Fetch simulations error:", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Set the active simulation and fetch its details/messages if needed
  setActiveSimulation: async (simulationId) => {
    set({ loading: true, error: null });
    try {
      // Opt: fetch fresh details or messages
      const res = await api.get(`/simulations/${simulationId}`);
      if (res.data.success) {
        set({ activeSimulation: res.data.data });
      }
      
      // Fetch messages for this simulation
      const msgRes = await api.get(`/simulations/${simulationId}/messages`);
      if (msgRes.data.success) {
        set({ activeMessages: msgRes.data.data });
      }
    } catch (error) {
      console.error("Set active simulation error:", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Add a message to the active simulation (optimistic + real)
  sendMessage: async (simulationId, content) => {
    const { activeMessages } = get();
    // Optimistic update could go here
    try {
      const res = await api.post(`/simulations/${simulationId}/messages`, { content });
      if (res.data.success) {
        // Append new message
        set({ activeMessages: [...activeMessages, res.data.data] });
      }
    } catch (error) {
      console.error("Send message error:", error);
      // Revert optimistic update if needed
    }
  },
  
  // Reset store
  reset: () => set({ simulations: [], activeSimulation: null, activeMessages: [], error: null })
}));

export default useSimulationStore;
