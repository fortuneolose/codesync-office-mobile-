declare namespace NodeJS {
  type ProcessEnv = {
    EXPO_PUBLIC_NOTES_API_URL?: string;
    EXPO_PUBLIC_NOTES_API_TOKEN?: string;
  };
}

declare const process: {
  env: NodeJS.ProcessEnv;
};
