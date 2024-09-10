import { NewDiaryEntry, Visibility, Weather } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;  // Esto devuelve el valor de tipo `Weather`
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility: ' + visibility);
  }
  return visibility;  // Esto devuelve el valor de tipo `Visibility`
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
};
const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(param);
};


const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
    const newEntry: NewDiaryEntry = {
      comment: parseComment(object.comment),
      weather: parseWeather(object.weather),   // Valida con enums
      visibility: parseVisibility(object.visibility),  // Valida con enums
      date: parseDate(object.date),
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewDiaryEntry;
