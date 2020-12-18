import { LightningElement, track } from "lwc";

export default class Calculator extends LightningElement {
  @track num1;
  @track num2;
  @track total = 0;

  // changeHandle(e) {
  //   this.num1 = e.target.value;
  //   this.num2 = e.target.value;
  // }
  handleClick(e) {
    this.num1 = Number(this.template.querySelector("[data-id ='1']").value);
    this.num2 = Number(this.template.querySelector("[data-id ='2']").value);
    if (e.target.label === "Add") {
      this.total = this.num1 + this.num2;
    } else if (e.target.label === "Substract") {
      this.total = this.num1 - this.num2;
    } else if (e.target.label === "Multiply") {
      this.total = this.num1 * this.num2;
    } else if (e.target.label === "Divide") {
      this.total = this.num1 / this.num2;
    } else if (e.target.label === "Reset") {
      this.num1 = "";
      this.num2 = "";
      this.total = 0;
    }
  }
}