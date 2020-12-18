import { LightningElement, track, api } from "lwc";
import { tableColumns } from "./utils/utils";

export default class AccountChild extends LightningElement {
  @api recordId;
  @api objectApiName;
  @api accountId;
  @track columnsList;
  @track dataList;

  constructor() {
    super();
    this.columnsList = tableColumns;
  }
}