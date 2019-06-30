export class Item {
  readonly name: string;
  readonly itemKind: ItemKind;
  readonly worthInGold: number;

  constructor(name, itemKind, worthInGold) {
    this.name = name;
    this.itemKind = itemKind;
    this.worthInGold = worthInGold;
  }
}

enum ItemKind {
  SWORD,
  HAMMER,
  BOW,
  RING,
  AMULET,
}
