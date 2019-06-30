export class Race {
  readonly mainRaceName: RaceName;
  readonly subrace: string;

  constructor(mainRaceName: RaceName, subrace: string) {
    this.mainRaceName = mainRaceName;
    this.subrace = subrace;
  }
}

export enum RaceName {
  ELF,
  DWARF,
  MANKIND,
  GREENSKIN,
}
