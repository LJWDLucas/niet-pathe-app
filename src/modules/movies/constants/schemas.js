import { schema } from 'normalizr';

export const movie = new schema.Entity('movies');
export const movies = [movie];
