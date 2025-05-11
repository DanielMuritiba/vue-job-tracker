<template>
  <div class="container">
    <div class="pt-5">
      <div class="alert alert-danger" v-if="errorMessage">
        {{ errorMessage }}
      </div>
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h3>My jobs vacancy</h3>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Company</th>
                <th scope="col">Name</th>
                <th scope="col">Skills</th>
                <th scope="col">Resume</th>
                <th scope="col">Status</th>
                <th scope="col">Score</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(jobApplication, ind) in applications" :key="ind">
                <th scope="row">{{ ind + 1 }}</th>
                <td>{{ jobApplication.jobName }}</td>
                <td>{{ jobApplication.userUsername }}</td>
                <td>{{ jobApplication.userSkills }}</td>
                <td>{{ jobApplication.userDescription }}</td>
                <td>{{ formatStatus(jobApplication.status) }}</td>
                <td>{{ jobApplication.score ?? "Not evaluated" }}</td>
                <td>
                  <div class="d-flex flex-column align-items-start gap-2">
                    <button
                      class="btn btn-warning btn-sm"
                      @click="addScore(jobApplication)"
                    >
                      Score
                    </button>
                    <button
                      class="btn btn-success btn-sm"
                      @click="goToNextStep(jobApplication)"
                    >
                      Next step
                    </button>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="
                        updateStatus(
                          jobApplication.applicationId,
                          'DISQUALIFIED'
                        )
                      "
                    >
                      Disqualify
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <nav class="mt-4">
    <div
      class="d-flex justify-content-start align-items-center flex-wrap gap-4"
    >
      <div class="d-flex align-items-center">
        <label for="pageSizeSelect" class="form-label me-2 mb-0">
          Applications per page:
        </label>
        <select
          id="pageSizeSelect"
          class="form-select w-auto"
          v-model.number="size"
          @change="onSizeChange"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="15">15</option>
          <option :value="20">20</option>
        </select>
      </div>

      <ul class="pagination mb-0">
        <li class="page-item" :class="{ disabled: page === 0 }">
          <button class="page-link" @click="prevPage">Previous</button>
        </li>

        <li
          class="page-item"
          v-for="n in totalPages"
          :key="n"
          :class="{ active: page === n - 1 }"
        >
          <button class="page-link" @click="goToPage(n - 1)">
            {{ n }}
          </button>
        </li>

        <li class="page-item" :class="{ disabled: page >= totalPages - 1 }">
          <button class="page-link" @click="nextPage">Next</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import jobApplicationService from "@/services/jobApplication.service";
export default {
  name: "CompanyJobsView",
  data() {
    return {
      applications: [],
      errorMessage: "",
      page: 0,
      size: 5,
      totalPages: 0,
    };
  },
  mounted() {
    this.fetchAllApplications();
  },
  methods: {
    fetchAllApplications() {
      jobApplicationService
        .getAllCompanyApplications(this.page, this.size)
        .then((res) => {
          this.applications = res.data.content;
          this.totalPages = res.data.totalPages;
        })
        .catch((err) => {
          this.errorMessage = "Could not load applications.";
          console.error(err);
        });
    },

    updateStatus(applicationId, status) {
      jobApplicationService
        .updateStatusOrScore({
          applicationId,
          newStatus: status,
        })
        .then(() => this.fetchAllApplications());
    },

    addScore(app) {
      const score = prompt("Enter score (0-100):", app.userScore || "");
      if (score !== null && !isNaN(score)) {
        jobApplicationService
          .updateStatusOrScore({
            applicationId: app.applicationId,
            newScore: parseInt(score),
          })
          .then(() => this.fetchAllApplications());
      }
    },

    goToNextStep(app) {
      let nextStatus = null;

      switch (app.status) {
        case "APPLIED":
          nextStatus = "INTERVIEW";
          break;
        case "INTERVIEW":
          nextStatus = "APPROVED";
          break;
        default:
          this.errorMessage = "Cannot advance this application further.";
          return;
      }

      this.updateStatus(app.applicationId, nextStatus);
    },

    formatStatus(status) {
      switch (status) {
        case "APPLIED":
          return "Applied";
        case "INTERVIEW":
          return "Interview Scheduled";
        case "APPROVED":
          return "Approved";
        case "DISQUALIFIED":
          return "Disqualified";
        default:
          return status;
      }
    },
    nextPage() {
      if (this.page + 1 < this.totalPages) {
        this.page++;
        this.fetchAllApplications();
      }
    },
    prevPage() {
      if (this.page > 0) {
        this.page--;
        this.fetchAllApplications();
      }
    },
    goToPage(index) {
      this.page = index;
      this.fetchAllApplications();
    },
    onSizeChange() {
      this.page = 0;
      this.fetchAllApplications();
    },
  },
};
</script>
