import { Application, Container } from "pixi.js";
import { SceneManager } from "./SceneManager";

export const app = new Application();

export const sceneManager = new SceneManager(app, new Container())