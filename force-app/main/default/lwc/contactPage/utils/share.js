const actions = [
  { label: "Edit", name: "Edit" },
  { label: "Delete", name: "delete" }
];

const columns = [
  { label: "FirstName", type: "text", fieldName: "FirstName", sortable: true },
  { label: "LastName", type: "text", fieldName: "LastName", sortable: true },
  { label: "Email", type: "email", fieldName: "Email" },
  { label: "Phone", type: "phone", fieldName: "Phone" },
  { label: "City", type: "text", fieldName: "MailingCity", sortable: true },
  { label: "Country", type: "text", fieldName: "MailingCountry" },
  { label: "Account Name", type: "text", fieldName: "AccountName" },
  {
    type: "action",
    typeAttributes: { rowActions: actions }
  }
];

export { columns };