import { Application, Container, Renderer } from "pixi.js";

export class SceneManager {
  private app: Application<Renderer>;
  private currentScene: Container | null;
  constructor(app: Application<Renderer>, currentScene?: null) {
    this.app = app;
    this.currentScene = currentScene || null;
  }

  switchScene({
    newScene,
    withDestroyOldScene,
    onChangeSceneCb,
  }: {
    newScene: Container;
    withDestroyOldScene?: boolean;
    onChangeSceneCb?: () => void;
  }) {
    // Удаляем текущую сцену со stage, если она есть
    if (this.currentScene) {
      this.app.stage.removeChild(this.currentScene);
      if (withDestroyOldScene) {
        this.currentScene.destroy();
        onChangeSceneCb?.();
      }
    }
    this.currentScene = newScene;
    this.app.stage.addChild(this.currentScene);
  }
}
