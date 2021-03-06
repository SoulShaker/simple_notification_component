/* eslint func-names: ["error", "never"] */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const tips = [
      {
        caption: 'Tip caption 1',
        text: `Repulsive questions contented him few extensive supported.
        Of remarkably thoroughly he appearance in. Supposing tolerably applauded or of be.`,
      },
      {
        caption: 'Tip caption 2',
        text: `Suffering unfeeling so objection agreeable allowance me of.
        Ask within entire season sex common far who family.`,
      },
      {
        caption: 'Tip caption 3',
        text: `As be valley warmth assure on.
        Park girl they rich hour new well way you. Face ye be me been room we sons fond.`,
      },
      {
        caption: 'Tip caption 4',
        text: 'Thoughts she why not directly reserved packages you. Winter an silent favour of am tended mutual.',
      },
    ];

    const tipsContainer = document.querySelector('.notification__body');
    const dotsContainer = document.querySelector('.notification__dots');

    tips.forEach((tip, index) => {
      const tipContainer = document.createElement('div');
      tipContainer.className = 'notification__item';

      const tipCaption = document.createElement('p');
      tipCaption.innerText = tip.caption;
      tipCaption.className = 'notification__caption';

      const tipText = document.createElement('p');
      tipText.innerText = tip.text;

      tipContainer.appendChild(tipCaption);
      tipContainer.appendChild(tipText);

      tipsContainer.appendChild(tipContainer);

      const dot = document.createElement('button');
      if (index === 0) dot.className = 'dot dot_active';
      else dot.className = 'dot';

      dotsContainer.appendChild(dot);
    });

    const notification = document.querySelector('.notification');
    const items = document.querySelectorAll('.notification__item');
    const arrows = document.querySelectorAll('.control');
    const dots = document.querySelectorAll('.dot');
    const closeButton = document.querySelector('.notification__close');
    const checkbox = document.getElementById('disable-tips');

    let left = 0;
    let carouselXPos = 0;
    let carouselTipStep = 100;
    const maxCarouselXPos = items.length * carouselTipStep;

    Array.prototype.forEach.call(items, (item, index) => {
      items[index].style.left = `${left}%`;
      left += carouselTipStep;
    });

    function slider() {
      switch (carouselXPos) {
        case -carouselTipStep:
          carouselXPos = maxCarouselXPos - carouselTipStep;
          break;
        case maxCarouselXPos:
          carouselXPos = 0;
          break;
        default:
          break;
      }

      for (let i = 0; i < items.length; i += 1) {
        items[i].style.transform = `translateX(-${carouselXPos}%)`;
      }
    }

    function sliderPrevEvent() {
      carouselXPos -= carouselTipStep;

      const pos = (carouselXPos < 0 ? maxCarouselXPos - carouselTipStep : carouselXPos) / carouselTipStep;
      document.querySelector('.dot_active').classList.toggle('dot_active');
      dots[pos].classList.add('dot_active');
      slider();
    }

    function sliderNextEvent() {
      carouselXPos += carouselTipStep;

      const pos = (carouselXPos === maxCarouselXPos ? 0 : carouselXPos) / carouselTipStep;
      document.querySelector('.dot_active').classList.toggle('dot_active');
      dots[pos].classList.add('dot_active');
      slider();
    }

    if (localStorage.getItem('disableTips') === 'false' || localStorage.getItem('disableTips') === null) {
      setTimeout(() => {
        notification.classList.toggle('notification_show');
      }, 5000);
    }

    checkbox.addEventListener('change', function () {
      if (this.checked) {
        localStorage.setItem('disableTips', 'true');
      } else {
        localStorage.setItem('disableTips', 'false');
      }
    });

    closeButton.addEventListener('click', () => {
      notification.classList.toggle('notification_show');
    });

    dotsContainer.addEventListener('click', (e) => {
      const { target } = e;
      if (target.className !== 'dot') return;

      document.querySelector('.dot_active').classList.toggle('dot_active');
      target.classList.add('dot_active');
      const pos = Array.prototype.indexOf.call(dots, target);
      carouselXPos = pos * carouselTipStep;
      slider();
    });

    arrows[0].addEventListener('click', sliderPrevEvent);
    arrows[1].addEventListener('click', sliderNextEvent);

    document.addEventListener('keydown', (e) => {
      const { keyCode } = e;
      if (keyCode === 37) {
        sliderPrevEvent();
      } else if (keyCode === 39) {
        sliderNextEvent();
      } else if (keyCode === 27) {
        notification.classList.toggle('notification_show');
      }
    });
  });
}());
