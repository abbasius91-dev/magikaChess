import { Application, EventEmitter } from "pixi.js";
import { SceneManager } from "./SceneManager";

export const app = new Application();

export const eventEmitter = new EventEmitter();

export const sceneManager = new SceneManager(app);
