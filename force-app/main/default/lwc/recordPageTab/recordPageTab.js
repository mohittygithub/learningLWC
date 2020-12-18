import { LightningElement, api } from "lwc";

export default class RecordPageTab extends LightningElement {
  @api recordId;
  @api objectApiName;
}