import { LightningElement, track } from "lwc";
import getNews from "@salesforce/apex/newsController.getNews";

export default class NewsComponent extends LightningElement {
  @track result = [];
  connectedCallback() {
    this.fetchNews();
  }

  fetchNews() {
    getNews()
      .then((response) => {
        console.log(response);
        this.formatNews(response.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  formatNews(response) {
    this.result = response.map((item, index) => {
      let id = `new_${index + 1}`;
      let name = item.source.name;
      let date = new Date(item.publishedAt).toDateString();
      console.log({ ...item, id: id, name: name, date: date });
      return { ...item, id: id, name: name, date: date };
    });
  }
}