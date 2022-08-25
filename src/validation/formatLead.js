const formatLead = (lead) => {
  if (!lead.lastName) {
    lead.lastName = "Sem último nome";
  }
  lead.lastName = lead.lastName.replace(/[0-9]/g, "");

  if (!lead.firstName) {
    lead.firstName = "Sem primeiro nome";
  }
  lead.firstName = lead.firstName.replace(/[0-9]/g, "");

  lead.phone = lead.phone.toString();
  delete lead.country;
  delete lead.leadSource;

  return lead;
};

export default formatLead;
