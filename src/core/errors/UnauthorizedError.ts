export class UnauthorizedError extends Error {
  constructor() {
    super('Not authorized.');
  }
}
