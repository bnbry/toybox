import { Application } from "@hotwired/stimulus"
import CountingController from "./ts/counting_controller"

window.Stimulus = Application.start();
Stimulus.register("counting", CountingController);
