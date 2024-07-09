import "./style.scss"
import template from './templates/main.hbs'

document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById('root')) {
    const fragment = document.createRange().createContextualFragment(template());
    document.body.appendChild(fragment);
  }

  // Check for environment variable and log it (or perform other actions based on the environment)
  if (process.env.NODE_ENV === 'development') {
    console.log('Running in development mode');
  } else {
    console.log('Running in production mode');
  }
})
