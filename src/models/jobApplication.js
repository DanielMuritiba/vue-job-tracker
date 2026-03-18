export default class JobApplication {
  constructor(
    id,
    status,
    userUsername,
    userSkills,
    email,
    userDescription,
    score
  ) {
    this.id = id;
    this.status = status;
    this.userUsername = userUsername;
    this.userSkills = userSkills;
    this.email = email;
    this.userDescription = userDescription;
    this.score = score;
  }
}
