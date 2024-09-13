import Image from 'next/image';
import Control from './Control';
import useAppSelector from '@/hooks/useAppSelector';
import React from 'react';

const Header = () => {
  const score = useAppSelector((state) => state.app.score);
  const best = useAppSelector((state) => state.app.best);

  return (
    <>
      <div className="flex justify-between align-middle">
        <div className="grid grid-cols-2 items-center gap-x-2">
          <Image src="/2orb48.png" width={300} height={300} alt="logo"></Image>
        </div>
        <div className="flex gap-5">
          <div className="m-auto flex gap-x-2 rounded-md bg-black p-3 text-center font-bold text-white">
            <div className="font-bold uppercase">Score: </div>
            <div>{score}</div>
          </div>
          <div className="m-auto flex gap-x-2  rounded-md border-2 bg-black p-3 text-center font-bold text-white">
            <div className="font-bold uppercase">Best: </div>
            <div>{best}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
