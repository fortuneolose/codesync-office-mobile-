import Constants from "expo-constants";

type ExpoExtra = {
  notesApiUrl?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as ExpoExtra;

export const NOTES_API_URL =
  process.env.EXPO_PUBLIC_NOTES_API_URL ?? extra.notesApiUrl ?? "http://localhost:8000/api";

export const NOTES_API_TOKEN = process.env.EXPO_PUBLIC_NOTES_API_TOKEN;
