/* ==========================================
   Delivery Tracking System
   search.js
========================================== */


/* ===============================
   ELEMENTS
=============================== */

const searchInput =
document.getElementById("searchInput");


const searchBtn =
document.getElementById("searchBtn");


const suggestionBox =
document.getElementById("suggestions");



/* ===============================
   SEARCH RESULTS
=============================== */

let searchResults = [];



/* ===============================
   SEARCH ADDRESS
=============================== */


async function searchLocation(){


    let query =
    searchInput.value.trim();



    if(query.length < 3){


        showToast(
            "Please enter area name"
        );


        return;

    }



    showLoader();



    try{


        const url =

        `https://nominatim.openstreetmap.org/search?format=json&limit=8&q=${encodeURIComponent(query)}, Karachi, Pakistan`;



        const response =
        await fetch(url);



        const data =
        await response.json();



        searchResults=data;



        displaySuggestions(data);



    }

    catch(error){


        console.error(error);


        showToast(
            "Location search failed"
        );


    }


    finally{


        hideLoader();


    }


}




/* ===============================
   SHOW SUGGESTIONS
=============================== */


function displaySuggestions(results){


    suggestionBox.innerHTML="";



    if(results.length===0){


        suggestionBox.style.display="block";


        suggestionBox.innerHTML=

        `

        <div>
        No location found
        </div>

        `;


        return;

    }



    suggestionBox.style.display="block";



    results.forEach(
        (place,index)=>{


        let item =
        document.createElement("div");



        item.innerHTML=

        `

        📍 ${place.display_name}

        `;



        item.onclick=()=>{


            selectLocation(
                place
            );


        };



        suggestionBox.appendChild(
            item
        );



    });



}




/* ===============================
   SELECT LOCATION
=============================== */


function selectLocation(place){



    const lat =
    parseFloat(place.lat);



    const lng =
    parseFloat(place.lon);



    searchInput.value =
    place.display_name;



    suggestionBox.style.display =
    "none";



    setCustomerLocation(

        lat,

        lng,

        place.display_name

    );



    showToast(

        "📍 Customer location selected"

    );



}



/* ===============================
   SEARCH BUTTON
=============================== */


if(searchBtn){


searchBtn.addEventListener(

"click",

()=>{


    searchLocation();


}

);


}



/* ===============================
   ENTER KEY
=============================== */


searchInput.addEventListener(

"keypress",

(e)=>{


    if(e.key==="Enter"){


        searchLocation();


    }


}

);



/* ===============================
   CLOSE SUGGESTIONS
=============================== */


document.addEventListener(

"click",

(e)=>{


    if(

        !searchInput.contains(e.target)
        &&
        !suggestionBox.contains(e.target)

    ){


        suggestionBox.style.display =
        "none";


    }


});