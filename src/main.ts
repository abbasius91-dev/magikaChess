import { initPixiApp, sceneManager } from "@/core";
import { MenuScene } from "@/scenes";

(async () => {
  await initPixiApp({ background: "#00aa00", containerId: "pixi-container" });
  const menuScene = new MenuScene();
  sceneManager.switchScene({ newScene: menuScene });
})();
