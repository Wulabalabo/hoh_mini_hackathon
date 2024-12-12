import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

  }
}