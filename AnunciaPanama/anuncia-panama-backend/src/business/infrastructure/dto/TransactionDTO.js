class TransactionDTO {
  constructor(user, client, business) {
    this.user_email = user.email;
    this.user_password = user.password;
    this.user_role = user.role;
    this.user_username = user.username;
    this.client_full_name = client.fullName;
    this.client_date_of_birth = client.dateOfBirth;
    this.client_gender = client.gender;
    this.business_type_id = business.businessTypeId;
    this.business_name = business.businessName;
    this.business_description = business.businessDescription;
    this.business_address = business.address;
    this.business_contact_email = business.contactEmail;
    this.business_contact_phone = business.contactPhone;
    this.business_website_url = business.websiteUrl;
    this.business_social_networks_url = JSON.stringify(business.socialNetworksUrl);
  }
}

export default TransactionDTO;
