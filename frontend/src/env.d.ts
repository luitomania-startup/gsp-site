/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVERURL: string;
  readonly VITE_CLOUD_NAME: string;
  readonly VITE_CLOUDINARY_API_KEY: string;
  readonly VITE_CLOUDINARY_API_SECRET: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
