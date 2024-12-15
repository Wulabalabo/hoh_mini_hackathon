'use client';

import { MainScene, PreloadScene } from '@/game/scenes';
import { useGameStore } from '@/game/store/gameStore';

export function GameUI() {
  const { gameInstance, pageInfo, state, score } = useGameStore();


  const handlePreloadSceneButtonClick = (data: string) => {
    switch(state) {
      case 'preload':
        if (gameInstance) {
          const preloadScene = gameInstance.scene.getScene('PreloadScene') as PreloadScene;
          preloadScene.updateFromReact({
            data: data
          });
        }
        break;
      case 'gameover':
        if (gameInstance) {
          const mainScene = gameInstance.scene.getScene('MainScene') as MainScene;
          mainScene.updateFromReact({
            data: data
          });
        }
        break;
    }
  };


  const handleUploadButtonClick = () => {
    console.log('upload',score);
  };  



  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end">
      <div className="flex flex-col justify-end">
        {state === 'preload' && <div className="flex flex-row justify-between p-5">
          <button onClick={() => handlePreloadSceneButtonClick('prev')} className="min-w-32 bg-opacity-50 bg-blue-500 text-white px-4 py-2 rounded-3xl uppercase">
            prev
          </button>
          <button onClick={() => handlePreloadSceneButtonClick(pageInfo.page < pageInfo.total ? 'next' : 'start')} className="min-w-32 bg-opacity-50 bg-blue-500 text-white px-4 py-2 rounded-3xl uppercase">
            {pageInfo.page < pageInfo.total ? 'next' : 'start'}
          </button>
        </div>}
        {state === 'gameover' && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <div className="flex flex-col gap-4 min-w-[300px]">
                <button 
                  onClick={() => handlePreloadSceneButtonClick('restart')} 
                  className="w-full bg-blue-500 bg-opacity-50 text-white px-6 py-3 rounded-3xl uppercase hover:bg-opacity-70 transition-colors"
                >
                  restart
                </button>
                <button 
                  onClick={handleUploadButtonClick} 
                  className="w-full bg-blue-500 bg-opacity-50 text-white px-6 py-3 rounded-3xl uppercase hover:bg-opacity-70 transition-colors"
                >
                  upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}