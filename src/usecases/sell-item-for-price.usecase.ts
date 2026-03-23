import {
  Character,
  InsufficientGoldError,
  ItemNotOwnedError,
} from '../domain/character.model';
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
      throw new ItemNotOwnedError(
        fromCharacter.name,
        itemOwnedByFromCharacter.name,
      );
    }
    if (toCharacter.goldOwned < itemOwnedByFromCharacter.worthInGold) {
      throw new InsufficientGoldError(
        toCharacter.name,
        itemOwnedByFromCharacter.name,
      );
    }
    return this.sellItemService.sellItem(
      fromCharacter,
      toCharacter,
      itemOwnedByFromCharacter,
    );
  }
}
