'use client';
import { PhaserGame } from '@/components/game/phaser-game';
import { GameUI } from '@/components/game/game-ui';
import { useCurrentAccount, ConnectModal } from '@mysten/dapp-kit';
import { useState } from 'react';
import Image from 'next/image';
import { isValidSuiAddress } from '@mysten/sui/utils';
export default function GamePage() {
  const [gameStart, setGameStart] = useState(false);
  const currentAccount = useCurrentAccount();
  const [open, setOpen] = useState(false);


  return (
    <main className="h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="w-full h-full max-w-lg flex items-center justify-center">
        {gameStart ? (
          <div className="w-full aspect-[9/16] bg-black relative">
            <PhaserGame />
            <GameUI />
          </div>
        ) : (
          currentAccount?.address && isValidSuiAddress(currentAccount?.address) ? (
            <div className="w-full aspect-[9/16] bg-black relative">

              <div className="w-full aspect-[9/16] bg-black relative">
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <Image src="/images/start.png" alt="start" width={300} height={300} onClick={() => setGameStart(true)} className='cursor-pointer hover:scale-110 transition-all duration-300 focus:outline-none'/>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-[9/16] bg-black relative">
              <ConnectModal open={open} onOpenChange={setOpen} trigger={
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <Image src="/images/connect.png" alt="connect" width={300} height={300} className='cursor-pointer hover:scale-110 transition-all duration-300 focus:outline-none'/>
                </div> 
              } />
            </div>
          )
        )}
      </div>
    </main>
  );
}