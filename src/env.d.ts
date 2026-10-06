interface ImportMetaEnv {
  readonly VITE_SITE_URL: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_INSTAGRAM_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Importar uma imagem com `&as=picture` no final devolve os arquivos gerados no build
// (vite-imagetools), prontos para o componente Picture.
declare module '*&as=picture' {
  const picture: import('./shared/ui/Picture').PictureImage;
  export default picture;
}
