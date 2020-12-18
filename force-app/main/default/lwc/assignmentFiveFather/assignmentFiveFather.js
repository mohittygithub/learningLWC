import { LightningElement, track } from "lwc";

export default class AssignmentFiveFather extends LightningElement {
  @track fatherTitle;
  @track sonTitle;
  @track daughterTitle;

  constructor() {
    super();
    this.fatherTitle = "Paul Johnson";
    this.sonTitle = "Micheal";
    this.daughterTitle = "Ruby";
  }
}