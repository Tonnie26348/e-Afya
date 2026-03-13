import { create } from 'zustand';

export type UserRole = 'Doctor' | 'Pharmacist' | 'Admin' | 'CHW' | 'MinistryAnalyst';

interface User {
  name: string;
  role: UserRole;
  hospital: string;
}

interface AuthState {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const roleData: Record<UserRole, User> = {
  Doctor: { name: 'Dr. Amina Wanjiku', role: 'Doctor', hospital: 'Kenyatta National Hospital' },
  Pharmacist: { name: 'Pharm. David Omari', role: 'Pharmacist', hospital: 'Moi Teaching & Referral' },
  Admin: { name: 'Sarah Kemunto', role: 'Admin', hospital: 'Ministry of Health HQ' },
  CHW: { name: 'John Kamau', role: 'CHW', hospital: 'Kiambu Community Health' },
  MinistryAnalyst: { name: 'Robert Mwangi', role: 'MinistryAnalyst', hospital: 'National Health Analytics' },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: roleData['Admin'], // Default to Admin for now
  login: (role) => set({ user: roleData[role] }),
  logout: () => set({ user: null }),
}));
