export interface Item {
  name: string;
  itemKind: ItemKind;
  worthInGold: number;
}

enum ItemKind {
  SWORD,
  HAMMER,
  BOW,
  RING,
  AMULET,
}
