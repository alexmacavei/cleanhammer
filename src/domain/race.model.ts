export interface Race {
  mainRaceName: RaceName;
  subrace: string;
}

export enum RaceName {
  ELF,
  DWARF,
  MANKIND,
  GREENSKIN,
}
