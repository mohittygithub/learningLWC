import { LightningElement, api } from "lwc";

export default class AssignmentTwoChild extends LightningElement {
  @api country;
  @api capital;
  @api population;
  @api president;
  @api image;
}