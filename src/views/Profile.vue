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
                <th scope="col">Status</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(jobApplication, ind) in jobApplicationList"
                :key="ind"
              >
                <th scope="row">{{ ind + 1 }}</th>
                <td>{{ jobApplication.jobName }}</td>
                <td>
                  <font-awesome-icon
                    v-if="statusIcon(jobApplication.status)"
                    :icon="statusIcon(jobApplication.status)"
                    class="me-2"
                  />
                  {{ formatStatus(jobApplication.status) }}
                </td>
                <td>{{ jobApplication.score }}</td>
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
import vuex from "vuex";
export default {
  name: "profileView",
  data() {
    return {
      jobApplicationList: [],
      page: 0,
      size: 5,
      totalPages: 0,
    };
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),
  },
  mounted() {
    this.fetchApplications();

    this.pollingInterval = setInterval(() => {
      this.fetchApplications();
    }, 5000);
  },
  methods: {
    statusIcon(status) {
      switch (status) {
        case "APPLIED":
          return ["fas", "magnifying-glass"];
        case "INTERVIEW":
          return ["fas", "calendar-days"];
        case "APPROVED":
          return ["fas", "thumbs-up"];
        case "DISQUALIFIED":
          return ["fas", "thumbs-down"];
      }
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
      }
    },

    fetchApplications() {
      jobApplicationService
        .getAllUserApplications(this.page, this.size)
        .then((response) => {
          this.jobApplicationList = response.data.content;
          this.totalPages = response.data.totalPages;
        })
        .catch((err) => {
          console.error("Error to find applications:", err);
        });
    },

    goToPage(index) {
      this.page = index;
      this.fetchApplications();
    },
    nextPage() {
      if (this.page < this.totalPages - 1) {
        this.page++;
        this.fetchApplications();
      }
    },
    prevPage() {
      if (this.page > 0) {
        this.page--;
        this.fetchApplications();
      }
    },
    onSizeChange() {
      this.page = 0;
      this.fetchApplications();
    },
  },

  beforeUnmount() {
    clearInterval(this.pollingInterval);
  },
};
</script>
