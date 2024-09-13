import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { resetAction } from '@/store/action';
import React from 'react';
import { useCallback } from 'react';

const Control = () => {
  const dispatch = useAppDispatch();
  const size = useAppSelector((state) => state.app.boardSize);
  const reset = useCallback(
    () => dispatch(resetAction(size)),
    [dispatch, size],
  );
  return (
    <button
      onClick={() => dispatch(reset())}
      className="w-full bg-black px-16 py-4"
    >
      New game
    </button>
  );
};

export default Control;
