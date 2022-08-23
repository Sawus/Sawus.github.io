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
var leftArrow;
var rightArrow;

var gameCatalog = {
    tearDevil: {
        imgSrc: ["images/TearDevil_0.png", "images/TearDevil_1.png", "images/TearDevil_2.png"],
        imgIndex: 0
    },
    jumpGame: {
        imgSrc: ["images/TearDevil_0.png", "images/TearDevil_1.png", "images/TearDevil_2.png"],
        imgIndex: 0
    },
    isoStrategy: {
        imgSrc: ["images/TearDevil_0.png", "images/TearDevil_1.png", "images/TearDevil_2.png"],
        imgIndex: 0
    },
    mathGame: {
        imgSrc: ["images/TearDevil_0.png", "images/TearDevil_1.png", "images/TearDevil_2.png"],
        imgIndex: 0
    }
}

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
    var openPosition = -sidebar.shadow;
    var closePosition = -sidebar.width;
    if (hamburger.className == "hamburger hamburger--elastic is-active") {
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
    // Replace Date in Content
    $.get(event.currentTarget.content, function(data){
        $("#content").replaceWith(data);
    });
    // Automatically Close Menu
    if(event.currentTarget.id.includes("sidebar"))
        updateHamburger();
    // Extra Functionality for Games 
    if(event.currentTarget.id == sidebarGames.id) {
        setTimeout(function () {
            onLoadGames();
        }, 500) 
    }  
}

function onLoadGames() {
    var gridContainer = document.querySelector(".gamesGridContainer");
    var gameContainer = gridContainer.querySelectorAll(".gameMenu");
    // Iterate Through Menus
    gameContainer.forEach(element => {
        // Title
        var title = element.querySelector(".gameTitle");
        title.addEventListener("click", switchContent);
        title.content = "html/games/" + element.id + ".html";
        
        // Pictures
        var pictureContainer = element.querySelector(".pictureGridContainer")
        var leftArrow = pictureContainer.querySelector(".leftArrow");
        leftArrow.addEventListener("click", switchImage);
        leftArrow.modifier = -1;
        leftArrow.owner = element;
        var rightArrow = pictureContainer.querySelector(".rightArrow");
        rightArrow.addEventListener("click", switchImage);
        rightArrow.modifier = 1;
        rightArrow.owner = element;
    });

    // Reset Values
    for (var game in gameCatalog) {
        gameCatalog[game].imgIndex = 0;
    }
}

function switchImage(event) {
    // Gets Game That Event Was Called For
    var game = gameCatalog[event.currentTarget.owner.id];
    // Change Index
    game.imgIndex += event.currentTarget.modifier;
    // If Higher Or Lower Then Amount of Pictures, Reset
    if(game.imgIndex < 0)
        game.imgIndex = game.imgSrc.length - 1;
    else if(game.imgIndex >= game.imgSrc.length)
        game.imgIndex = 0;
    // Update Current Picture
    event.currentTarget.owner.querySelector(".gamePictures").src = game.imgSrc[game.imgIndex];
    console.log(event.currentTarget.owner.id + ": " + game.imgIndex);
}

function onLoad() {
    hamburger = document.getElementById("hamburger");
    hamburger.addEventListener("click", updateHamburger);
    // Home
    homeButton = document.getElementById("homeButton");
    homeButton.addEventListener("click", switchContent);
    homeButton.content = "html/home.html";

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

    //Jquery Replace Content With Home Page
    $.get("html/home.html", function(data){    
        $("#content").replaceWith(data);
    });

    sidebar.style.height = window.innerHeight - 60 + 'px';
    sidebar.style.width = sidebar.width + 'px';
    sidebar.style.left = '-' + (sidebar.width + sidebar.shadow) + 'px';
    content.style.height = window.innerHeight - 60 + 'px';
    content.style.left = 0 + 'px';
    content.style.marginLeft = 0 + 'px';
}