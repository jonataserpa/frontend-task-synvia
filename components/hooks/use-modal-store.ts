import { ITaskProps } from "@/app/(tasks)/(routes)/tasks/interfaces/iTask.interface";
import { create } from "zustand";

export type ModalType = "createService" | "editService" | "deleteService";

export interface ModalData {
  server?: ITaskProps;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
