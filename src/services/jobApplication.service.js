import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader, handleResponseWithLoginCheck } from "./base.service";

const API_URL = BASE_API_URL + "/api/job-application";

class JobApplicationService {
  applyToJob(jobVacancyId, applicationData) {
    const req = axios.post(`${API_URL}/${jobVacancyId}`, applicationData, {
      headers: authHeader(),
    });
    return handleResponseWithLoginCheck(req);
  }

  getAllUserApplications(page = 0, size = 5) {
    const req = axios.get(`${API_URL}/profile?page=${page}&size=${size}`, {
      headers: authHeader(),
    });
    return handleResponseWithLoginCheck(req);
  }

  updateStatusOrScore(updateData) {
    const req = axios.put(`${API_URL}/company-jobs`, updateData, {
      headers: authHeader(),
    });
    return handleResponseWithLoginCheck(req);
  }

  getApplicationsByJobVacancy(jobVacancyId, page = 0, size = 5) {
    const req = axios.get(
      `${API_URL}/company-applications/${jobVacancyId}?page=${page}&size=${size}`,
      {
        headers: authHeader(),
      }
    );
    return handleResponseWithLoginCheck(req);
  }
}

export default new JobApplicationService();
