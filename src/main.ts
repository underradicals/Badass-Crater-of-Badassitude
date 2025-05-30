import './style.css';

type Switch = {
  a_switch: number;
  b_switch: number;
  c_switch: number;
}

const state = {
  a_switch: 0,
  b_switch: 0,
  c_switch: 0
} satisfies Switch;

export let current = 90;

const AndSwitchEvent = new CustomEvent('switch');
const ArrowMoveEvent = new CustomEvent('movearrow');

const ASwitch = document.querySelector('.a-switch') as HTMLParagraphElement;
const BSwitch = document.querySelector('.b-switch') as HTMLParagraphElement;
const AGauge = document.querySelector('.a-gauge') as HTMLElement;
const BGauge = document.querySelector('.b-gauge') as HTMLElement;
const CGauge = document.querySelector('.c-gauge') as HTMLElement;
const Bulb = document.querySelector('.bulb-container svg') as HTMLElement;
const AMathElement = document.querySelector('.math-bar p:nth-child(1)') as HTMLElement;
const BMathElement = document.querySelector('.math-bar p:nth-child(2)') as HTMLElement;
const CMathElement = document.querySelector('.math-bar p:nth-child(4)') as HTMLElement;
const IconMarker = document.querySelector('.icon-container') as HTMLElement;
export const InformationIcon = document.querySelector('.info-icon-container') as HTMLElement;
export const CloseModalButton = document.querySelector('.close-button') as HTMLElement;

export function moveIcon(value: number) {
  let c = 90 + (value * 52);
  IconMarker.style.transform = `translateY(${c}px) translateX(-15px)`;
}

export function HandleOpenModalEvent() {
  const modal = document.querySelector('dialog') as HTMLDialogElement;
  modal.showModal();
}

export function HandleCloseModalEvent() {
  const modal = document.querySelector('dialog') as HTMLDialogElement;
  modal.close();
}

InformationIcon.addEventListener('click', HandleOpenModalEvent);
CloseModalButton.addEventListener('click', HandleCloseModalEvent);


export function HandleASwitchClickEvent() {
  if (state.a_switch === 1) {
    state.a_switch = 0;
    AGauge.dispatchEvent(AndSwitchEvent);
    CGauge.dispatchEvent(AndSwitchEvent);
    IconMarker.dispatchEvent(ArrowMoveEvent);
    return;
  }

  state.a_switch = 1;
  AGauge.dispatchEvent(AndSwitchEvent);
  CGauge.dispatchEvent(AndSwitchEvent);
  IconMarker.dispatchEvent(ArrowMoveEvent);
}

export function HandleBSwitchClickEvent() {
  if (state.b_switch === 1) {
    state.b_switch = 0;
    BGauge.dispatchEvent(AndSwitchEvent);
    CGauge.dispatchEvent(AndSwitchEvent);
    IconMarker.dispatchEvent(ArrowMoveEvent);
    return;
  }

  state.b_switch = 1;
  BGauge.dispatchEvent(AndSwitchEvent);
  CGauge.dispatchEvent(AndSwitchEvent);
  IconMarker.dispatchEvent(ArrowMoveEvent);
}

export function HandleCGaugeSwitchEvent() {
  state.c_switch = state.a_switch & state.b_switch;
  (CMathElement.querySelector('span') as HTMLElement).textContent = `${state.c_switch}`;

  if (state.c_switch === 0 && CGauge.classList.contains('grow-delay')) {
    CGauge.classList.remove('grow-delay');
    CGauge.classList.add('shrink');
    Bulb.classList.remove('glow');
    Bulb.classList.add('fadeout');
    return;
  }

  if (state.a_switch === 1 && state.b_switch === 1) {
    CGauge.classList.remove('shrink');
    CGauge.classList.add('grow-delay');
    Bulb.classList.remove('fadeout');
    Bulb.classList.add('glow');
  }
}


export function HandleAGaugeSwitchEvent() {
  (AMathElement.querySelector('span') as HTMLElement).textContent = `${state.a_switch}`;
  if (state.a_switch === 0) {
    AGauge.classList.remove('grow');
    AGauge.classList.add('shrink');
  } else {
    AGauge.classList.remove('shrink');
    AGauge.classList.add('grow');
  }
}

export function HandleBGaugeSwitchEvent() {
  (BMathElement.querySelector('span') as HTMLElement).textContent = `${state.b_switch}`;
  if (state.b_switch === 0) {
    BGauge.classList.remove('grow');
    BGauge.classList.add('shrink');
  } else {
    BGauge.classList.remove('shrink');
    BGauge.classList.add('grow');
  }
}


export function HandleIconMarkerMoveEvent() {
  if (state.a_switch === 0 && state.b_switch === 0) {
    moveIcon(0);
    return;
  }

  if (state.a_switch === 1 && state.b_switch === 0) {
    moveIcon(2);
    return;
  }

  if (state.a_switch === 0 && state.b_switch === 1) {
    moveIcon(1);
    return;
  }

  moveIcon(3);
}

ASwitch.addEventListener('click', HandleASwitchClickEvent);
BSwitch.addEventListener('click', HandleBSwitchClickEvent);
CGauge.addEventListener('switch', HandleCGaugeSwitchEvent);
AGauge.addEventListener('switch', HandleAGaugeSwitchEvent);
BGauge.addEventListener('switch', HandleBGaugeSwitchEvent);
IconMarker.addEventListener('movearrow', HandleIconMarkerMoveEvent);