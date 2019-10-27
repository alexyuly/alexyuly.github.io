const frame = document.querySelector(".frame");
const frameHeader = document.querySelector(".frame header");
const frameResizeHandleNW = document.querySelector(".frame .resize-handle.nw");
const frameResizeHandleNE = document.querySelector(".frame .resize-handle.ne");
const frameResizeHandleSE = document.querySelector(".frame .resize-handle.se");
const frameResizeHandleSW = document.querySelector(".frame .resize-handle.sw");

frame.style.width = `${window.innerWidth / 2}px`;
frame.style.height = `${window.innerHeight / 2}px`;
frame.style.left = `${window.innerWidth / 4}px`;
frame.style.top = `${window.innerHeight / 4}px`;
frameResizeHandleNW.style.width = "24px";
frameResizeHandleNW.style.height = "24px";
frameResizeHandleNE.style.width = "24px";
frameResizeHandleNE.style.height = "24px";
frameResizeHandleSE.style.width = "24px";
frameResizeHandleSE.style.height = "24px";
frameResizeHandleSW.style.width = "24px";
frameResizeHandleSW.style.height = "24px";

const updateFrameResizeHandles = () => {
  frameResizeHandleNW.style.left = `${-parseFloat(frameResizeHandleNW.style.width) / 2}px`;
  frameResizeHandleNW.style.top = `${-parseFloat(frameResizeHandleNW.style.height) / 2}px`;
  frameResizeHandleNE.style.left = `${parseFloat(frame.style.width) - (parseFloat(frameResizeHandleNE.style.width) / 2)}px`;
  frameResizeHandleNE.style.top = `${-parseFloat(frameResizeHandleNW.style.height) / 2}px`;
  frameResizeHandleSE.style.left = `${parseFloat(frame.style.width) - (parseFloat(frameResizeHandleSE.style.width) / 2)}px`;
  frameResizeHandleSE.style.top = `${parseFloat(frame.style.height) - (parseFloat(frameResizeHandleSE.style.height) / 2)}px`;
  frameResizeHandleSW.style.left = `${-parseFloat(frameResizeHandleSW.style.width) / 2}px`;
  frameResizeHandleSW.style.top = `${parseFloat(frame.style.height) - (parseFloat(frameResizeHandleSW.style.height) / 2)}px`;
};

updateFrameResizeHandles();

let dragging = false;
let resizingNW = false;
let resizingNE = false;
let resizingSE = false;
let resizingSW = false;
let lastX;
let lastY;

frameHeader.addEventListener("mousedown", (event) => {
  dragging = true;
  frameHeader.classList.add("dragging");
  lastX = event.clientX;
  lastY = event.clientY;
});

frameResizeHandleNW.addEventListener("mousedown", (event) => {
  resizingNW = true;
  frameResizeHandleNW.classList.add("dragging");
  lastX = event.clientX;
  lastY = event.clientY;
});

frameResizeHandleNE.addEventListener("mousedown", (event) => {
  resizingNE = true;
  frameResizeHandleNE.classList.add("dragging");
  lastX = event.clientX;
  lastY = event.clientY;
});

frameResizeHandleSE.addEventListener("mousedown", (event) => {
  resizingSE = true;
  frameResizeHandleSE.classList.add("dragging");
  lastX = event.clientX;
  lastY = event.clientY;
});

frameResizeHandleSW.addEventListener("mousedown", (event) => {
  resizingSW = true;
  frameResizeHandleSW.classList.add("dragging");
  lastX = event.clientX;
  lastY = event.clientY;
});

window.addEventListener("mousemove", (event) => {
  if (dragging) {
    frame.style.left = `${parseFloat(frame.style.left) + event.clientX - lastX}px`;
    frame.style.top = `${Math.max(0, parseFloat(frame.style.top) + event.clientY - lastY)}px`;
  } else if (resizingNW) {
    frame.style.left = `${parseFloat(frame.style.left) + event.clientX - lastX}px`;
    frame.style.width = `${parseFloat(frame.style.width) + lastX - event.clientX}px`;
    frame.style.top = `${parseFloat(frame.style.top) + event.clientY - lastY}px`;
    frame.style.height = `${parseFloat(frame.style.height) + lastY - event.clientY}px`;
  } else if (resizingNE) {
    frame.style.width = `${parseFloat(frame.style.width) + event.clientX - lastX}px`;
    frame.style.top = `${parseFloat(frame.style.top) + event.clientY - lastY}px`;
    frame.style.height = `${parseFloat(frame.style.height) + lastY - event.clientY}px`;
  } else if (resizingSE) {
    frame.style.width = `${parseFloat(frame.style.width) + event.clientX - lastX}px`;
    frame.style.height = `${parseFloat(frame.style.height) + event.clientY - lastY}px`;
  } else if (resizingSW) {
    frame.style.left = `${parseFloat(frame.style.left) + event.clientX - lastX}px`;
    frame.style.width = `${parseFloat(frame.style.width) + lastX - event.clientX}px`;
    frame.style.height = `${parseFloat(frame.style.height) + event.clientY - lastY}px`;
  }
  updateFrameResizeHandles();
  lastX = event.clientX;
  lastY = event.clientY;
});

window.addEventListener("mouseup", () => {
  if (dragging) {
    dragging = false;
    frameHeader.classList.remove("dragging");
  } else if (resizingNW) {
    resizingNW = false;
    frameResizeHandleNW.classList.remove("dragging");
  } else if (resizingNE) {
    resizingNE = false;
    frameResizeHandleNE.classList.remove("dragging");
  } else if (resizingSE) {
    resizingSE = false;
    frameResizeHandleSE.classList.remove("dragging");
  } else if (resizingSW) {
    resizingSW = false;
    frameResizeHandleSW.classList.remove("dragging");
  }
});
