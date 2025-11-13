import { Container } from "pixi.js";
import { Button } from "@/ui";
import { app } from "@/core";

export class MenuScene extends Container {
  private startButton!: Button;

  constructor() {
    super();
    this.init();
  }

  private init() {
    // Создаем кнопку "Начать игру"
    this.startButton = new Button({
      text: "Начать игру",
      width: 250,
      height: 60,
      onClick: () => {
        console.log("Начать игру");
        // Здесь будет логика перехода к игре
      },
    });

    // Добавляем кнопку на сцену
    this.addChild(this.startButton);

    // Центрируем кнопку на экране
    this.centerButton();
  }

  private centerButton() {
    // Используем размеры экрана приложения для центрирования
    const screenWidth = app.screen.width || window.innerWidth;
    const screenHeight = app.screen.height || window.innerHeight;

    // Центрируем кнопку
    this.startButton.x = screenWidth / 2 - this.startButton.width / 2;
    this.startButton.y = screenHeight / 2 - this.startButton.height / 2;

    // Синхронизируем позицию HTML элемента с небольшой задержкой
    setTimeout(() => {
      this.startButton.syncPosition();
    }, 0);
  }
}
