
class Business {
  constructor(businessTypeId, businessName, businessDescription, address, contactEmail, contactPhone, websiteUrl, socialNetworksUrl) {
    this.businessTypeId = businessTypeId;
    this.businessName = businessName;
    this.businessDescription = businessDescription;
    this.address = address;
    this.contactEmail = contactEmail;
    this.contactPhone = contactPhone;
    this.websiteUrl = websiteUrl;
    this.socialNetworksUrl = socialNetworksUrl;

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
