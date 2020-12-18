import { LightningElement, track } from "lwc";

const options = [
  { label: "India", value: "India" },
  { label: "France", value: "France" },
  { label: "USA", value: "USA" }
];
export default class AssignmentTwoParent extends LightningElement {
  @track options;
  @track selectedCountry;
  @track country;
  @track capital;
  @track population;
  @track president;
  @track image;

  constructor() {
    super();
    this.options = options;
    this.image =
      "https://www.history.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTU3ODc4NjAyOTg5OTcwNzYx/ask-history-what-is-the-largest-country-in-the-world-2.jpg";
  }

  handleChange(e) {
    this.selectedCountry = e.target.value;
    console.log("parent country = ", this.selectedCountry);
  }

  handleClick() {
    this.country = this.selectedCountry;
    if (this.country === "India") {
      this.capital = "New Delhi";
      this.population = "1.3B";
      this.president = "Ramnath Kovind";
      this.image =
        "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg";
    } else if (this.country === "France") {
      this.capital = "Paris";
      this.population = "67M";
      this.president = "Emmanuel Macron";
      this.image =
        "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F02%2Feiffel-tower-paris-france-EIFFEL0217.jpg";
    } else if (this.country === "USA") {
      this.capital = "Washington DC";
      this.population = "320M";
      this.president = "Donald Trump";
      this.image =
        "https://imageproxy.themaven.net//https%3A%2F%2Fwww.history.com%2F.image%2FMTY1MTc1MTk3ODI0MDAxNjA5%2Ftopic-statue-of-liberty-gettyimages-960610006-promo.jpg";
    }
  }
}