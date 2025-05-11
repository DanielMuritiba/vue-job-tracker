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
              <h3>All jobs vacancy</h3>
            </div>

            <div class="col-6 text-end">
              <button class="btn btn-primary" @click="createJobVacancyRequest">
                Create job vacancy
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type of application</th>
                <th scope="col">Required Skills</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(jobVacancy, ind) in jobVacancyList" :key="ind">
                <th scope="row">{{ ind + 1 }}</th>
                <td>{{ jobVacancy.jobName }}</td>
                <td>{{ jobVacancy.requiredSkills }}</td>
                <td>{{ jobVacancy.description }}</td>
                <td>
                  {{ new Date(jobVacancy.createTime).toLocaleDateString() }}
                </td>
                <td>
                  <button
                    class="btn btn-primary me-1"
                    @click="editJobVacancyRequest(jobVacancy)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger"
                    @click="deleteJobVacancyRequest(jobVacancy, ind)"
                  >
                    Delete
                  </button>
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
  <job-vacancy-modal
    ref="jobVacancyModal"
    :selected-job-vacancy="selectedJobVacancy"
    @saved="jobVacancySaved"
  />
  <job-vacancy-delete-modal
    ref="deleteJobVacancyModal"
    @confirmed="deleteJobVacancy"
  />
</template>
<script>
import JobVacancyDeleteModal from "@/components/JobVacancyDeleteConfirm.vue";
import JobVacancyModal from "@/components/JobVacancy.vue";
import JobVacancy from "@/models/jobVacancy";
import jobVacancyService from "@/services/jobVacancy.service";
import { nextTick } from "vue";

export default {
  name: "CompanyJobsView",
  components: {
    JobVacancyModal,
    JobVacancyDeleteModal,
  },

  data() {
    return {
      jobVacancyList: [],
      selectedJobVacancy: new JobVacancy(),
      page: 0,
      size: 5,
      totalPages: 0,
      errorMessage: "",
    };
  },
  mounted() {
    this.fetchVacancies();
  },
  methods: {
    fetchVacancies() {
      jobVacancyService
        .getCompanyJobVacancies(this.page, this.size)
        .then((response) => {
          this.jobVacancyList = response.data.content ?? response.data;
          this.totalPages = response.data.totalPages ?? 1;
        })
        .catch((err) => {
          console.error(err);
          this.errorMessage = "You are not authorized to view this content.";
        });
    },

    createJobVacancyRequest() {
      this.selectedJobVacancy = new JobVacancy();

      nextTick(() => {
        this.$refs["jobVacancyModal"].showJobVacancyModal();
      });
    },

    deleteJobVacancy() {
      jobVacancyService
        .deleteJobVacancy(this.selectedJobVacancy.id)
        .then(() => {
          this.jobVacancyList.splice(this.selectedIndex, 1);
        })
        .catch((err) => {
          this.errorMessage = "Unexpected error occurred";
          console.log(err);
        });
    },

    editJobVacancyRequest(jobVacancy) {
      this.selectedJobVacancy = Object.assign({}, jobVacancy);

      nextTick(() => {
        this.$refs["jobVacancyModal"].showJobVacancyModal();
      });
    },

    deleteJobVacancyRequest(jobVacancy, ind) {
      this.selectedJobVacancy = jobVacancy;
      this.selectedIndex = ind;

      nextTick(() => {
        this.$refs["deleteJobVacancyModal"].showDeleteModal(jobVacancy.jobName);
      });
    },

    jobVacancySaved(jobVacancy) {
      const itemIndex = this.jobVacancyList.findIndex(
        (item) => item.id === jobVacancy.id
      );
      if (itemIndex !== -1) {
        this.jobVacancyList[itemIndex] = jobVacancy;
      } else {
        this.jobVacancyList.unshift(jobVacancy);
      }
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
  },
};
</script>
