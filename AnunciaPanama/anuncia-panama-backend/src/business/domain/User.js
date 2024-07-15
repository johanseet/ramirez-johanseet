const ROLES = ['business'];

class User {
  constructor(email, password, role, username) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.username = username;

    this.validateRole();
  }

  validateRole() {
    if (!ROLES.includes(this.role)) {
      throw new Error(`Invalid role: ${this.role}. Valid roles are: ${ROLES.join(', ')}`);
    }
  }

  changePassword(newPassword) {
    this.password = newPassword;
  }

  updateEmail(newEmail) {
    this.email = newEmail;
  }
}

export default User;
