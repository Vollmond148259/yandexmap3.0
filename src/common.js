const LOCATION = { center: [43.423636695937006, 39.93919932549921], zoom: 9 };

const LEFT_MARKER = [...LOCATION.center];
LEFT_MARKER[0] -= 0.3;
LEFT_MARKER[1] -= 0.3;
const RIGHT_MARKER = [...LOCATION.center];
RIGHT_MARKER[0] += 0.3;
RIGHT_MARKER[1] -= 0.3;
const TOP_MARKER = [...LOCATION.center];

const TOP_DEFAULT_MARKER = [...LOCATION.center];
TOP_DEFAULT_MARKER[1] += 0.3;

const RIGHT_DEFAULT_MARKER = [...LOCATION.center];
RIGHT_DEFAULT_MARKER[0] += 0.1;
RIGHT_DEFAULT_MARKER[1] += 0.2;

const LEFT_DEFAULT_MARKER = [...LOCATION.center];
LEFT_DEFAULT_MARKER[0] += -0.1;
LEFT_DEFAULT_MARKER[1] += 0.2;

const TOP_DEFAULT_MARKER_POPUP = {
  content: "Good text here",
  position: "top",
  hidesMarker: true,
};
const NEW_LOCATION = { center: [42.623082, 57.75254], zoom: 7 };

function rangeRandom(min, max) {
  return (max - min) * Math.random() + min;
}

let lock = false;

export {
  NEW_LOCATION,
  lock,
  rangeRandom,
  TOP_DEFAULT_MARKER_POPUP,
  LEFT_DEFAULT_MARKER,
  RIGHT_DEFAULT_MARKER,
  TOP_DEFAULT_MARKER,
  TOP_MARKER,
  RIGHT_MARKER,
  LEFT_MARKER,
  LOCATION,
};
