import { Character } from '../domain/character.model';
import { Item } from '../domain/item.model';
import { NotAcceptableException } from '@nestjs/common';

export interface SellItemForPricePort {
  sellItem(
    fromCharacter: Character,
    toCharacter: Character,
    soldItem: Item,
  ): boolean;
}

export class SellItemForPrice<T extends SellItemForPricePort> {
  constructor(private readonly sellItemService: T) {}

  sellItem(
    from: Character,
    to: Character,
    itemOwnedByFromCharacter: Item,
  ): boolean {
    if (!from.itemsOwned.includes(itemOwnedByFromCharacter)) {
      throw new NotAcceptableException(
        `Character ${from.name} cannot sell what he doesn't own. Tried to sell item: ${itemOwnedByFromCharacter.name}`,
      );
    }
    if (to.goldOwned < itemOwnedByFromCharacter.worthInGold) {
      throw new NotAcceptableException(
        `Character ${to.name} does not have enough gold to buy ${itemOwnedByFromCharacter.name}`,
      );
    }
    return this.sellItemService.sellItem(from, to, itemOwnedByFromCharacter);
  }
}
