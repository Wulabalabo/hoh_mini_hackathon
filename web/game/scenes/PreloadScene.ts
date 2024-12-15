import * as Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { AUDIO_CONFIG, AudioManager } from '../managers/AudioManager';

export interface PageInfo {
  page: number;
  total: number;
}

export class PreloadScene extends Phaser.Scene {
  private currentImageIndex = 0;
  private readonly imageKeys = ['fud00', 'fud01', 'fud02', 'fud03'];
  private currentImage?: Phaser.GameObjects.Image;
  private audioManager?: AudioManager;


  constructor() {
    super({ key: 'PreloadScene' });
  }

  init() {
    this.load.on('complete', () => {
      console.log('Scene assets loaded completely');
    });
  }

  private updatePageInfo() {
    useGameStore.getState().setPageInfo({
      page: this.currentImageIndex + 1,
      total: this.imageKeys.length
    });
  }

  preload() {    
    this.load.image('fud00', '/images/fud00.jpg');
    this.load.image('fud01', '/images/fud01.jpg'); 
    this.load.image('fud02', '/images/fud02.jpg');
    this.load.image('fud03', '/images/fud03.jpg');
    this.audioManager = new AudioManager(this);
    this.audioManager.preload();
    useGameStore.getState().setState('preload');
  }

  create() {
    this.audioManager?.init();
    this.audioManager?.playMusic(AUDIO_CONFIG.MUSIC.BATTLE.key, true, 0.5, 500);
    this.showCurrentImage();
    this.updatePageInfo();
  }

  // 供 React 调用的公共方法
  public updateFromReact(data: unknown) {
    const dataObj = data as { data: string };
    switch (dataObj.data) {
      case 'next':
        this.showNextImage();
        break;
      case 'prev':
        this.showPreviousImage();
        break;
      case 'start':
        this.scene.start('MainScene');
        break;
      default:
        console.warn('Unknown command:', data);
    }
    this.audioManager?.playSfx(AUDIO_CONFIG.SFX.CLICK.key);
  }

  private showCurrentImage() {
    if (this.currentImage) {
      this.currentImage.destroy();
    }

    this.currentImage = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.imageKeys[this.currentImageIndex]
    )
      .setOrigin(0.5, 0.5)
      .setScale(0.5);
  }

  private showNextImage() {
    if (this.currentImageIndex < this.imageKeys.length - 1) {
      this.currentImageIndex++;
      this.showCurrentImage();
      this.updatePageInfo();
    }
  }

  private showPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.showCurrentImage();
      this.updatePageInfo();
    }
  }
}