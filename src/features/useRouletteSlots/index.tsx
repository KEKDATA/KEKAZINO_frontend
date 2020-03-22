import * as React from 'react';
import { useStore } from 'effector-react';

import {
  $slotsStore,
  setFirstSlot,
  setRollAnimationStatus,
  setSecondSlot,
  setThirdSlot,
} from '@features/useRouletteSlots/model';
import { SlotInterface } from '@features/useRouletteSlots/interface';

import { asyncSetTimeout, getRandomValueFromArray } from '@lib/utils';
import { DEFAULT_TIMEOUT_DELAY, ROULETTE_SLOTS_EFFECTS } from '@lib/constants';

export const useRouletteSlots: () => {
  activeAnimationForSlots: () => Promise<void>;
  slots: SlotInterface[];
  isRollAnimation: boolean;
} = () => {
  const { isRollAnimation, firstSlot, secondSlot, thirdSlot } = useStore(
    $slotsStore,
  );

  const slots = [firstSlot, secondSlot, thirdSlot];

  const setSlotParamsAfterRoll = async (
    slotEffects: Array<string>,
    id: number,
    targetSlotSetter: Function,
    delay: number,
  ) => {
    const slotRandomValue = getRandomValueFromArray(slotEffects);

    await asyncSetTimeout(
      () =>
        targetSlotSetter({
          id,
          isDone: true,
          value: slotRandomValue,
        }),
      delay,
    );

    const newSlotsEffects = slotEffects.filter(
      (slot: string) => slot !== slotRandomValue,
    );

    return newSlotsEffects;
  };

  const activeAnimationForSlots = async () => {
    let newSlotsEffects = [...ROULETTE_SLOTS_EFFECTS];

    setRollAnimationStatus(true);

    setFirstSlot({ ...firstSlot, isDone: false });
    setSecondSlot({ ...secondSlot, isDone: false });
    setThirdSlot({ ...thirdSlot, isDone: false });

    newSlotsEffects = await setSlotParamsAfterRoll(
      newSlotsEffects,
      1,
      setFirstSlot,
      DEFAULT_TIMEOUT_DELAY,
    );
    newSlotsEffects = await setSlotParamsAfterRoll(
      newSlotsEffects,
      2,
      setSecondSlot,
      2000,
    );
    await setSlotParamsAfterRoll(newSlotsEffects, 3, setThirdSlot, 1000);

    setRollAnimationStatus(false);
  };

  return { isRollAnimation, slots, activeAnimationForSlots };
};
