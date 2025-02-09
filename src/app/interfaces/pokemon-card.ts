export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesTo: string[];
  evolvesFrom: string;
  attacks: Attack[];
  weaknesses: Weakness[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  images: Images;
  tcgplayer: TcgPlayer;
  cardmarket: CardMarket;
}

interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

interface Weakness {
  type: string;
  value: string;
}

interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

interface Legalities {
  unlimited: string;
  expanded: string;
}

interface Images {
  small: string;
  large: string;
}

interface TcgPlayer {
  url: string;
  updatedAt: string;
  prices: {
    normal: PriceDetails;
    reverseHolofoil: PriceDetails;
    holofoil: PriceDetails;
  };
}

interface PriceDetails {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
}

interface CardMarket {
  url: string;
  updatedAt: string;
  prices: {
    averageSellPrice: number;
    lowPrice: number;
    trendPrice: number;
    germanProLow: number;
    suggestedPrice: number;
    reverseHoloSell: number;
    reverseHoloLow: number;
    reverseHoloTrend: number;
    lowPriceExPlus: number;
    avg1: number;
    avg7: number;
    avg30: number;
    reverseHoloAvg1: number;
    reverseHoloAvg7: number;
    reverseHoloAvg30: number;
  };
}
