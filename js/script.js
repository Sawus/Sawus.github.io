// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Init Variables
var hamburger;
var homeButton;
var sidebar;
var sidebarGames;
var sidebarApps;
var sidebarModels;
var sidebarAbout;
var content;

var x = window.matchMedia("(min-width: 1025px)");
    
var running = true;

// JQuery Load Shared HTML
$.get("html/shared.html", function(data){
    $("#shared").replaceWith(data);
    onLoad();
});


window.onresize = function (event) {
    sidebar.style.height = window.innerHeight - 60 + 'px';
    content.style.height = window.innerHeight - 60 + 'px';
};

function updateHamburger() {
    console.log("Clicked");
    if (running) {
        running = false;

        if (hamburger.className != "hamburger hamburger--elastic is-active")
            hamburger.className = "hamburger hamburger--elastic is-active";
        else
            hamburger.className = "hamburger hamburger--elastic";
        sidebarSlide();
        setTimeout(function () {
            running = true;
        }, 500)
    }
}

function sidebarSlide() {
    //var slideSpeed = 12;
    var openPosition = -sidebar.shadow;
    var closePosition = -sidebar.width;
    if (hamburger.className == "hamburger hamburger--elastic is-active") {
        /*if (parseInt(sidebar.style.left) < openPosition) {
            sidebar.style.left = parseInt(sidebar.style.left) + slideSpeed + "px";
            if (x.matches) {
                content.style.left = parseInt(content.style.left) + slideSpeed + "px";
            }
            setTimeout(sidebarSlide, 1);
        }*/
        if (x.matches) {
            content.style.marginLeft = "184px";
            sidebar.style.width = "180px";
        } else {
            sidebar.style.transition = "0.5s";
            sidebar.style.width = "100%";
        }
        sidebar.style.marginLeft = "184px";
    }
    else {
        /*if (parseInt(sidebar.style.left) > closePosition) {
            sidebar.style.left = parseInt(sidebar.style.left) - slideSpeed + "px";
            if (x.matches) {
                content.style.left = parseInt(content.style.left) - slideSpeed + "px";
            }
            setTimeout(sidebarSlide, 1);
        }*/
        
        if (x.matches) {
            sidebar.style.marginLeft = "0px";
            content.style.marginLeft = "0px";
            sidebar.style.width = "180px";
        } else {
            sidebar.style.transition = "0.5s";
            content.style.marginLeft = "0px";
            sidebar.style.marginLeft = "-100%";
        }
    }
}

function switchContent(event) {
    console.log("Yup." + event.currentTarget.content);
    $.get(event.currentTarget.content, function(data){
        $("#content").replaceWith(data);
    });

    if(event.currentTarget != homeButton)
        updateHamburger();
}

function onLoad() {
    hamburger = document.getElementById("hamburger");
    hamburger.addEventListener("click", updateHamburger);
    // Home
    homeButton = document.getElementById("homeButton");
    homeButton.addEventListener("click", switchContent);
    homeButton.content = "html/home.html";
    //Jquery Replace Content With Home Page
    $.get("html/home.html", function(data){
        $("#content").replaceWith(data);
    });
    // Games
    sidebarGames = document.getElementById("sidebarGames");
    sidebarGames.addEventListener("click", switchContent);
    sidebarGames.content = "html/games.html";
    // Apps
    sidebarApps = document.getElementById("sidebarApps");
    sidebarApps.addEventListener("click", switchContent);
    sidebarApps.content = "html/apps.html";
    // 3D Models
    sidebarModels = document.getElementById("sidebarModels");
    sidebarModels.addEventListener("click", switchContent);
    sidebarModels.content = "html/models.html";
    // About Me
    sidebarAbout = document.getElementById("sidebarAbout");
    sidebarAbout.addEventListener("click", switchContent);
    sidebarAbout.content = "html/aboutMe.html";
    
    sidebar = document.getElementById("sidebar");
    sidebar.width = 180;
    sidebar.shadow = 4;
    
    content = document.getElementById("content");


    sidebar.style.height = window.innerHeight - 60 + 'px';
    sidebar.style.width = sidebar.width + 'px';
    sidebar.style.left = '-' + (sidebar.width + sidebar.shadow) + 'px';
    content.style.height = window.innerHeight - 60 + 'px';
    content.style.left = 0 + 'px';
    content.style.marginLeft = 0 + 'px';
}