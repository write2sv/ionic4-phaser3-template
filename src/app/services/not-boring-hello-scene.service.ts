import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotBoringHelloSceneService extends Phaser.Scene {

  dude;
  keys;
  sceneWidthHalf: number;

  public constructor() {
    super({ key: 'Scene' });
  }

  public preload() {
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.sceneWidthHalf = window.innerWidth / 2;
  }

  public create(): void {
    this.dude = this.physics.add.sprite(this.sceneWidthHalf, 0, 'dude');

    this.dude.setBounce(0.2);
    this.dude.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.keys = this.input.keyboard.createCursorKeys();
  }

  public update() {
    if (this.keys.left.isDown || this.isLeftTouch()) {
      this.dude.setVelocityX(-160);
      this.dude.anims.play('left', true);
    } else if (this.keys.right.isDown  || this.isRightTouch()) {
      this.dude.setVelocityX(160);
      this.dude.anims.play('right', true);
    } else {
      this.dude.setVelocityX(0);
      this.dude.anims.play('turn');
    }

  }

  private isLeftTouch() {
    return this.input.activePointer.isDown && this.input.activePointer.downX < this.sceneWidthHalf;
  }

  private isRightTouch() {
    return this.input.activePointer.isDown && this.input.activePointer.downX >= this.sceneWidthHalf;
  }
}
