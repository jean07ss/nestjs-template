import { PrismaClientError } from '../PrismaClientError';
import { UniqueConstraintError } from '../UniqueConstraintError';
import { PrismaErrors } from '../../../../prisma/enum/PrismaErrors';
import { DatabaseError } from '../../DatabaseError';

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueCoinstraintFail:
      return new UniqueConstraintError(e);

    default:
      return new DatabaseError(e);
  }
};
