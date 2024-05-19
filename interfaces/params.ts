import { Contact } from "./contact";

// types.ts
export type RootStackParamList = {
    index: undefined;
    contact: { id: string };
    'contact-form': { payload?: Contact | null }
};
  