/* ==========================================
   Delivery Tracking System
   map.js
========================================== */


/* ===============================
   MAP INITIALIZE
=============================== */

let map = L.map("map",{

    zoomControl:true

}).setView(
    [24.9200,67.0700],
    12
);



/* ===============================
   MAP LAYERS
=============================== */


const streetLayer = L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {
        maxZoom:19,

        attribution:
        "© OpenStreetMap"
    }

);


streetLayer.addTo(map);



const satelliteLayer = L.tileLayer(

"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

{

    attribution:
    "Tiles © Esri"

}

);



const terrainLayer = L.tileLayer(

"https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",

{

    attribution:
    "© OpenTopoMap"

}

);



L.control.layers(

    {

        "Street":streetLayer,

        "Satellite":satelliteLayer,

        "Terrain":terrainLayer

    }

).addTo(map);




/* ===============================
   BRANCH LOCATION
=============================== */


const branch = {


    name:"K-Mart Main Branch",


    lat:24.945778,


    lng:67.100401


};



let customerLocation=null;



let branchMarker;

let customerMarker;

let riderMarker;

let routeLine;



/* ===============================
   ICONS
=============================== */


function createIcon(
    image
){


return L.divIcon({

    className:"custom-marker",


    html:`

    <div class="pulse-marker">

        <img src="${image}">

    </div>

    `,


    iconSize:[
        45,
        45
    ],


    iconAnchor:[
        22,
        45
    ]

});


}




const branchIcon = createIcon(

"https://kmart.com.pk/logo.png"

);



const customerIcon = createIcon(

"https://cdn-icons-png.flaticon.com/512/854/854901.png"

);



const riderIcon = createIcon(

"https://cdn-icons-png.flaticon.com/512/2203/2203124.png"

);



/* ===============================
   SHOW BRANCH
=============================== */


branchMarker =
L.marker(

    [
        branch.lat,
        branch.lng
    ],

    {
        icon:branchIcon
    }

)

.addTo(map)

.bindPopup(

    `
    <b>K-Mart</b>
    <br>
    Main Branch
    `

);



/* ===============================
   SET CUSTOMER
=============================== */


function setCustomerLocation(
    lat,
    lng,
    name=""
){


    customerLocation={

        lat,
        lng,
        name

    };



    if(customerMarker){

        map.removeLayer(
            customerMarker
        );

    }



    customerMarker =
    L.marker(

        [
            lat,
            lng
        ],

        {
            icon:customerIcon
        }

    )

    .addTo(map)

    .bindPopup(

        `
        <b>Customer</b>
        <br>
        ${name}
        `

    );



    map.setView(

        [
            lat,
            lng
        ],

        14

    );


}



/* ===============================
   CREATE RIDER
=============================== */


function createRider(){


    if(riderMarker){

        map.removeLayer(
            riderMarker
        );

    }



    riderMarker =
    L.marker(

        [
            branch.lat,
            branch.lng
        ],

        {

            icon:riderIcon

        }

    )

    .addTo(map)

    .bindPopup(

        "🏍 Rider"

    );


}



/* ===============================
   UPDATE RIDER POSITION
=============================== */


function updateRiderPosition(
    position
){


    if(!riderMarker){

        createRider();

    }



    riderMarker.setLatLng(

        position

    );



    if(followRider){

        map.panTo(

            position,

            {

                animate:true

            }

        );

    }

}



/* ===============================
   CENTER RIDER
=============================== */


function centerRider(){


    if(riderMarker){


        map.flyTo(

            riderMarker.getLatLng(),

            16,

            {

                animate:true,

                duration:1

            }

        );


    }

    else{


        showToast(
            "Rider not started"
        );


    }


}



/* ===============================
   DRAW ROUTE
=============================== */


function drawRoute(

    points

){


    if(routeLine){

        map.removeLayer(
            routeLine
        );

    }



    routeLine =
    L.polyline(

        points,

        {

            color:"#2563eb",

            weight:6,

            opacity:.85

        }

    )

    .addTo(map);



    map.fitBounds(

        routeLine.getBounds()

    );


}



/* ===============================
   REMOVE ROUTE
=============================== */


function clearRoute(){


    if(routeLine){

        map.removeLayer(
            routeLine
        );

        routeLine=null;

    }

}