import { type CSSProperties, useMemo } from 'react';
import clsx from 'clsx';

import {
  type Animation,
  type AnimationMerge,
  type AnimationMove,
  type AnimationNew,
  AnimationType,
} from '@/types/Animations';
import { Direction } from '@/types/Direction';
import Image from 'next/image';

export interface TileProps {
  value: number;
  animations?: Animation[];
}

function tileTranslate(axis: 'X' | 'Y', value: number) {
  return `translate${axis}(calc(${value} * (1rem + 100%))`;
}

function findAnimation<T extends Animation>(
  animations: Animation[] | undefined,
  type: AnimationType,
): T {
  return animations?.find((animation) => animation.type === type) as T;
}

const Tile: React.FC<TileProps> = ({ value, animations }) => {
  const moveAnimation = useMemo(
    () => findAnimation<AnimationMove>(animations, AnimationType.MOVE),
    [animations],
  );
  const newAnimation = useMemo(
    () => findAnimation<AnimationNew>(animations, AnimationType.NEW),
    [animations],
  );
  const mergeAnimation = useMemo(
    () => findAnimation<AnimationMerge>(animations, AnimationType.MERGE),
    [animations],
  );

  const style = useMemo(() => {
    if (!moveAnimation) {
      return {};
    }

    const value: CSSProperties = {
      transition: '100ms ease-in-out all',
    };

    switch (moveAnimation.direction) {
      case Direction.UP:
        value.transform = tileTranslate('Y', -1 * moveAnimation.value);
        break;
      case Direction.DOWN:
        value.transform = tileTranslate('Y', moveAnimation.value);
        break;
      case Direction.LEFT:
        value.transform = tileTranslate('X', -1 * moveAnimation.value);
        break;
      case Direction.RIGHT:
        value.transform = tileTranslate('X', moveAnimation.value);
        break;
    }

    return value;
  }, [moveAnimation]);

  function tileImage(value: number): string {
    switch (value) {
      case 2:
        return '/game-assets/2.png';
      case 4:
        return '/game-assets/4.png';
      case 8:
        return '/game-assets/8.png';
      case 16:
        return '/game-assets/16.png';
      case 32:
        return '/game-assets/32.png';
      case 64:
        return '/game-assets/64.png';
      case 128:
        return '/game-assets/128.png';
      case 256:
        return '/game-assets/256.png';
      case 512:
        return '/game-assets/512.png';
      case 1024:
        return '/game-assets/1024.png';
      case 2048:
        return '/game-assets/2048.png';
      default:
        return '/game-assets/2.png';
    }
  }

  return (
    <div className="leading-0 relative rounded-md bg-white pb-[100%] text-lg">
      {value !== 0 && (
        <div
          className={clsx(
            'leading-0 z-9 absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-md bg-[#3c3a32] text-sm font-bold text-black',
            {
              new: !!newAnimation,
              merge: !!mergeAnimation,
            },
          )}
          style={style}
        >
          <Image
            src={tileImage(value)}
            alt={value.toString()}
            height={400}
            width={400}
            className="rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default Tile;
