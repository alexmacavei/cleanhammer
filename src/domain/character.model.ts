import { NotAcceptableException } from '@nestjs/common';
import { Item } from './item.model';
import { Race, RaceName } from './race.model';

interface Character {
  race: Race;
  name: string;
  itemsOwned: Item[];
  friends: Character[];
  goldOwned: number;
}

export function isGreenskinWithAtLeastANonGreenskinFriend(
  character: Character,
) {
  const {
    race: { mainRaceName },
    friends,
  } = character;
  return (
    mainRaceName === RaceName.GREENSKIN &&
    !!friends.find((f) => f.race.mainRaceName !== RaceName.GREENSKIN)
  );
}

export function createCharacter(
  race: Race,
  name: string,
  itemsOwned: Item[],
  friends: Character[],
  goldOwned: number,
): Character {
  const characterInvalid = isGreenskinWithAtLeastANonGreenskinFriend({
    race,
    friends,
  } as Character);
  if (characterInvalid) {
    throw new NotAcceptableException(
      'Greenskins can only befriend other greenskins!',
    );
  }
  return {
    name,
    race,
    itemsOwned,
    friends,
    goldOwned,
  };
}
