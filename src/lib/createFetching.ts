import { Effect, Event, Store, createEvent, createStore } from 'effector';

type Status = 'initial' | 'loading' | 'done' | 'fail';
type Params<R, E, Rs> = {
  result?: R;
  error?: E;
  reset?: Event<Rs>;
};

export function createFetching<Pr, Result, Err, Reset>(
  effect: Effect<Pr, Result, Err>,
  initialStatus: Status = 'initial',
  params: Params<Result, Err, Reset> = {},
): {
  result: Store<Result | null>;
  isLoading: Store<boolean>;
  isFailed: Store<boolean>;
  error: Store<Err | null>;
  isDone: Store<boolean>;
  status: Store<Status>;
} {
  const customReset = params.reset || createEvent<Reset>();

  const result: Store<Result | null> = createStore(params.result || null)
    .reset(effect)
    .reset(effect.fail)
    .reset(customReset)
    .on(effect.done, (_, { result: value }) => value);

  const error: Store<Err | null> = createStore(params.error || null)
    .reset(effect)
    .reset(effect.done)
    .reset(customReset)
    .on(effect.fail, (_, { error: value }) => value);

  const status: Store<Status> = createStore(initialStatus)
    .on(effect, () => 'loading')
    .on(effect.done, () => 'done')
    .on(effect.fail, () => 'fail')
    .on(customReset, () => 'initial');

  const isDone: Store<boolean> = status.map(state => state === 'done');
  const isFailed: Store<boolean> = status.map(state => state === 'fail');
  const isLoading: Store<boolean> = status.map(state => state === 'loading');

  return { result, error, status, isDone, isFailed, isLoading };
}
