import { createEvent, createStore, combine, Event } from 'effector';

import { SlotInterface } from '@features/useRouletteSlots/interface';

export const $isRollAnimation = createStore<boolean>(false);

const $firstSlot = createStore<SlotInterface>({
  id: 1,
  isDone: false,
  value: null,
});
const $secondSlot = createStore<SlotInterface>({
  id: 2,
  isDone: false,
  value: null,
});
const $thirdSlot = createStore<SlotInterface>({
  id: 3,
  isDone: false,
  value: null,
});

export const setRollAnimationStatus: Event<boolean> = createEvent();

export const setFirstSlot: Event<SlotInterface> = createEvent();
export const setSecondSlot: Event<SlotInterface> = createEvent();
export const setThirdSlot: Event<SlotInterface> = createEvent();

$isRollAnimation.on(setRollAnimationStatus, (_, b) => b);
$firstSlot.on(setFirstSlot, (_, firstSlot) => firstSlot);
$secondSlot.on(setSecondSlot, (_, secondSlot) => secondSlot);
$thirdSlot.on(setThirdSlot, (_, thirdSlot) => thirdSlot);

export const $slotsStore = combine({
  isRollAnimation: $isRollAnimation,
  firstSlot: $firstSlot,
  secondSlot: $secondSlot,
  thirdSlot: $thirdSlot,
});
