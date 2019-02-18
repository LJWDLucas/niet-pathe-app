import { schema } from 'normalizr';

export const movie = new schema.Entity('movies');
export const performance = new schema.Entity('performances');
export const hall = new schema.Entity('halls');

export const movies = [movie];
export const performances = [performance];
