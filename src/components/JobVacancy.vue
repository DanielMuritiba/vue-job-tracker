<template>
  <div class="modal fade" id="jobVacancyModal" tabIndex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <form
          @submit.prevent="saveJobVacancy"
          novalidate
          :class="submitted ? 'was-validated' : ''"
        >
          <div class="modal-header">
            <h5 class="modal-title">Job Vacancy Details</h5>
            <button
              class="btn-close"
              type="button"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-if="errorMessage">
              <strong>Error!</strong> {{ errorMessage }}
            </div>

            <div class="form-group">
              <label for="name">Type of application</label>
              <input
                v-model="jobVacancy.jobName"
                type="text"
                id="jobName"
                name="jobName"
                class="form-control"
                required
              />
              <div class="invalid-feedback">
                Type of application is required.
              </div>
            </div>

            <div class="form-group">
              <label for="price">Required Skills</label>
              <input
                v-model="jobVacancy.requiredSkills"
                type="text"
                id="requiredSkills"
                name="requiredSkills"
                class="form-control"
                required
              />
              <div class="invalid-feedback">You need at least one Skill.</div>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                v-model="jobVacancy.description"
                id="description"
                name="description"
                class="form-control"
                required
              >
              </textarea>
              <div class="invalid-feedback">Description is required.</div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-primary" type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import JobVacancy from "@/models/jobVacancy";
import jobVacancyService from "@/services/jobVacancy.service";
import { Modal } from "bootstrap";
import { ref } from "vue";
export default {
  name: "job-vacancy-modal",

  props: {
    selectedJobVacancy: { type: Object },
  },
  setup(props, context) {
    const jobVacancy = ref(new JobVacancy());
    const errorMessage = ref("");
    const submitted = ref(false);

    function saveJobVacancy() {
      this.submitted = true;
      if (
        !jobVacancy.value.jobName ||
        !jobVacancy.value.requiredSkills ||
        !jobVacancy.value.description
      ) {
        return;
      }
      const payload = {
        id: jobVacancy.value.id ?? null,
        jobName: jobVacancy.value.jobName,
        requiredSkills: jobVacancy.value.requiredSkills,
        description: jobVacancy.value.description,
      };

      jobVacancyService
        .saveJobVacancy(payload)
        .then((response) => {
          context.emit("saved", response.data);
          const modalElement = document.getElementById("jobVacancyModal");
          const modal =
            Modal.getInstance(modalElement) || new Modal(modalElement);
          modal.hide();
        })
        .catch((err) => {
          errorMessage.value = "Unexpected error occurred.";
          console.log(err);
        });
    }

    function showJobVacancyModal() {
      jobVacancy.value = Object.assign({}, props.selectedJobVacancy);
      const modalElement = document.getElementById("jobVacancyModal");
      const modal = new Modal(modalElement);
      modal.show();
    }

    return {
      jobVacancy,
      errorMessage,
      submitted,
      saveJobVacancy,
      showJobVacancyModal,
    };
  },
};
</script>

<style scoped></style>
