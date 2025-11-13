import { Container } from "pixi.js";
import { app } from "@/core";

export interface ButtonOptions {
  text: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  className?: string; // CSS класс для дополнительной стилизации
}

interface InternalButtonOptions {
  text: string;
  width: number;
  height: number;
  onClick?: () => void;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  className?: string;
}

export class Button extends Container {
  private htmlButton!: HTMLButtonElement;
  private options: InternalButtonOptions;
  private updatePositionBound: () => void;

  constructor(options: ButtonOptions) {
    super();

    // Значения по умолчанию
    this.options = {
      width: options.width ?? 200,
      height: options.height ?? 50,
      text: options.text,
      onClick: options.onClick,
      backgroundColor: options.backgroundColor ?? "#4a90e2",
      textColor: options.textColor ?? "#ffffff",
      fontSize: options.fontSize ?? 16,
      className: options.className,
    };

    this.updatePositionBound = this.updatePosition.bind(this);

    this.init();
  }

  private init() {
    // Создаем HTML элемент кнопки
    this.htmlButton = document.createElement("button");
    this.htmlButton.textContent = this.options.text;
    this.htmlButton.className = `pixi-button ${
      this.options.className || ""
    }`.trim();

    // Применяем стили
    this.applyStyles();

    // Добавляем обработчик клика
    if (this.options.onClick) {
      this.htmlButton.addEventListener("click", this.handleClick);
    }

    // Добавляем кнопку в DOM (в контейнер canvas)
    const canvasContainer = app.canvas.parentElement;
    if (canvasContainer) {
      canvasContainer.style.position = "relative";
      canvasContainer.appendChild(this.htmlButton);
    }

    // Обновляем позицию при изменении позиции контейнера
    this.on("added", this.updatePositionBound);
    this.on("removed", this.updatePositionBound);

    // Обновляем позицию при изменении размеров окна и canvas
    window.addEventListener("resize", this.updatePositionBound);
    app.renderer.on("resize", this.updatePositionBound);

    // Обновляем позицию с небольшой задержкой для корректной инициализации
    setTimeout(() => this.updatePosition(), 0);
  }

  private applyStyles() {
    const style = this.htmlButton.style;
    style.position = "absolute";
    style.width = `${this.options.width}px`;
    style.height = `${this.options.height}px`;
    style.backgroundColor = this.options.backgroundColor;
    style.color = this.options.textColor;
    style.fontSize = `${this.options.fontSize}px`;
    style.border = "none";
    style.borderRadius = "8px";
    style.cursor = "pointer";
    style.display = "flex";
    style.alignItems = "center";
    style.justifyContent = "center";
    style.fontFamily = "inherit";
    style.transition = "background-color 0.2s ease";
    style.pointerEvents = "auto";
    style.userSelect = "none";

    // Hover эффект через CSS
    this.htmlButton.addEventListener("mouseenter", () => {
      const rgb = this.hexToRgb(this.options.backgroundColor);
      if (rgb) {
        style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
      }
    });

    this.htmlButton.addEventListener("mouseleave", () => {
      style.backgroundColor = this.options.backgroundColor;
    });
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  private updatePosition() {
    if (!this.htmlButton || !app.canvas) return;

    // Получаем глобальные координаты контейнера в пространстве сцены
    const globalPos = this.getGlobalPosition();
    const canvasRect = app.canvas.getBoundingClientRect();

    // Учитываем масштаб canvas (разница между внутренним разрешением и отображаемым размером)
    const scaleX = canvasRect.width / app.screen.width;
    const scaleY = canvasRect.height / app.screen.height;

    // Позиционируем относительно canvas с учетом масштаба
    this.htmlButton.style.left = `${canvasRect.left + globalPos.x * scaleX}px`;
    this.htmlButton.style.top = `${canvasRect.top + globalPos.y * scaleY}px`;
    this.htmlButton.style.transform = "none";
  }

  private handleClick = () => {
    this.options.onClick?.();
  };

  // Метод для изменения текста
  setText(text: string) {
    this.options.text = text;
    this.htmlButton.textContent = text;
  }

  // Метод для изменения размеров
  setSize(width: number, height: number) {
    this.options.width = width;
    this.options.height = height;
    this.htmlButton.style.width = `${width}px`;
    this.htmlButton.style.height = `${height}px`;
    this.updatePosition();
  }

  // Метод для обновления позиции (можно вызывать вручную при необходимости)
  public syncPosition() {
    this.updatePosition();
  }

  destroy() {
    // Удаляем обработчики
    window.removeEventListener("resize", this.updatePositionBound);
    app.renderer.off("resize", this.updatePositionBound);
    this.off("added", this.updatePositionBound);
    this.off("removed", this.updatePositionBound);

    // Удаляем HTML элемент
    if (this.htmlButton.parentElement) {
      this.htmlButton.removeEventListener("click", this.handleClick);
      this.htmlButton.remove();
    }

    super.destroy();
  }
}
