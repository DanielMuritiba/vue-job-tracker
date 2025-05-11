<template>
  <div
    class="modal fade"
    id="jobApplicationCsvModal"
    tabindex="-1"
    ref="csvModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">CSV uploader</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div v-if="parseError" class="alert alert-danger">
            {{ parseError }}
          </div>
          <input
            type="file"
            class="form-control"
            accept=".csv"
            @change="handleFileUpload"
          />
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">Cancel</button>
          <button
            class="btn btn-primary"
            :disabled="!structuredData.length"
            @click="submitData"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  name: "JobApplicationCsv",

  data() {
    return {
      structuredData: [],
      parseError: "",
    };
  },

  methods: {
    handleFileUpload(event) {
      this.structuredData = [];
      this.parseError = "";

      const file = event.target.files[0];
      if (!file || file.type !== "text/csv") {
        this.parseError = "Invalid file. Please upload a valid CSV.";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        try {
          const lines = text
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);
          const headers = lines[0].split(",").map((h) => h.trim());
          const data = lines.slice(1).map((line) => {
            const values = line.split(",").map((v) => v.trim());
            return headers.reduce((obj, key, i) => {
              obj[key] = values[i] || "";
              return obj;
            }, {});
          });
          this.structuredData = data;
        } catch (err) {
          this.parseError = "Error processing file.";
        }
      };
      reader.readAsText(file);
    },

    submitData() {
      this.$emit("csv-submitted", this.structuredData[0]);
      this.closeModal();
    },

    closeModal() {
      const modalEl = this.$refs.csvModal;
      const instance = Modal.getInstance(modalEl);
      instance?.hide();
    },
  },
};
</script>

<style scoped>
.modal-body {
  font-size: 0.9rem;
}

pre {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  max-height: 200px;
  overflow: auto;
  font-size: 0.8rem;
}
</style>
