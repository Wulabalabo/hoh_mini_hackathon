import Phaser from 'phaser';

interface PageInfo {
  page: number;
  total: number;
}

export class PreloadScene extends Phaser.Scene {
  private currentImageIndex = 0;
  private readonly imageKeys = ['fud00', 'fud01', 'fud02', 'fud03'];
  private currentImage?: Phaser.GameObjects.Image;
  private onPageChange?:(pageInfo: PageInfo) => void;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  public setPageChangeCallback(callback: (pageInfo: PageInfo) => void) {
    this.onPageChange = callback;
  }

  private notifyPageChange() {
    console.log('notifyPageChange', this.currentImageIndex);
    if (this.onPageChange) {
      this.onPageChange({
        page: this.currentImageIndex + 1,
        total: this.imageKeys.length
      });
    }
  }

  preload() {
    this.load.image('fud00', '/images/fud00.jpg');
    this.load.image('fud01', '/images/fud01.jpg'); 
    this.load.image('fud02', '/images/fud02.jpg');
    this.load.image('fud03', '/images/fud03.jpg');
  }

  create() {
    // 创建当前展示的图片
    this.showCurrentImage();
    this.notifyPageChange();
  }

  // 供 React 调用的公共方法
  public updateFromReact(data: unknown) {
    // 处理来自 React 的更新
    const dataObj = data as { data: string };
    if (dataObj.data === 'next') {
      this.showNextImage();
    } else if (dataObj.data === 'prev') {
      this.showPreviousImage();
    }
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
      this.notifyPageChange();
    }
  }

  private showPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.showCurrentImage();
      this.notifyPageChange();
    }
  }
}