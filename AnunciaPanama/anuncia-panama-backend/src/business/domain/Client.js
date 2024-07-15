const GENDERS = ['female','male','other'];

class Client {
    constructor(fullName, dateOfBirth, gender) {
      this.fullName = fullName;
      this.dateOfBirth = dateOfBirth;
      this.gender = gender;

      this.validateGender();
    }

  validateGender() {
    if (!GENDERS.includes(this.gender)) {
      throw new Error(`Invalid gender: ${this.gender}. Valid gender are: ${GENDERS.join(', ')}`);
    }
  }
}
  
  export default Client;
  