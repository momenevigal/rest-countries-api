interface Country {
    name: {
      common: string;
      nativeName: Record<string, { common: string }>;
    };
    population: number;
    region: string;
    subregion: string;
    capital: string[];
    flags: { svg: string };
    tld: string[];
    currencies: Record<string, { name: string }>;
    languages: Record<string, string>;
    borders: string[];
  }
  
export type {Country}