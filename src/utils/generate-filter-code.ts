import { v4 as uuidv4 } from 'uuid';

export const generateFilterCode = (): string => {
  return `filter_${uuidv4()}`;
};