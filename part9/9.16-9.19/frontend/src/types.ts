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


export interface RadioGroupProps<T> {
  name: string;
  options: T[];
  selectedValue: T;
  onChange: (value: T) => void;
  labelFormatter?: (value: T) => string; // Si deseas un formato personalizado para la etiqueta
}