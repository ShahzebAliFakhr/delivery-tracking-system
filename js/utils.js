/* ==========================================
   Delivery Tracking System
   utils.js
========================================== */

/* ===============================
   DOM Shortcuts
=============================== */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/* ===============================
   Elements
=============================== */

const toast = $("#toast");
const loader = $("#loader");
const clock = $("#clock");
const timeline = $("#timeline");


/* ===============================
   Toast
=============================== */

function showToast(message = "Done") {

    toast.innerHTML = message;

    toast.classList.add("showToast");

    setTimeout(() => {

        toast.classList.remove("showToast");

    }, 3000);

}


/* ===============================
   Loader
=============================== */

function showLoader() {

    loader.classList.add("showLoader");

}

function hideLoader() {

    loader.classList.remove("showLoader");

}


/* ===============================
   Live Clock
=============================== */

function startClock() {

    function update() {

        const now = new Date();

        clock.innerHTML = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    }

    update();

    setInterval(update, 1000);

}


/* ===============================
   Random Order ID
=============================== */

function generateOrderID() {

    return "KM-" + Math.floor(
        1000 + Math.random() * 9000
    );

}


/* ===============================
   Distance Formatter
=============================== */

function formatKM(value) {

    return Number(value).toFixed(2) + " KM";

}


/* ===============================
   Time Formatter
=============================== */

function formatMinutes(value) {

    return Math.ceil(value) + " Min";

}


/* ===============================
   Delay
=============================== */

function sleep(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/* ===============================
   Timeline
=============================== */

function addTimeline(text) {

    const li = document.createElement("li");

    const now = new Date();

    const time = now.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

    li.innerHTML = `<strong>${time}</strong> — ${text}`;

    timeline.prepend(li);

}


/* ===============================
   Progress
=============================== */

function updateProgress(percent) {

    percent = Math.max(0, Math.min(100, percent));

    $("#progressBar").style.width = percent + "%";

    $("#progressText").innerHTML = percent.toFixed(0) + "%";

}


/* ===============================
   Order Status
=============================== */

function setStatus(text) {

    $("#deliveryStatus").innerHTML = text;

}


/* ===============================
   ETA
=============================== */

function setETA(text) {

    $("#eta").innerHTML = text;

}


/* ===============================
   Distance
=============================== */

function setDistance(text) {

    $("#distance").innerHTML = text;

}


/* ===============================
   Remaining
=============================== */

function setRemaining(text) {

    $("#remaining").innerHTML = text;

}


/* ===============================
   Random Speed
=============================== */

function randomSpeed() {

    return Math.floor(

        Math.random() * 16

    ) + 35;

}


/* ===============================
   Clamp
=============================== */

function clamp(value, min, max) {

    return Math.min(

        Math.max(value, min),

        max

    );

}


/* ===============================
   Number Formatter
=============================== */

function formatNumber(number) {

    return new Intl.NumberFormat().format(number);

}


/* ===============================
   Degrees
=============================== */

function toRadians(deg) {

    return deg * Math.PI / 180;

}


/* ===============================
   Haversine Distance
=============================== */

function calculateDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat = toRadians(lat2 - lat1);

    const dLon = toRadians(lon2 - lon1);

    const a =

        Math.sin(dLat / 2) *

        Math.sin(dLat / 2)

        +

        Math.cos(

            toRadians(lat1)

        )

        *

        Math.cos(

            toRadians(lat2)

        )

        *

        Math.sin(dLon / 2)

        *

        Math.sin(dLon / 2);

    const c =

        2 *

        Math.atan2(

            Math.sqrt(a),

            Math.sqrt(1 - a)

        );

    return R * c;

}


/* ===============================
   Initial Setup
=============================== */

document.addEventListener("DOMContentLoaded", () => {

    $("#orderId").innerHTML = generateOrderID();

    startClock();

    updateProgress(0);

    setStatus("Waiting");

    setETA("--");

    setDistance("--");

    setRemaining("--");

});