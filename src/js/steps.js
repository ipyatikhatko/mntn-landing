import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const animateStepElement = (root, selector, tweenOptions) => {
  const element = root.querySelector(selector);
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'bottom bottom'
    },
    ...tweenOptions
  })
}

export const initStepsAnimation = () => {

  const stepElements = [...document.getElementsByClassName('step')]

  stepElements.forEach(el => {
    // animate number
    animateStepElement(
      el, 
      '.step__number',
      {
        x: 0,
        opacity: 1,
      }
    )
    animateStepElement(
      el, 
      '.step__sub',
      {
        y: 0,
        opacity: 1,
      }
    )
    animateStepElement(
      el, 
      '.step__title',
      {
        y: 0,
        opacity: 1,
      }
    )
    animateStepElement(
      el, 
      '.step__paragraph',
      {
        x: 0,
        opacity: 1,
      }
    )
    

  })


}
