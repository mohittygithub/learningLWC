import { LightningElement, track } from "lwc";

export default class Welcome extends LightningElement {
  @track name = "";

  handleChanges(e) {
    this.name = e.target.value;
  }
}