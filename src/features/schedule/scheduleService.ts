import axios from "axios";
import { Schedule } from "../../models/Schedule";

const scheduleApi = axios.create({
  baseURL: "http://localhost:5000/api/schedule",
});

const createSchedule = async (scheduleData: Schedule): Promise<Schedule> => {
  const response = await scheduleApi.post<Schedule>("/", scheduleData);
  return response.data as Schedule;
};
