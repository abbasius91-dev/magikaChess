import { Application, Container, Renderer } from "pixi.js";

export class SceneManager {
  private app: Application<Renderer>;
  private currentScene: Container;
  constructor(app: Application<Renderer>, currentScene: Container) {
    this.app = app;
    this.currentScene = currentScene;
    this.init();
  }

  private init() {
    this.app.stage.addChild(this.currentScene);
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
    this.app.stage.removeChild();
    if (withDestroyOldScene) {
      this.currentScene.destroy();
      onChangeSceneCb?.();
    }
    this.currentScene = newScene;
    this.app.stage.addChild(this.currentScene);
  }
}
