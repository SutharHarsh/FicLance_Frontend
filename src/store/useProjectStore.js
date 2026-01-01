import { create } from "zustand";
import api from "@/lib/api";

const useProjectStore = create((set) => ({
  inProgress: [],
  completed: [],
  deadlines: [],
  deadlinesPassed: [],
  loading: false,
  error: null,

  fetchInProgress: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/dashboard/projects?type=in-progress");
      if (res.data.success) {
        set({ inProgress: res.data.data });
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchCompleted: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/dashboard/projects?type=completed");
      if (res.data.success) {
        set({ completed: res.data.data });
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchDeadlines: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/dashboard/projects?type=deadlines");
      if (res.data.success) {
        set({ deadlines: res.data.data });
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchDeadlinesPassed: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/dashboard/projects?type=deadline-passed");
      if (res.data.success) {
        set({ deadlinesPassed: res.data.data });
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchAll: async () => {
    set({ loading: true });
    try {
      const [inProgressRes, completedRes, deadlinesRes, deadlinesPassedRes] =
        await Promise.all([
          api.get("/dashboard/projects?type=in-progress"),
          api.get("/dashboard/projects?type=completed"),
          api.get("/dashboard/projects?type=deadlines"),
          api.get("/dashboard/projects?type=deadline-passed"),
        ]);

      if (inProgressRes.data.success)
        set({ inProgress: inProgressRes.data.data });
      if (completedRes.data.success) set({ completed: completedRes.data.data });
      if (deadlinesRes.data.success) set({ deadlines: deadlinesRes.data.data });
      if (deadlinesPassedRes.data.success)
        set({ deadlinesPassed: deadlinesPassedRes.data.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProjectStore;
