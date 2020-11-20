import { LightningElement, track, api } from "lwc";
import { countries } from "./util";

export default class VisitedChild extends LightningElement {
  @track countries;
  @api visited;
  @track counter;
  @track value;
  name;
  constructor() {
    super();
    this.counter = 0;
    this.value = "";
    this.name = "";
    this.countries = countries;
  }

  changeHandle(e) {
    for (i = 0; i < this.countries.length; i++) {
      this.value += this.countries[i].name;
      break;
    }
    this.counter++;
  }
  handleClick(e) {
    console.log(this.value);
  }
}
let i = 0;
