import { createEvent, createStore, Event } from 'effector';

export const $isImageUrlExist = createStore<boolean | null>(null);

export const setImageUrlExistStatus: Event<boolean | null> = createEvent();

$isImageUrlExist.on(setImageUrlExistStatus, (_, isExist) => isExist);
