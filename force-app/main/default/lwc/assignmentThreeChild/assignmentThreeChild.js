import { LightningElement, track } from "lwc";
import { india, france, usa } from "./utils/utils";

export default class AssignmentThreeChild extends LightningElement {
  @track india;
  @track france;
  @track usa;
  countriesVisited;

  constructor() {
    super();
    this.countriesVisited = [];
    this.india = india;
    this.france = france;
    this.usa = usa;
  }
  handleChange(e) {
    if (e.target.checked) {
      this.countriesVisited.push(e.target.value);
    } else {
      const index = this.countriesVisited.indexOf(e.target.value);
      if (index > -1) {
        this.countriesVisited.splice(index, 1);
      }
    }
  }
  handleClick() {
    const buttonEvent = new CustomEvent("submitbuttonclicked", {
      detail: this.countriesVisited
    });
    this.dispatchEvent(buttonEvent);
  }
}