<template>
  <div class="modal fade" id="deleteModal" tabIndex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmation</h5>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">
          Are you sure you want to delete
          <strong>{{ internalJobName || "this job" }}</strong
          >?
        </div>

        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            type="button"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            class="btn btn-danger"
            type="button"
            @click="deleteJobVacancy"
          >
            I'm sure!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  name: "job-vacancy-delete-modal",
  data() {
    return {
      internalJobName: "",
    };
  },
  methods: {
    getModalInstance() {
      const modalElement = document.getElementById("deleteModal");
      return Modal.getInstance(modalElement) || new Modal(modalElement);
    },

    showDeleteModal(jobName) {
      this.internalJobName = jobName;
      this.getModalInstance().show();
    },

    deleteJobVacancy() {
      this.$emit("confirmed");
      this.getModalInstance().hide();
    },
  },
};
</script>

<style scoped></style>
