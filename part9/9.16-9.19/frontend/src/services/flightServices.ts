import axios from "axios"
import { DiaryEntry, sensitivityDiaryes } from "../types"

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
  return await axios.get<sensitivityDiaryes[]>(baseUrl).then(res => res.data)
}
export const createFlight = async (object : sensitivityDiaryes) => {
  return await axios.post<sensitivityDiaryes>(baseUrl,object).then(res => res.data)
} 