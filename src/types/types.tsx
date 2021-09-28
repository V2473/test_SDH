export interface User {
  id: number | undefined;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  job: string;
  biography: string;
  is_active: boolean;
}

export interface Action<T> {
  type: T;
}

export interface ActionPayload<T, P> {
  type: T;
  payload: P;
}