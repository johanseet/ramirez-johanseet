const ROLES = ['administrator', 'client', 'business'];

class User {
  constructor(id, email, password, role, username, createdAt) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
    this.username = username;
    this.createdAt = createdAt;

    this.validateRole();
  }

  validateRole() {
    if (!ROLES.includes(this.role)) {
      throw new Error(`Invalid role: ${this.role}. Valid roles are: ${ROLES.join(', ')}`);
    }
  }

  changePassword(newPassword) {
    // Aquí podríamos agregar lógica para validar la complejidad del password
    this.password = newPassword;
  }

  updateEmail(newEmail) {
    // Aquí podríamos agregar lógica para validar el formato del email
    this.email = newEmail;
  }
}

export default User;
