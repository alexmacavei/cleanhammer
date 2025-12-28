import { NotAcceptableException } from '@nestjs/common';
import { Character } from '../domain/character.model';
import { Item } from '../domain/item.model';

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
    fromCharacter: Character,
    toCharacter: Character,
    itemOwnedByFromCharacter: Item,
  ): boolean {
    if (!fromCharacter.itemsOwned.includes(itemOwnedByFromCharacter)) {
      throw new NotAcceptableException(
        `Character ${fromCharacter.name} cannot sell what he doesn't own. Tried to sell item: ${itemOwnedByFromCharacter.name}`,
      );
    }
    if (toCharacter.goldOwned < itemOwnedByFromCharacter.worthInGold) {
      throw new NotAcceptableException(
        `Character ${toCharacter.name} does not have enough gold to buy ${itemOwnedByFromCharacter.name}`,
      );
    }
    return this.sellItemService.sellItem(
      fromCharacter,
      toCharacter,
      itemOwnedByFromCharacter,
    );
  }
}
