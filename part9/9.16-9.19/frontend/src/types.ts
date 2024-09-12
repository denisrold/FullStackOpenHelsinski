  export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}


export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type sensitivityDiaryes = Omit<DiaryEntry, 'id'>

export interface titleProps {
  diaries : sensitivityDiaryes[]
}

export interface RadioInputsProps<T> {
  selectedType: T;
  inputHandle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (value: keyof T) => void; 
  compare: Visibility | Weather;
  name:string
}

export type EnumType = {
  [key: string]: string;
};