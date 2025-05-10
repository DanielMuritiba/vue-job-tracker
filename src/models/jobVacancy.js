export default class JobVacancy {
  constructor(
    id,
    companyUsername,
    jobName,
    requiredSkills,
    description,
    createTime
  ) {
    this.id = id;
    this.companyUsername = companyUsername;
    this.jobName = jobName;
    this.requiredSkills = requiredSkills;
    this.description = description;
    this.createTime = createTime;
  }
}
