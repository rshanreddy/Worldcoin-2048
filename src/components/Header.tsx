import Image from 'next/image';
import Control from './Control';
import useAppSelector from '@/hooks/useAppSelector';

const Header = () => {
  const score = useAppSelector((state) => state.app.score);
  const best = useAppSelector((state) => state.app.best);

  

  return (
    <>
      <div className="flex justify-between align-middle">
        <div className='grid grid-cols-2 gap-x-2 items-center'>
          <Image src="/2orb48.png" width={300} height={300}></Image>
        </div>
        <div className="flex gap-5">
          <div className="m-auto rounded-md bg-black p-6 text-center font-bold text-white">
            <div className="font-bold uppercase">Score</div>
            <div>{score}</div>
          </div>
          <div className="m-auto rounded-md border-2 bg-[#bbada0] bg-black p-6 text-center font-bold text-white ">
            <div className="font-bold uppercase">Best</div>
            <div>{best}</div>
          </div>
        </div>
      </div>

      <Control />
    </>
  );
};

export default Header;
