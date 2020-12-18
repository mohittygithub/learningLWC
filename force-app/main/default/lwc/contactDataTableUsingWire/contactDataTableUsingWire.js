import { LightningElement, track, wire } from "lwc";
import getContacts from "@salesforce/apex/ContactController.getContacts";

export default class ContactDataTableUsingWire extends LightningElement {
  @track data;
  @track columns = [
    { label: "Name", fieldName: "Name", type: "text" },
    { label: "Account", fieldName: "Account", type: "text" },
    { label: "Email", fieldName: "Email", type: "email" },
    { label: "Department", fieldName: "Department", type: "text" },
    { label: "Phone", fieldName: "Phone", type: "phone" }
  ];
  @wire(getContacts) contactRecords({ error, data }) {
    // if (data) {
    //   this.data = data;
    // } else if (error) {
    //   this.data = undefined;
    // }

    if (data) {
      rows = JSON.parse(JSON.stringify(data));
      //console.log(rows);

      for (i = 0; i < rows.length; i++) {
        dataParse = rows[i];
        //console.log("dataparse", dataParse);
        if (dataParse.hasOwnProperty("Account")) {
          //console.log(dataParse.hasOwnProperty("Account"));
          if (dataParse.Account.hasOwnProperty("Name"))
            //console.log(dataParse.Account.hasOwnProperty("Name"));
            dataParse.Account = dataParse.Account.Name;
        }
      }
      this.data = rows;
    } else if (error) {
      this.data = undefined;
    }
  }
}
let i;
let rows;
let dataParse;