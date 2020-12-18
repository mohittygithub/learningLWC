import { LightningElement, track } from "lwc";

export default class AssignmentThreeParent extends LightningElement {
  @track visitedCountries;
  @track total;

  constructor() {
    super();
    this.visitedCountries = [];
    this.total = 0;
  }
  submitbuttonclicked(e) {
    this.total = e.detail.length;
    let countries = [];
    for (let i = 0; i < e.detail.length; i++) {
      countries.push(e.detail[i]);
    }
    this.visitedCountries = countries;
  }
}