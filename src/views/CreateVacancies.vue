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
import store from "@/store";
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
      errorMessage: "",
    };
  },
  mounted() {
    jobVacancyService
      .getCompanyJobVacancies(0, 10)
      .then((response) => {
        this.jobVacancyList = response.data.content ?? response.data;
      })
      .catch((err) => {
        console.error(err);
        this.errorMessage = "You are not authorized to view this content.";
      });
    console.log("User atual:", store.getters.currentUser);
  },
  methods: {
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
  },
};
</script>
