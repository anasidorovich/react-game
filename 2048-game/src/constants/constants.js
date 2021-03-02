export const GAME = {
  gridWidth: window.innerWidth < 520 ? 0.9 * window.innerWidth : 500,
  gridMargin: 16,
  gridSize: 4,
  tileSize: window.innerWidth > 520 ? 105 : 92.5,
  difficultyNum: 2048,
  theme: "primary",
};

export const LEVELS = [32, 1024, 2048, 4096];

export const gameOverPopup = {
  type: "game-over",
  title: "Game Over!",
  message: "Try one more time!",
};

export const winPopup = {
  type: "win",
  title: "You won!",
  message: "Congrats!",
};

export const THEMES = {
  classic: "https://bootswatch.com/4/flatly/bootstrap.min.css",
  primary: "https://bootswatch.com/4/pulse/bootstrap.min.css",
  dark: "https://bootswatch.com/4/lux/bootstrap.min.css",
};

export const themesMap = new Map();
themesMap.set("dark", "Lux");
themesMap.set("primary", "Pulse");

export const gridSizeMap = new Map();
gridSizeMap.set(4, "4 x 4");
gridSizeMap.set(5, "5 x 5");
gridSizeMap.set(6, "6 x 6");

export const storageNames = {
  score: "2048GameScore",
  soundsVolume: "2048GameSoundsVolume",
  musicVolume: "2048GameMusicVolume",
  bestScore: "2048GameBestScore",
  theme: "2048GameTheme",
  sound: "2048GameSound",
  level: "2048GameLevel",
  tileSize: "2048GameTileSize",
  gridSize: "2048GameSize",
};

export const hotKeys = {
  GO_TO_ABOUT: "ctrl+a",
  GO_TO_OPTIONS: "ctrl+o",
  MUTE: "ctrl+m",
  SWITCH_TU_PULSE: "ctrl+p",
  SWITCH_TO_LUX: "ctrl+d",
};
