export class UnAuthenticatedError extends Error {
  constructor() {
    super("UNAUTHENTICADED");
    this.name = "UnAuthenticatedError";
  }
}
