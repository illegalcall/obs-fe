import { create } from 'zustand'

type State = {
  accountId: string
  name: string
}

type Action = {
  updateAccountId: (accountId: string) => void
  updateName: (name: string) => void
}

export const useStore = create<State & Action>((set) => ({
  accountId: "",
  name: "",
  updateAccountId: (accountId: string) => set(() => ({ accountId: accountId })),
  updateName: (name: string) => set(() => ({ name: name })),
}))