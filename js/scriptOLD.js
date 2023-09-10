// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Init Variables
var hamburger;
var homeButton;
var sidebar;
var sidebarContainer = [];
var gamesContainer = [];
var sidebarGames;
var sidebarApps;
var sidebarModels;
var sidebarAbout;
var content;
var currentHash;
var leftArrow;
var rightArrow;

var gameCatalog = {
    tearDevil: {
        imgSrc: ["images/TearDevil_0.png", "images/TearDevil_1.png", "images/TearDevil_2.png"],
        imgIndex: 0,
        content: "html/games/tearDevil.html",
        //hash: element.id
    },
    jumpGame: {
        imgSrc: ["images/TearDevil_0.png", "images/TearDevil_1.png", "images/TearDevil_2.png"],
        imgIndex: 0,
        content: "html/games/jumpGame.html",
    },
    isoStrategy: {
        imgSrc: ["images/TearDevil_0.png", "images/TearDevil_1.png", "images/TearDevil_2.png"],
        imgIndex: 0,
        content: "html/games/isoStrategy.html",
    },
    mathGame: {
        imgSrc: ["images/TearDevil_0.png", "images/TearDevil_1.png", "images/TearDevil_2.png"],
        imgIndex: 0,
        content: "html/games/mathGame.html",
    }
}

var x = window.matchMedia("(min-width: 1025px)");
    
var running = true;

// JQuery Load Shared HTML
$.get("html/shared.html", function(data){
    $("#shared").replaceWith(data);
    onLoad();
    //onLoadGames();
    GetHash();
});

window.addEventListener('hashchange',() =>{
    //console.log('The URL has has changed');
    GetHash();
});

window.onresize = function (event) {
    sidebar.style.height = window.innerHeight - 60 + 'px';
    content.style.height = window.innerHeight - 60 + 'px';
};

function updateHamburger() {
    //console.log("Clicked");
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

function onNavigationClick(event) {
    
    switchContent(event.currentTarget.content)
    // Extra Functionality for Games 
    if(event.currentTarget.id == sidebarContainer.find(object => object.hash === "Games").id) {
        setTimeout(function () {
            onLoadGames();
        }, 500) 
    }  

    location.hash = event.currentTarget.hash;
}
function switchContent(content)
{
    // Replace Date in Content
    $.get(content, function(data){
        $("#content").replaceWith(data);
    });
    // Automatically Close Menu
    // if(event.currentTarget.id.includes("sidebar"))
    // {
        
    // }
    if (hamburger.className == "hamburger hamburger--elastic is-active")
        updateHamburger();
}

function onLoadGames() {
    var gridContainer = document.querySelector(".gamesGridContainer");
    var gameContainer = gridContainer.querySelectorAll(".gameMenu");
    // Iterate Through Menus
    gameContainer.forEach(element => {
        // Title
        var title = element.querySelector(".gameTitle");
        title.addEventListener("click", onNavigationClick);
        title.content = "html/games/" + element.id + ".html";
        title.hash = element.id;
        gamesContainer.push(title);
        
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
    var home = document.getElementById("homeButton");
    home.addEventListener("click", onNavigationClick);
    home.content = "html/home.html";
    home.hash = "Home";
    sidebarContainer.push(home);


    // Games
    var games = document.getElementById("sidebarGames");
    games.addEventListener("click", onNavigationClick);
    games.content = "html/games.html";
    games.hash = "Games";
    sidebarContainer.push(games);
    // Apps
    var apps = document.getElementById("sidebarApps");
    apps.addEventListener("click", onNavigationClick);
    apps.content = "html/apps.html";
    apps.hash = "Apps";
    sidebarContainer.push(apps);
    // 3D Models
    var models = document.getElementById("sidebarModels");
    models.addEventListener("click", onNavigationClick);
    models.content = "html/models.html";
    models.hash = "Models";
    sidebarContainer.push(models);
    // About Me
    var about = document.getElementById("sidebarAbout");
    about.addEventListener("click", onNavigationClick);
    about.content = "html/aboutMe.html";
    about.hash = "About";
    sidebarContainer.push(about);
    
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

function GetHash()
{
    // console.log(location.hash);
    // sidebarContainer.forEach(element => {
    //     if(location.hash.includes(element.hash))
    //     {
    //         console.log("Found It!");
    //     }
    //     console.log(element.hash);
    // });
    let object = sidebarContainer.find(object => location.hash.includes(object.hash));
    if(object)
    {
        console.log(object.hash);
        object.click();
        return;
    }
    console.log(gameCatalog[location.hash.slice(1)])
    object = gameCatalog[location.hash.slice(1)]
    //object = gameCatalog.find(object => location.hash.includes(object.id));
    if(object) 
    {
        switchContent(object.content);
        //object.click();
    }
    
    else
    {
        switchContent(home.content);
    }

    // for (const property in sidebarContainer) {
    //     console.log(property);
    //     if(location.hash.includes(property.hash))
    //     {
    //         console.log(`${property}: ${sidebarContainer[property]}`);
    //     }
    //   }
}
