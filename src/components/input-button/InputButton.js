class InputButton {
  initialize() {
    this.likes = document.querySelectorAll('.js-input-button__input_type_like');

    this.likes.forEach((item) => {
      const handleLikeClick = (e) => {
        const like = e.target;
        if (!like.classList.contains('input-button__input_type_like_active')) {
          like.classList.add('input-button__input_type_like_active');
          like.value = parseInt(like.value, 10) + 1;
        } else {
          like.classList.remove('input-button__input_type_like_active');
          like.value = parseInt(like.value, 10) - 1;
        }
      };

      item.addEventListener('click', handleLikeClick);
    });
  }
}

export default InputButton;