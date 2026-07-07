/* ==========================================
   Delivery Tracking System
   route.js
========================================== */


/* ===============================
   ROUTE DATA
=============================== */


let currentRoute = [];

let routeDistance = 0;

let routeDuration = 0;



/* ===============================
   START ROUTE
=============================== */


async function startRoute(){


    if(!customerLocation){


        showToast(
            "Please select customer location first"
        );


        return;

    }



    setRouteButtonLoading(true);


    showLoader();



    try{


        const url =

        `https://router.project-osrm.org/route/v1/driving/${branch.lng},${branch.lat};${customerLocation.lng},${customerLocation.lat}?overview=full&geometries=geojson`;



        const response =

        await fetch(url);



        const data =

        await response.json();



        if(

            !data.routes ||

            data.routes.length===0

        ){


            throw new Error(
                "Route not found"
            );


        }




        const route =
        data.routes[0];



        routeDistance =
        route.distance;



        routeDuration =
        route.duration;



        setDistance(

            formatKM(
                routeDistance/1000
            )

        );



        setETA(

            formatMinutes(
                routeDuration/60
            )

        );



        currentRoute =

        route.geometry.coordinates.map(

            point =>

            [

                point[1],

                point[0]

            ]

        );



        drawRoute(
            currentRoute
        );



        createRider();



        routeStartedUI();



        startRiderAnimation(

            currentRoute

        );



        addTimeline(

            "🛣 Route calculated"

        );



    }

    catch(error){


        console.error(error);


        showToast(
            "Unable to calculate route"
        );


    }


    finally{


        hideLoader();


        setRouteButtonLoading(false);


    }


}





/* ===============================
   START BUTTON
=============================== */


if(startRouteBtn){


    startRouteBtn.addEventListener(

        "click",

        ()=>{


            startRoute();


        }

    );


}



/* ===============================
   ROUTE INFO UPDATE
=============================== */


function updateRouteInfo(distance, time){



    setRemaining(

        formatKM(
            distance/1000
        )

    );



    setETA(

        formatMinutes(
            time/60
        )

    );



}





/* ===============================
   GET ROUTE
=============================== */


function getCurrentRoute(){


    return currentRoute;


}