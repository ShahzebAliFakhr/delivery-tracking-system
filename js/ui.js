/* ==========================================
   Delivery Tracking System
   ui.js
========================================== */


/* ===============================
   Elements
=============================== */

const startRouteBtn = document.getElementById("startRoute");

const followBtn = document.getElementById("followBtn");

const centerBtn = document.getElementById("centerBtn");


/* ===============================
   UI State
=============================== */

let followRider = false;

let routeStarted = false;


/* ===============================
   Route Button
=============================== */

function setRouteButtonLoading(status){

    if(!startRouteBtn)
        return;


    if(status){

        startRouteBtn.disabled = true;

        startRouteBtn.innerHTML = `
        
        <i class="fa-solid fa-spinner fa-spin"></i>
        
        Calculating Route...

        `;

    }

    else{

        startRouteBtn.disabled = false;

        startRouteBtn.innerHTML = `
        
        <i class="fa-solid fa-route"></i>
        
        Start Route
        
        `;

    }

}


/* ===============================
   Follow Rider
=============================== */

if(followBtn){

    followBtn.addEventListener(
        "click",
        ()=>{


            followRider = !followRider;


            if(followRider){

                followBtn.innerHTML = `
                
                <i class="fa-solid fa-location-crosshairs"></i>
                
                Following Rider
                
                `;

                followBtn.classList.add(
                    "pulse"
                );


                showToast(
                    "📍 Rider tracking enabled"
                );


            }
            else{


                followBtn.innerHTML = `
                
                <i class="fa-solid fa-location-crosshairs"></i>
                
                Follow Rider
                
                `;


                followBtn.classList.remove(
                    "pulse"
                );


                showToast(
                    "Tracking disabled"
                );


            }


        }
    );

}


/* ===============================
   Center Map Button
=============================== */

if(centerBtn){

    centerBtn.addEventListener(
        "click",
        ()=>{


            if(typeof centerRider === "function"){

                centerRider();

            }
            else{

                showToast(
                    "Rider location unavailable"
                );

            }


        }
    );

}


/* ===============================
   Delivery Status
=============================== */

const deliverySteps = [

    "📦 Order Received",

    "🏪 Preparing Order",

    "🏍 Rider Picked Order",

    "🛣 Rider On Route",

    "📍 Near Customer",

    "🎉 Delivered"

];


let currentStep = 0;



function nextDeliveryStep(){


    if(currentStep >= deliverySteps.length)
        return;


    addTimeline(
        deliverySteps[currentStep]
    );


    setStatus(
        deliverySteps[currentStep]
    );


    currentStep++;


}



/* ===============================
   Start Delivery Timeline
=============================== */

function startDeliveryProcess(){


    currentStep = 0;


    timeline.innerHTML="";


    let interval = setInterval(()=>{


        nextDeliveryStep();


        if(currentStep >= deliverySteps.length){

            clearInterval(interval);


            deliveryComplete();

        }


    },5000);


}


/* ===============================
   Delivery Complete
=============================== */

function deliveryComplete(){


    updateProgress(100);


    setStatus(
        "🎉 Delivered"
    );


    setETA(
        "Completed"
    );


    showToast(
        "🎉 Delivery Completed Successfully"
    );


}



/* ===============================
   Progress Simulation
=============================== */

function simulateProgress(){


    let value = 0;


    let timer = setInterval(()=>{


        value += Math.floor(
            Math.random()*5
        )+1;


        if(value >= 100){

            value = 100;

            clearInterval(timer);

        }


        updateProgress(value);


    },1200);


}


/* ===============================
   Route Started UI
=============================== */

function routeStartedUI(){


    routeStarted=true;


    setRouteButtonLoading(false);


    showToast(
        "🚚 Delivery started"
    );


    startDeliveryProcess();


}


/* ===============================
   Reset UI
=============================== */

function resetUI(){


    routeStarted=false;


    timeline.innerHTML =
    "<li>Waiting for route...</li>";


    updateProgress(0);


    setStatus(
        "Waiting"
    );


    setETA("--");


    setDistance("--");


    setRemaining("--");


}