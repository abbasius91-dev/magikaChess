import { app } from "@/core";

type CreateAppOptions = {
  background?: string | number;
  resizeTo?: Window | HTMLElement;
  autoDensity?: boolean;
  antialias?: boolean;
  containerId?: string; // id DOM-элемента для монтирования canvas
};

export async function initPixiApp(options: CreateAppOptions = {}) {
  const {
    background = "#1099bb",
    resizeTo = window,
    autoDensity = true,
    antialias = true,
    containerId = "pixi-container",
  } = options;

  await app.init({
    background,
    resizeTo,
    antialias,
    autoDensity,
  });

  const container = document.getElementById(containerId);

  if (!container) {
    throw new Error(`Container with id="${containerId}" not found`);
  }

  container.appendChild(app.canvas);
}
