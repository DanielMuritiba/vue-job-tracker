import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader, handleResponseWithLoginCheck } from "./base.service";

const API_URL = BASE_API_URL + "/api/job-vacancy";

class JobVacancyService {
  saveJobVacancy(jobVacancy) {
    const req = axios.post(API_URL, jobVacancy, { headers: authHeader() });
    return handleResponseWithLoginCheck(req);
  }

  deleteJobVacancy(jobVacancyId) {
    const req = axios.delete(`${API_URL}/${jobVacancyId}`, {
      headers: authHeader(),
    });
    return handleResponseWithLoginCheck(req);
  }

  getAllJobVacancies(page = 0, size = 5) {
    return axios.get(`${API_URL}?page=${page}&size=${size}`);
  }

  getCompanyJobVacancies(page = 0, size = 5) {
    const req = axios.get(`${API_URL}/company?page=${page}&size=${size}`, {
      headers: authHeader(),
    });
    return handleResponseWithLoginCheck(req);
  }
}

export default new JobVacancyService();
