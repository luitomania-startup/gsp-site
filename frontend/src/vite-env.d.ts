/// <reference types="vite/client" />

declare type AnyFunction = (...args: any[]) => any
interface ImportMetaEnv {
  readonly VITE_SERVERURL: string
  readonly VITE_CLOUD_NAME: string
  readonly VITE_CLOUDINARY_API_KEY: string
  readonly VITE_CLOUDINARY_API_SECRET: string
  // more env variables...
}
