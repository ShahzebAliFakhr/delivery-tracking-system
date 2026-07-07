/* ==========================================
   Delivery Tracking System
   animation.js
========================================== */


/* ===============================
   ANIMATION VARIABLES
=============================== */


let animationTimer = null;

let animationIndex = 0;

let animationPath = [];

let travelledDistance = 0;



/* ===============================
   START RIDER ANIMATION
=============================== */


function startRiderAnimation(path){


    if(!path || path.length===0){

        showToast(
            "No route available"
        );

        return;

    }



    animationPath = path;


    animationIndex = 0;


    travelledDistance = 0;



    if(animationTimer){

        clearInterval(animationTimer);

    }



    addTimeline(

        "🏍 Rider started delivery"

    );



    setStatus(

        "🏍 Rider On Route"

    );



    animationTimer = setInterval(()=>{


        moveRider();


    },80);


}




/* ===============================
   MOVE RIDER
=============================== */


function moveRider(){


    if(

        animationIndex >= animationPath.length

    ){


        finishDelivery();


        return;


    }



    const position =

    animationPath[animationIndex];



    updateRiderPosition(

        position

    );



    updateProgress(

        (

        animationIndex /

        animationPath.length

        ) * 100

    );



    updateLiveData();



    animationIndex++;


}




/* ===============================
   LIVE DATA
=============================== */


function updateLiveData(){


    const progress =

    animationIndex /

    animationPath.length;



    const remaining =

    routeDistance *

    (1-progress);



    const remainingTime =

    routeDuration *

    (1-progress);



    updateRouteInfo(

        remaining,

        remainingTime

    );



}




/* ===============================
   FINISH DELIVERY
=============================== */


function finishDelivery(){


    clearInterval(

        animationTimer

    );



    animationTimer=null;



    updateProgress(
        100
    );



    setRemaining(

        "0 KM"

    );



    setETA(

        "Delivered"

    );



    setStatus(

        "🎉 Delivered"

    );



    addTimeline(

        "🎉 Order delivered successfully"

    );



    showToast(

        "🎉 Delivery Completed"

    );


}




/* ===============================
   STOP ANIMATION
=============================== */


function stopAnimation(){


    if(animationTimer){


        clearInterval(
            animationTimer
        );


    }


}



/* ===============================
   RESET ANIMATION
=============================== */


function resetAnimation(){


    stopAnimation();


    animationIndex=0;


    travelledDistance=0;


}