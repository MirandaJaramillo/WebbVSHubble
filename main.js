//WE select all of the items, slider, images and slider handle
//Store them in variables

const slider = document.querySelector("#image-comparison-slider");
const sliderImgWrapper = document.querySelector(
  "#image-comparison-slider .img-wrapper"
);
const sliderHandle = document.querySelector("#image-comparison-slider .handle");

// Events listeners according to the movement of the mouse
slider.addEventListener("mousemove", sliderMouseMove);
//////////////////////////////////////////////
//event listener for touch devices
slider.addEventListener("touchmove", sliderMouseMove);
// functionality for moving the porcentage of ImgWrapper
function sliderMouseMove(event) {
  if (isSliderLocked) return;

  //Get the position of the slider
  const sliderLeftX = slider.offsetLeft;
  const sliderWidth = slider.clientWidth;
  const sliderHadleWidth = sliderHandle.clientWidth;

  let mouseX = (event.clientX || event.touches[0].clientX) - sliderLeftX;
  console.log(event.clientX);
  // touch event event.clientX returns undefined
  console.log(mouseX);
  if (mouseX < 0) mouseX = 0;
  else if (mouseX > sliderWidth) mouseX = sliderWidth;

  //sliderImgWrapper.style.width = `${(1 - mouseX / sliderWidth) * 100}%`;
  sliderImgWrapper.style.width = `${((1 - mouseX / sliderWidth) * 100).toFixed(
    4
  )}%`;
  sliderHandle.style.left = `calc(${((mouseX / sliderWidth) * 100).toFixed(
    4
  )}% - ${sliderHadleWidth / 2}px)`;
}

let isSliderLocked = false;

slider.addEventListener("mouseup", sliderMouseUp);
slider.addEventListener("mouseleave", sliderMouseLeave);
slider.addEventListener("mousedown", sliderMouseDown);
slider.addEventListener("touchstart", sliderMouseDown);
slider.addEventListener("touchend", sliderMouseDown);

function sliderMouseUp() {
  if (!isSliderLocked) isSliderLocked = true;
}

function sliderMouseLeave() {
  if (isSliderLocked) isSliderLocked = false;
}

function sliderMouseDown(event) {
  if (isSliderLocked) isSliderLocked = false;
  sliderMouseMove(event);
}
