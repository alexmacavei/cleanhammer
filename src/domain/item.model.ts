export interface Item {
  name: string;
  itemKind: ItemKind;
  worthInGold: number;
}

export enum ItemKind {
  SWORD,
  HAMMER,
  BOW,
  RING,
  AMULET,
}
