import { Application } from "@hotwired/stimulus"
import ToyboxController from "./ts/toybox_controller"
import CountingController from "./ts/counting_controller"

window.Stimulus = Application.start();
Stimulus.register("toybox", ToyboxController);
Stimulus.register("counting", CountingController);
