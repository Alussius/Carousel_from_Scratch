const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const itemsNav = document.querySelector(".carousel__nav");
const items = Array.from(itemsNav.children);
const prevBtn = document.querySelector(".carousel__button--left");
const nextBtn = document.querySelector(".carousel__button--right");

const slideWidth = slides[0].getBoundingClientRect().width;

// FUNCTIONS / METHODS
const setSlidePosition = (slide, index) => slide.style.left = `${slideWidth * index}px`;

const changeSlidePosition = (track, target) => {
    const moveAmount = target.style.left;
    track.style.transform = `translateX(-${moveAmount})`;
};

const updateCurrentSlide = (current, target) => {
    current.classList.remove("current-slide");
    target.classList.add("current-slide");
};

const showOrHideArrows = (slides, index, prevBtn, nextBtn) => {
    prevBtn.classList.remove("is-hidden");
    nextBtn.classList.remove("is-hidden");

    if (index === 0) prevBtn.classList.add("is-hidden");
    if (index === (slides.length - 1)) nextBtn.classList.add("is-hidden");
}

// Set Slide Position
slides.forEach(setSlidePosition);

// Slides Move to the Left when Next Button is clicked
nextBtn.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;

    if (!nextSlide) return; // Guard Clause
    
    const currentItem = itemsNav.querySelector(".current-slide");
    const targetItem = currentItem.nextElementSibling;
    const targetIndex = slides.findIndex(slide => slide === nextSlide);

    changeSlidePosition(track, nextSlide);
    updateCurrentSlide(currentSlide, nextSlide);
    updateCurrentSlide(currentItem, targetItem);
    showOrHideArrows(slides, targetIndex, prevBtn, nextBtn);
});

// Slides Move to the Right when Prev Button is clicked
prevBtn.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    
    if (!prevSlide) return; // Guard Clause
    
    const currentItem = itemsNav.querySelector(".current-slide");
    const targetItem = currentItem.previousElementSibling;
    const targetIndex = slides.findIndex(slide => slide === prevSlide);

    changeSlidePosition(track, prevSlide);
    updateCurrentSlide(currentSlide, prevSlide);
    updateCurrentSlide(currentItem, targetItem);
    showOrHideArrows(slides, targetIndex, prevBtn, nextBtn);
});

// Slides Move to the Target Slide when it's Indicator is clicked
itemsNav.addEventListener("click", e => {
    const targetItem = e.target.closest("button");

    if (!targetItem) return; // Guard Clause

    const currentItem = itemsNav.querySelector(".current-slide");
    const targetIndex = items.findIndex(item => item === targetItem);
    const currentSlide = track.querySelector(".current-slide");
    const targetSlide = slides[targetIndex];

    changeSlidePosition(track, targetSlide);
    updateCurrentSlide(currentSlide, targetSlide);
    updateCurrentSlide(currentItem, targetItem);
    showOrHideArrows(slides, targetIndex, prevBtn, nextBtn);
});