import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { CreateCharacter } from './usecases/create-character.usecase';
import { ViewCharacters } from './usecases/view-characters.usecase';
import {
  Character,
  createCharacter,
  InvalidCharacterError,
  ItemNotOwnedError,
  InsufficientGoldError,
} from './domain/character.model';
import { RaceName } from './domain/race.model';
import { Item, ItemKind } from './domain/item.model';
import { SellItemForPrice } from './usecases/sell-item-for-price.usecase';

describe('AppController', () => {
  let appController: AppController;
  let mockCreateCharacter: jest.Mocked<
    Pick<CreateCharacter<any>, 'createCharacter'>
  >;
  let mockViewCharacters: jest.Mocked<
    Pick<ViewCharacters<any>, 'viewAllCharacters'>
  >;

  beforeEach(async () => {
    mockCreateCharacter = { createCharacter: jest.fn() };
    mockViewCharacters = { viewAllCharacters: jest.fn() };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: CreateCharacter, useValue: mockCreateCharacter },
        { provide: ViewCharacters, useValue: mockViewCharacters },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });

  describe('createCharacter', () => {
    it('should call createCharacterUseCase with the provided character', () => {
      const character: Character = {
        race: { mainRaceName: RaceName.ELF, subrace: 'Wood Elf' },
        name: 'Legolas',
        itemsOwned: [],
        friends: [],
        goldOwned: 100,
      };

      appController.createCharacter(character);

      expect(mockCreateCharacter.createCharacter).toHaveBeenCalledWith(
        character,
      );
    });
  });

  describe('getAll', () => {
    it('should return all characters from the use case', async () => {
      const characters: Character[] = [
        {
          race: { mainRaceName: RaceName.DWARF, subrace: 'Mountain Dwarf' },
          name: 'Gimli',
          itemsOwned: [],
          friends: [],
          goldOwned: 50,
        },
      ];
      mockViewCharacters.viewAllCharacters.mockResolvedValue(characters);

      const result = await appController.getAll();

      expect(result).toEqual(characters);
      expect(mockViewCharacters.viewAllCharacters).toHaveBeenCalled();
    });
  });
});

describe('Domain: createCharacter', () => {
  it('should create a valid non-greenskin character', () => {
    const character = createCharacter(
      { mainRaceName: RaceName.ELF, subrace: 'Wood Elf' },
      'Legolas',
      [],
      [],
      100,
    );
    expect(character.name).toBe('Legolas');
    expect(character.goldOwned).toBe(100);
  });

  it('should throw InvalidCharacterError when a greenskin has a non-greenskin friend', () => {
    const nonGreenskinFriend: Character = {
      race: { mainRaceName: RaceName.ELF, subrace: 'Wood Elf' },
      name: 'Legolas',
      itemsOwned: [],
      friends: [],
      goldOwned: 0,
    };

    expect(() =>
      createCharacter(
        { mainRaceName: RaceName.GREENSKIN, subrace: 'Orc' },
        'Thrall',
        [],
        [nonGreenskinFriend],
        10,
      ),
    ).toThrow(InvalidCharacterError);
  });

  it('should allow a greenskin to have only greenskin friends', () => {
    const greenskinFriend: Character = {
      race: { mainRaceName: RaceName.GREENSKIN, subrace: 'Goblin' },
      name: 'Gruk',
      itemsOwned: [],
      friends: [],
      goldOwned: 0,
    };

    const character = createCharacter(
      { mainRaceName: RaceName.GREENSKIN, subrace: 'Orc' },
      'Thrall',
      [],
      [greenskinFriend],
      10,
    );
    expect(character.name).toBe('Thrall');
  });
});

describe('SellItemForPrice use case', () => {
  const sword: Item = {
    name: 'Excalibur',
    itemKind: ItemKind.SWORD,
    worthInGold: 50,
  };
  const seller: Character = {
    race: { mainRaceName: RaceName.MANKIND, subrace: 'Human' },
    name: 'Arthur',
    itemsOwned: [sword],
    friends: [],
    goldOwned: 10,
  };
  const buyer: Character = {
    race: { mainRaceName: RaceName.DWARF, subrace: 'Mountain Dwarf' },
    name: 'Gimli',
    itemsOwned: [],
    friends: [],
    goldOwned: 100,
  };

  it('should throw ItemNotOwnedError when seller does not own the item', () => {
    const mockPort = { sellItem: jest.fn() };
    const useCase = new SellItemForPrice(mockPort);
    const unownedItem: Item = {
      name: 'Ghost Sword',
      itemKind: ItemKind.SWORD,
      worthInGold: 10,
    };

    expect(() => useCase.sellItem(seller, buyer, unownedItem)).toThrow(
      ItemNotOwnedError,
    );
  });

  it('should throw InsufficientGoldError when buyer cannot afford the item', () => {
    const mockPort = { sellItem: jest.fn() };
    const useCase = new SellItemForPrice(mockPort);
    const poorBuyer: Character = { ...buyer, goldOwned: 5 };

    expect(() => useCase.sellItem(seller, poorBuyer, sword)).toThrow(
      InsufficientGoldError,
    );
  });

  it('should delegate to port when the transaction is valid', () => {
    const mockPort = { sellItem: jest.fn().mockReturnValue(true) };
    const useCase = new SellItemForPrice(mockPort);

    const result = useCase.sellItem(seller, buyer, sword);

    expect(mockPort.sellItem).toHaveBeenCalledWith(seller, buyer, sword);
    expect(result).toBe(true);
  });
});
