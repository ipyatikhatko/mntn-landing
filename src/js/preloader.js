export const initPreloaderAnimations = (gsap, cb) => {
  const preloaderAnimation = gsap.fromTo(".preloader__container", {
    opacity: 0
  }, {
    duration: 1, 
    opacity: 1,
    ease:"power1.inOut",
    repeat: -1
  });

  cb(preloaderAnimation);
}

export const showContent = (preloaderAnimation) => {
  const root = document.getElementById('root');
  const preloader = document.getElementById('preloader');
  preloader.remove();
  preloaderAnimation.kill();
  document.body.classList.remove('overflow-hidden');
  root.classList.remove('hide-content');
  root.classList.add('show-content');
}