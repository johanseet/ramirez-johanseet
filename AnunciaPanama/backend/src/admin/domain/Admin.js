class Admin {
    constructor(id, fullName, phoneNumber, createdAt) {
      this.id = id;
      this.fullName = fullName;
      this.phoneNumber = phoneNumber;
      this.createdAt = createdAt;
  
      this.validatePhone(phoneNumber);
    }
  
    validatePhone(phone) {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(phone)) {
        throw new Error(`Invalid phone number: ${phone}`);
      }
    }
  }
  
  export default Admin;
  