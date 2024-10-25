export default {
  name: "rate-repository-app", // Nombre de la aplicación.
  slug: "rate-repository-app", // Identificador único en Expo para la app.
  version: "1.0.0", // Versión de la app.
  orientation: "portrait", // La aplicación solo se ejecutará en modo retrato.
  icon: "./assets/icon.png", // Icono de la aplicación.
  userInterfaceStyle: "light", // Forzar el estilo claro en la interfaz de usuario.
  splash: {
    image: "./assets/splash.png", // Imagen mostrada en la pantalla de carga.
    resizeMode: "contain", // Ajusta la imagen de splash para que se contenga dentro de la pantalla sin estirarse.
    backgroundColor: "#ffffff", // Color de fondo para la pantalla de carga.
  },
  jsEngine: "hermes",
  ios: {
    supportsTablet: true, // La aplicación es compatible con iPads.
  },
  android: {
    package: "com.yourdomain.raterepositoryapp", // Nombre del paquete Android.
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png", // Icono adaptable para Android.
      backgroundColor: "#ffffff", // Fondo del icono adaptable en Android.
    },
    supportsRtl: true,
  },
  web: {
    favicon: "./assets/favicon.png", // Icono para la pestaña del navegador cuando la app se abre en la web.
  },
};
