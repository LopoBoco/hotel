class FeedbackDiagram {
  getElements() {
    this.feedbackDiagram = document.querySelector('.feedback-diagram');

    this.disappointedSegment = document.querySelector('.js-feedback-diagram__segment-disappointed');
    this.acceptableSegment = document.querySelector('.js-feedback-diagram__segment-acceptable');
    this.goodSegment = document.querySelector('.js-feedback-diagram__segment-good');
    this.amazingSegment = document.querySelector('.js-feedback-diagram__segment-amazing');

    this.feedbackTotalNumberField = document.querySelector('.js-feedback-diagram__text-number');
    this.feedbackTotalNumberText = document.querySelector('.js-feedback-diagram__text-label');
  }

  render() {
    function isUnitNumber(number) {
      return (number === 1 || (number > 20 && number % 10 === 1));
    }

    function isMultipleNumber(number) {
      return (number >= 2 && number <= 4) || (number > 20 && (number % 10 >= 2 && number % 10 <= 4));
    }

    const feedbackCount = JSON.parse(this.feedbackDiagram.dataset.feedback);
    let feedbackTotalNumber = 0;
    let notZeroFeedbackCount = 0;

    Object.values(feedbackCount).forEach((count) => {
      if (parseInt(count, 10)) {
        notZeroFeedbackCount++;
      }
      feedbackTotalNumber += parseInt(count, 10);
    });

    let rate1DashArray = 0;
    let rate2DashArray = 0;
    let rate3DashArray = 0;
    let rate4DashArray = 0;

    const rate1DashOffset = 24.75;
    let rate2DashOffset;
    let rate3DashOffset;
    let rate4DashOffset;

    if (feedbackCount.disappointed > 0) {
      rate1DashArray = (100 * feedbackCount.disappointed) / feedbackTotalNumber - 0.5;
      this.disappointedSegment.setAttribute('stroke-width', '1');
      if (notZeroFeedbackCount === 1) {
        this.disappointedSegment.setAttribute('stroke-dasharray', '100 0');
      } else {
        this.disappointedSegment.setAttribute('stroke-dasharray', `${rate1DashArray} ${100 - rate1DashArray}`);
      }

      this.disappointedSegment.setAttribute('stroke-dashoffset', `${rate1DashOffset}`);
      rate1DashArray += 0.5;
    }

    rate2DashOffset = rate1DashOffset - rate1DashArray;
    if (rate2DashOffset < 0) {
      rate2DashOffset = 100 + rate2DashOffset;
    }
    if (feedbackCount.acceptable > 0) {
      rate2DashArray = (100 * feedbackCount.acceptable) / feedbackTotalNumber - 0.5;
      this.acceptableSegment.setAttribute('stroke-width', '1');
      if (notZeroFeedbackCount === 1) {
        this.acceptableSegment.setAttribute('stroke-dasharray', '100 0');
      } else {
        this.acceptableSegment.setAttribute('stroke-dasharray', `${rate2DashArray} ${100 - rate2DashArray}`);
      }

      this.acceptableSegment.setAttribute('stroke-dashoffset', `${rate2DashOffset}`);
      rate2DashArray += 0.5;
    }

    rate3DashOffset = rate2DashOffset - rate2DashArray;
    if (rate3DashOffset < 0) {
      rate3DashOffset = 100 + rate3DashOffset;
    }
    if (feedbackCount.good > 0) {
      rate3DashArray = (100 * feedbackCount.good) / feedbackTotalNumber - 0.5;
      this.goodSegment.setAttribute('stroke-width', '1');
      if (notZeroFeedbackCount === 1) {
        this.goodSegment.setAttribute('stroke-dasharray', '100 0');
      } else {
        this.goodSegment.setAttribute('stroke-dasharray', `${rate3DashArray} ${100 - rate3DashArray}`);
      }

      this.goodSegment.setAttribute('stroke-dashoffset', `${rate3DashOffset}`);
      rate3DashArray += 0.5;
    }

    rate4DashOffset = rate3DashOffset - rate3DashArray;
    if (rate4DashOffset < 0) {
      rate4DashOffset = 100 + rate4DashOffset;
    }
    if (feedbackCount.amazing > 0) {
      rate4DashArray = (100 * feedbackCount.amazing) / feedbackTotalNumber - 0.5;
      this.amazingSegment.setAttribute('stroke-width', '1');
      if (notZeroFeedbackCount === 1) {
        this.amazingSegment.setAttribute('stroke-dasharray', '100 0');
      } else {
        this.amazingSegment.setAttribute('stroke-dasharray', `${rate4DashArray} ${100 - rate4DashArray}`);
      }

      this.amazingSegment.setAttribute('stroke-dashoffset', `${rate4DashOffset}`);
      rate4DashArray += 0.5;
    }

    this.feedbackTotalNumberField.innerHTML = feedbackTotalNumber;

    if (isUnitNumber(feedbackTotalNumber)) {
      this.feedbackTotalNumberText.innerHTML = 'голос';
    } else if (isMultipleNumber(feedbackTotalNumber)) {
      this.feedbackTotalNumberText.innerHTML = 'голоса';
    } else if (feedbackTotalNumber > 4) {
      this.feedbackTotalNumberText.innerHTML = 'голосов';
    }
  }

  initialize() {
    this.getElements();
    if (this.feedbackDiagram) {
      this.render();
    }
  }
}

export default FeedbackDiagram;
