/* ==========================================
   Delivery Tracking System
   theme.js
========================================== */


/* ===============================
   Elements
=============================== */

const themeBtn = document.getElementById("themeBtn");


/* ===============================
   Load Theme
=============================== */

function loadTheme(){

    const savedTheme = localStorage.getItem("deliveryTheme");


    if(savedTheme === "dark"){

        document.body.classList.add("dark");

        updateThemeButton(true);

    }
    else{

        document.body.classList.remove("dark");

        updateThemeButton(false);

    }

}


/* ===============================
   Toggle Theme
=============================== */

function toggleTheme(){

    const isDark =
        document.body.classList.toggle("dark");


    localStorage.setItem(
        "deliveryTheme",
        isDark ? "dark" : "light"
    );


    updateThemeButton(isDark);


    showToast(
        isDark 
        ? "🌙 Dark mode enabled"
        : "☀️ Light mode enabled"
    );

}


/* ===============================
   Button Update
=============================== */

function updateThemeButton(dark){

    if(!themeBtn)
        return;


    if(dark){

        themeBtn.innerHTML = `
        <i class="fa-solid fa-sun"></i>
        Light Mode
        `;

    }
    else{

        themeBtn.innerHTML = `
        <i class="fa-solid fa-moon"></i>
        Dark Mode
        `;

    }

}


/* ===============================
   Button Event
=============================== */

if(themeBtn){

    themeBtn.addEventListener(
        "click",
        toggleTheme
    );

}


/* ===============================
   Initialize
=============================== */

loadTheme();