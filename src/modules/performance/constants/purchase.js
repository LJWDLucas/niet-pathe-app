export const NO_DISCOUNT = 'NO_DISCOUNT';
export const CHILD_DISCOUNT = 'CHILD_DISCOUNT';
export const STUDENT_DISCOUNT = 'STUDENT_DISCOUNT';
export const ELDERLY_DISCOUNT = 'ELDERLY_DISCOUNT';
export const CINEMA_TICKET_DISCOUNT = 'CINEMA_TICKET_DISCOUNT';
export const THREE_DEE = 'THREE_DEE';
export const REGULAR = 'REGULAR';
export const EXTENDED = 'EXTENDED';

export const VALUES = {
  [NO_DISCOUNT]: "-1",
  [CHILD_DISCOUNT]: "0",
  [STUDENT_DISCOUNT]: "1",
  [ELDERLY_DISCOUNT]: "2",
  [CINEMA_TICKET_DISCOUNT]: "3",
};

export const MAP = {
  "-1": NO_DISCOUNT,
  0: CHILD_DISCOUNT,
  1: STUDENT_DISCOUNT,
  2: ELDERLY_DISCOUNT,
  3: CINEMA_TICKET_DISCOUNT
};

export const COST = {
  [NO_DISCOUNT]: 0,
  [CHILD_DISCOUNT]: -1.5,
  [STUDENT_DISCOUNT]: -1.5,
  [ELDERLY_DISCOUNT]: -1.5,
  [CINEMA_TICKET_DISCOUNT]: 0,
  [THREE_DEE]: 2.5,
  [REGULAR]: 8.50,
  [EXTENDED]: 9.50
};

export const NAMES = {
  [NO_DISCOUNT]: "Geen korting",
  [CHILD_DISCOUNT]: "Kinderkorting",
  [STUDENT_DISCOUNT]: "Studentenkorting",
  [ELDERLY_DISCOUNT]: "65+ reductie",
  [CINEMA_TICKET_DISCOUNT]: "Nationale Bioscoopbon",
  [THREE_DEE]: "3D",
  [REGULAR]: "Ticket",
  [EXTENDED]: "Ticket"
};
