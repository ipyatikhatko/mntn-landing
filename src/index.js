import "./style.scss"
import template from './templates/main.hbs'

document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById('root')) {
    const fragment = document.createRange().createContextualFragment(template());
    document.body.appendChild(fragment);
  }
})
