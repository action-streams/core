import { currentTime, newDefaultScheduler } from '@most/scheduler';
import { Stream } from '@most/types';
import { AttachSink, create, event } from 'most-subject';

interface Action {
  error?: boolean;
  meta?: unknown;
  payload?: unknown;
  type: string;
}

const [sink, action$]: [AttachSink<Action>, Stream<Action>] = create<Action>();

const createAction = (action: Action): void => {
  event(currentTime(scheduler), action, sink);
};

const scheduler = newDefaultScheduler();

const byError = (action: Action): boolean => action?.error ?? false;

const bySuccess = (action: Action): boolean => !action?.error;

const byType = (type: string) => (action: Action): boolean =>
  action?.type === type;

const byTypes = (types: string[]) => (action: Action): boolean =>
  types.includes(action?.type);

export {
  Action,
  action$,
  byError,
  bySuccess,
  byType,
  byTypes,
  createAction,
  scheduler,
};
