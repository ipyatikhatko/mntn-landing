import "./style.scss"
import { initStepsAnimation } from "./js/steps"
import { initPreloaderAnimations, showContent } from "./js/preloader"
import gsap from "gsap";

window.onload = () => {
  initPreloaderAnimations(gsap, (anim) => {
    // mock loading delay
    setTimeout(() => {
      initStepsAnimation();
      showContent(anim)
    }, 3000)
  })
}