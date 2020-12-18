import { LightningElement, track, wire } from "lwc";
import getAccount from "@salesforce/apex/AccountController.getAccounts";

export default class DisplayAccountUsingWire extends LightningElement {
  @track data;
  @wire(getAccount) accountRecords({ error, data }) {
    if (data) {
      this.data = data;
    } else if (error) {
      this.data = undefined;
      console.log("error : ", error);
    }
  }
}