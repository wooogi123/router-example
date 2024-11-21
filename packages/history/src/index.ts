export type Action = 'push' | 'pop' | 'replace';

export type Location = string;

export type To = string;

export interface ChangeEvent {
  action: Action;
  location: Location;
  delta: number;
}

export type Listener = (event: ChangeEvent) => void;

export interface History {
  get stack(): Location[];
  get location(): Location;

  push(to: To): void;
  replace(to: To): void;

  go(delta: number): void;

  addListener(listener: Listener): () => void;
}

// ---

interface MemoryHistoryParams {
  initialStack?: Location[];
  initialIndex?: number;
}

export const createMemoryHistory = (
  options: MemoryHistoryParams = {},
): History => {
  const { initialStack, initialIndex } = options;

  let stack: Location[] = initialStack ?? ['/'];
  let index = initialIndex ?? stack.length - 1;

  const listeners = new Set<Listener>();

  const getCurrentLocation = () => {
    return stack[index];
  };

  const push = (to: To) => {
    const change: ChangeEvent = {
      action: 'push',
      location: to,
      delta: 1,
    };

    index += change.delta;
    stack.splice(index, stack.length, change.location);

    if (listeners.size > 0) {
      listeners.forEach((listener) => {
        listener(change);
      });
    }
  };

  const replace = (to: To) => {
    const change: ChangeEvent = {
      action: 'replace',
      location: to,
      delta: 0,
    };

    stack[index] = to;

    if (listeners.size > 0) {
      listeners.forEach((listener) => {
        listener(change);
      });
    }
  };

  const go = (delta: number) => {
    const nextIndex = Math.min(Math.max(index + delta, 0), stack.length - 1);
    const nextLocation = stack[nextIndex];

    const change: ChangeEvent = {
      action: 'pop',
      location: nextLocation,
      delta,
    };

    index = nextIndex;

    if (listeners.size > 0) {
      listeners.forEach((listener) => {
        listener(change);
      });
    }
  };

  const addListener = (listener: Listener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  const memoryHistory: History = {
    get stack() {
      return stack;
    },
    get location() {
      return getCurrentLocation();
    },

    push,
    replace,
    go,

    addListener,
  };

  return memoryHistory;
};

// ---

interface BrowserHistoryParams {
  window?: {
    location: {
      pathname: string;
    };
    history: globalThis.History;
  };
}

export const createBrowserHistory = (options: BrowserHistoryParams = {}) => {
  const { window = globalThis } = options;

  const getCurrentLocation = () => {
    const { pathname } = window.location;

    return pathname;
  };

  let stack: Location[] = [getCurrentLocation()];
  let index = 0;

  const listeners = new Set<Listener>();

  const push = (to: To) => {
    const change: ChangeEvent = {
      action: 'push',
      location: to,
      delta: 1,
    };

    index += change.delta;
    stack.splice(index, stack.length, change.location);

    window.history.pushState({}, '', to);

    if (listeners.size > 0) {
      listeners.forEach((listener) => {
        listener(change);
      });
    }
  };

  const replace = (to: To) => {
    const change: ChangeEvent = {
      action: 'replace',
      location: to,
      delta: 0,
    };

    stack[index] = to;

    window.history.replaceState({}, '', to);

    if (listeners.size > 0) {
      listeners.forEach((listener) => {
        listener(change);
      });
    }
  };

  const go = (delta: number) => {
    const nextIndex = Math.min(Math.max(index + delta, 0), stack.length - 1);
    const nextLocation = stack[nextIndex];

    const change: ChangeEvent = {
      action: 'pop',
      location: nextLocation,
      delta,
    };

    index = nextIndex;

    window.history.go(delta);

    if (listeners.size > 0) {
      listeners.forEach((listener) => {
        listener(change);
      });
    }
  };

  const addListener = (listener: Listener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  const browserHistory: History = {
    get stack() {
      return stack;
    },
    get location() {
      return getCurrentLocation();
    },

    push,
    replace,
    go,

    addListener,
  };

  return browserHistory;
};
