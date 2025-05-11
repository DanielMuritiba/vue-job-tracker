<template>
  <div class="container p-3">
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <div v-if="infoMessage" class="alert alert-success">
      {{ infoMessage }}
    </div>

    <div class="d-flex flex-wrap justify-content-center">
      <div
        v-for="(jobVacancy, ind) in jobVacancyList"
        :key="ind"
        class="card m-3 shadow-sm"
        style="width: 300px; background-color: #f6f6f6"
      >
        <div
          class="card-header bg-primary text-white d-flex align-items-center"
        >
          <font-awesome-icon :icon="['fas', 'briefcase']" class="me-2" />
          <h6 class="mb-0 text-uppercase">{{ jobVacancy.companyUsername }}</h6>
        </div>

        <div class="card-body">
          <h5 class="card-title text-uppercase">{{ jobVacancy.jobName }}</h5>

          <div class="mt-3">
            <h6 class="fw-bold mb-1">Required Skills</h6>
            <p class="text-muted mb-2">{{ jobVacancy.requiredSkills }}</p>
          </div>

          <div>
            <h6 class="fw-bold mb-1">Description</h6>
            <p class="text-muted">{{ jobVacancy.description }}</p>
          </div>

          <small class="text-muted"
            >Published in: {{ formatDate(jobVacancy.createTime) }}</small
          >
        </div>

        <div class="row px-3 pb-3">
          <div class="col-12">
            <button
              class="btn btn-outline-success w-100"
              @click="openCsvModal(jobVacancy)"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>

    <nav class="mt-4">
      <div
        class="d-flex justify-content-center align-items-center flex-wrap gap-4"
      >
        <div class="d-flex align-items-center">
          <label for="pageSizeSelect" class="form-label me-2 mb-0">
            Vacancy per page:
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
  </div>
  <JobApplicationCsv @csv-submitted="handleCsvSubmission" />
</template>

<script>
import jobApplicationService from "@/services/jobApplication.service";
import jobVacancyService from "@/services/jobVacancy.service";
import vuex from "vuex";
import JobApplicationCsv from "@/components/JobApplicationCsv.vue";
import { Modal } from "bootstrap";

export default {
  name: "homeView",

  data() {
    return {
      jobVacancyList: [],
      page: 0,
      size: 5,
      totalPages: 0,
      totalElements: 0,
      selectedJobVacancy: null,
      errorMessage: "",
      infoMessage: "",
    };
  },

  components: {
    JobApplicationCsv,
  },

  computed: {
    ...vuex.mapGetters(["currentUser"]),
  },

  mounted() {
    this.fetchVacancies();
  },

  methods: {
    openCsvModal(jobVacancy) {
      this.selectedJobVacancy = jobVacancy;
      const modalEl = document.getElementById("jobApplicationCsvModal");
      const modal = Modal.getOrCreateInstance(modalEl);
      modal.show();
    },

    handleCsvSubmission(csvData) {
      jobApplicationService
        .applyToJob(this.selectedJobVacancy.id, csvData)
        .then(() => {
          this.infoMessage = "Application sent successfully!";
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            this.errorMessage = err.response.data.message;
          } else {
            this.errorMessage = "Already applied.";
          }
          console.error("Error:", err);
        });
    },

    fetchVacancies() {
      jobVacancyService
        .getAllJobVacancies(this.page, this.size)
        .then((response) => {
          this.jobVacancyList = response.data.content;
          this.totalPages = response.data.totalPages;
        });
    },

    goToPage(index) {
      this.page = index;
      this.fetchVacancies();
    },

    nextPage() {
      if (this.page < this.totalPages - 1) {
        this.page++;
        this.fetchVacancies();
      }
    },

    prevPage() {
      if (this.page > 0) {
        this.page--;
        this.fetchVacancies();
      }
    },

    onSizeChange() {
      this.page = 0;
      this.fetchVacancies();
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>
