import { LightningElement, track, api, wire } from "lwc";
import { columns } from "./utils/utils";
import getContactsByAccountId from "@salesforce/apex/ContactController.getContactsByAccountId";

export default class ShowAccountChildren extends LightningElement {
  @track columnsList;
  @track contacts;
  @track error;
  @api recordId;
  @api objectApiName;

  constructor() {
    super();
    this.columnsList = columns;
    this.dataList = this.parentData;
  }

  @wire(getContactsByAccountId, { accountId: "$recordId" })
  getContacts;

  // click actions
  handleClick(e) {
    if (e.target.label === "Name") {
      console.log("true");
    }
  }
}