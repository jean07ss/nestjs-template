import { PrismaClientError } from '../PrismaClientError';

export const isPrismaError = (e: PrismaClientError): boolean => {
  return (
    typeof e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'undefined' ||
      (typeof e.meta === 'object' && typeof e.meta.target[0] === 'string'))
  );
};
