import { LightningElement, track, wire } from "lwc";
import getAccountList from "@salesforce/apex/AccountDetailsForLWC.getAccountList";

export default class AccountData extends LightningElement {
  @track error;
  @track accountList;
  @track columns = [
    { label: "Account Name", fieldName: "Name", type: "text", sortable: true },
    { label: "Phone", fieldName: "Phone", type: "phone", sortable: true },
    { label: "Rating", fieldName: "Rating", type: "test", sortable: true },
    {
      label: "Annual Revenue",
      fieldName: "AnnualRevenue",
      type: "currency",
      sortable: true
    },
    { label: "Type", fieldName: "Type", type: "text", sortable: true }
  ];

  @track error;
  @wire(getAccountList)
  wiredAccounts({ error, data }) {
    if (data) {
      this.accountList = data;
    } else if (error) {
      this.error = error;
      console.log(this.error);
    }
  }
}