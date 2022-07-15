import { Controller } from "stimulus"

export default class extends Controller {
  toyTarget!: HTMLElement

  static targets = [
    "toy"
  ]

  connect() {
    fetch("counting/index.html", { mode: "no-cors" })
      .then(res => res.text())
      .then(html => this.toyTarget.innerHTML = html)
      .catch(err => console.error(err));
  }
}
