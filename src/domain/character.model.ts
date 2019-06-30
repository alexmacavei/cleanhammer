import { NotAcceptableException } from '@nestjs/common';
import { Item } from './item.model';
import { Race, RaceName } from './race.model';

export class Character {
  readonly race: Race;
  readonly name: string;
  readonly itemsOwned: Item[];
  readonly friends: Character[];
  readonly goldOwned: number;

  constructor(
    race: Race,
    name: string,
    itemsOwned: Item[],
    friends: Character[],
    goldOwned: number,
  ) {
    if (this.isGreenskinWithAtLeastANonGreenskinFriend(race, friends)) {
      throw new NotAcceptableException(
        'Greenskins can only befriend other greenskins!',
      );
    }
    this.race = race;
    this.name = name;
    this.itemsOwned = itemsOwned;
    this.friends = friends;
    this.goldOwned = goldOwned;
  }

  befriend(friend: Character): Character {
    this.friends.push(friend);
    return this;
  }

  isGreenskinWithAtLeastANonGreenskinFriend(race: Race, friends: Character[]) {
    return (
      race.mainRaceName === RaceName.GREENSKIN &&
      !!friends.find(f => f.race.mainRaceName !== RaceName.GREENSKIN)
    );
  }
}
