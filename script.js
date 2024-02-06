const overlay = document.querySelector(".overlay");
const on = document.querySelector(".on");
const off = document.querySelector(".off");
const icon = document.querySelector(".icon");
const timeline = gsap.timeline();
let pulseTimeout;

lucide.createIcons();

overlay.addEventListener("mousemove", pointerMove);
//overlay.addEventListener("mouseout", TODO);

const duration = 0.75;

function initialAnimation() {
  timeline.to(".overlay", {
    "--mouse-x": "33%",
    "--mouse-y": "33%",
    duration,
    ease: "slow(0.2, 0.2, false)",
  });
  timeline.to(".overlay", {
    "--mouse-x": "75%",
    "--mouse-y": "50%",
    duration,
    ease: "slow(0.2, 0.2, false)",
  });
  timeline.to(".overlay", {
    "--mouse-x": "33%",
    "--mouse-y": "75%",
    duration,
    ease: "slow(0.2, 0.2, false)",
  });
}
initialAnimation();

function pulse() {
  timeline.to(".overlay", {
    "--spotlight-width": "6em",
    "--spotlight-height": "6em",
    duration: 0.25,
  });
  timeline.to(".overlay", {
    "--spotlight-width": "5em",
    "--spotlight-height": "5em",
    duration: 0.25,
    ease: "slow(0.2, 0.3, false)",
  });
  timeline.to(".overlay", {
    "--spotlight-width": "6em",
    "--spotlight-height": "6em",
    duration: 0.25,
    ease: "slow(0.2, 0.3, false)",
  });
  timeline.to(".overlay", {
    "--spotlight-width": "5em",
    "--spotlight-height": "5em",
    duration: 0.25,
    ease: "slow(0.2, 0.3, false)",
  });
}
pulse();

/*
const edges = gsap.timeline();

		// Check if mouse is at edge of screen
		if (x <= 3 || y <= -3 || x >= div.clientWidth - 3 || y >= div.clientHeight - 3) {

			edges.to(".overlay", {"--spotlight-width": 0, "--spotlight-height": 0, duration: 0.25, ease: "low(0.5, 0.5, false)" });
		} else {
		    edges.to(".overlay", {"--spotlight-width": options.spotlightSize,"--spotlight-height": options.spotlightSize,duration: 0.25 });
		}
	}

*/

let userInteraction;
function pointerMove(e) {
  e.preventDefault();
  clearInterval(userInteraction);

  const x = e.offsetX;
  const y = e.offsetY;
  overlay.style.setProperty("--mouse-x", `${x}px`); //setting the x property to the mouse position
  overlay.style.setProperty("--mouse-y", `${y - 100}px`);

  userInteraction = setInterval(() => {
    clearInterval(userInteraction);
    pulse();
  }, 3000); // start a timer for 3 seconds
}

let isMoved = false;
on.addEventListener("click", () => {
  if (isMoved === true) {
    overlay.style.display = "inherit"; // Show overlay
    on.style.marginLeft = 0; // Move left
    on.innerHTML = `<i class="icon" data-lucide="flashlight"></i>`;
  } else {
    overlay.style.display = "none"; // Hide overlay
    on.style.marginLeft = "calc(100% - 2.8em)"; // Move right
    on.innerHTML = `<i class="icon" data-lucide="flashlight-off"></i>`;
  }
  isMoved = !isMoved;
  lucide.createIcons();
});
