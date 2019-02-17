import { schema } from 'normalizr';

const movie = new schema.Entity('movies');
export const movies = [movie];
