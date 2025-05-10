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
              <button class="btn btn-primary" @click="createDeviceRequest">
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
                  <button class="btn btn-primary me-1">Edit</button>
                  <!-- <button
                    class="btn btn-primary me-1"
                    @click="editDeviceRequest(jobVacancy)"
                  >
                    > Edit
                  </button> -->
                  <button class="btn btn-danger">Delete</button>
                  <!-- <button
                    class="btn btn-danger"
                    @click="deleteDeviceRequest(jobVacancy, ind)"
                  >
                    > Delete
                  </button> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import jobVacancyService from "@/services/jobVacancy.service";
import store from "@/store";
export default {
  name: "CompanyJobsView",
  data() {
    return {
      jobVacancyList: [],
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
};
</script>
