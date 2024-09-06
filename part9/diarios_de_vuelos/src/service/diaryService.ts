
import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry, Weather, Visibility } from '../types';
import diaries from '../../data/diaries';
 
const getEntries = (): DiaryEntry[] => {
 return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
 };

 
const addDiary = ( date: string, weather: Weather, visibility: Visibility, comment?: string ) : NewDiaryEntry => {
    const newDiaryEntry = { 
      id: Math.max(...diaries.map(d => d.id)) + 1,
      date,
      weather,
      visibility,
      comment,
    }
    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {

  const entry = diaries.find(d => d.id === id);
  return entry;
 };
 

export default {
  findById,
  getEntries,
  addDiary,
  getNonSensitiveEntries
};
