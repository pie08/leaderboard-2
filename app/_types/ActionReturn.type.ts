interface ActionReturn<T> {
  success: boolean;
  data?: T | null;
  error?: string;
}
