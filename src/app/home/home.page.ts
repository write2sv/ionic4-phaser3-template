import { Component, ViewChild, AfterContentInit, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotBoringHelloSceneService } from './../services/not-boring-hello-scene.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [NotBoringHelloSceneService]
})
export class HomePage {

  public gameConfig: GameConfig = {
    title: environment.title,
    version: environment.version,
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight - 45,
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  };

  constructor(private notBoringHelloScreenService: NotBoringHelloSceneService) {
  }

  public onGameReady(game: Phaser.Game): void {
    game.scene.add('Scene', this.notBoringHelloScreenService, true);
  }

}
