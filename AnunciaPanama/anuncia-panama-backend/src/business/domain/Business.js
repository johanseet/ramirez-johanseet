class Business {
    constructor(id, businessTypeId, fullName, name, description, address, contactEmail, contactPhone, websiteUrl, logoUrl, paypalSubscriptionId, createdAt) {
      this.id = id;
      this.businessTypeId = businessTypeId;
      this.fullName = fullName;
      this.name = name;
      this.description = description;
      this.address = address;
      this.contactEmail = contactEmail;
      this.contactPhone = contactPhone;
      this.websiteUrl = websiteUrl;
      this.logoUrl = logoUrl;
      this.paypalSubscriptionId = paypalSubscriptionId;
      this.createdAt = createdAt;
  
      this.validateEmail(contactEmail);
      this.validatePhone(contactPhone);
    }
  
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error(`Correo inválido: ${email}`);
      }
    }
  
    validatePhone(phone) {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(phone)) {
        throw new Error(`Número de teléfono inválido: ${phone}`);
      }
    }
  }
  
  export default Business;
  