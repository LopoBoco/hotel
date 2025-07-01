class RateButton {
  initialize() {
    this.starElements = document.querySelectorAll('.js-rate-button__star');

    this.starElements.forEach((starElement) => {
      const handleStarClick = (e) => {
        function setStars(elem) {
          if (!elem.classList.contains('rate-button__star_active')) {
            elem.classList.add('rate-button__star_active');
          }
        }

        let setStarsFlag = true;
        let star = e.target.closest('.js-rate-button__star');

        star.parentElement.childNodes.forEach((starDiv) => {
          if (starDiv.nodeName === 'DIV' && starDiv.classList.contains('rate-button__star_active')) {
            setStarsFlag = false;
          }
        });

        if (setStarsFlag) {
          setStars(star);
          while (star.previousElementSibling) {
            star = star.previousElementSibling;
            setStars(star);
          }
        } else {
          star.parentElement.childNodes.forEach((starDiv) => {
            if (starDiv.nodeName === 'DIV') {
              starDiv.classList.remove('rate-button__star_active');
            }
          });
        }
      };

      starElement.addEventListener('click', handleStarClick);
    });
  }
}

export default RateButton;
