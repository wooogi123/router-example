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
  pop(to: To): void;
  replace(to: To): void;

  go(delta: number): void;

  addListener(listener: Listener): () => void;
}
