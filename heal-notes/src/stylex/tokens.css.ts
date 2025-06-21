// stylex/constants.ts

export const colors = {
  // Основные
  primary: "#6C63FF", // мягкий синий-фиолетовый (успокаивает)
  secondary: "#A0AEC0", // мягкий серо-голубой (нейтральный, расслабляет)
  success: "#81E6D9", // нежный мятный (восстановление, свежесть)
  danger: "#F56565", // мягкий коралловый (осторожность, акцент)

  // Текст и фон
  textPrimary: "#2D3748", // тёмно-серый (читаемый, мягкий)
  textSecondary: "#718096", // светло-серый (второстепенный)
  background: "#F7FAFC", // очень светло-голубой (спокойный фон)
  backgroundAlt: "#E2E8F0", // чуть темнее для выделения блоков

  // Дополнительные спокойные оттенки для UI
  pastelPink: "#FED7E2",
  pastelLavender: "#E9D8FD",
  pastelPeach: "#FFE5D9",
  pastelMint: "#D1FAE5",
  pastelBlue: "#BEE3F8",

  // Тени и разделители
  shadowLight: "rgba(0, 0, 0, 0.05)",
  borderLight: "#CBD5E0",
};
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radii = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
};

export const breakpoints = {
  xs: 480,   // очень маленькие экраны (телефоны)
  sm: 768,   // маленькие экраны (большие телефоны, мелкие планшеты)
  md: 992,   // средние экраны (планшеты)
  lg: 1200,  // большие экраны (ноутбуки)
  xl: 1440,  // очень большие экраны (десктопы, широкие мониторы)
};
