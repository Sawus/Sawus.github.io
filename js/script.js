// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

var x = window.matchMedia("(min-width: 1025px)");
var running = false;
var reloaded = true;

var gameCatalog = {
    gooseInc: {
        imgSrc: ["images/gooseInc/GooseInc_0.png", "images/gooseInc/GooseInc_1.png", "images/gooseInc/GooseInc_2.png", "images/gooseInc/GooseInc_3.png", "images/gooseInc/GooseInc_4.png", "images/gooseInc/GooseInc_5.png", "images/gooseInc/GooseInc_6.png"],
        imgIndex: 0,
        content: "html/games/gooseInc.html",
    },
    modifiedRoll: {
        imgSrc: ["images/tearDevil/TearDevil_0.png", "images/tearDevil/TearDevil_1.png", "images/tearDevil/TearDevil_2.png"],
        imgIndex: 0,
        content: "html/games/modifiedRoll.html",
    },
    tearDevil: {
        imgSrc: ["images/tearDevil/TearDevil_0.png", "images/tearDevil/TearDevil_1.png", "images/tearDevil/TearDevil_2.png"],
        imgIndex: 0,
        content: "html/games/tearDevil.html",
    },
    jumpGame: {
        imgSrc: ["images/tearDevil/TearDevil_0.png", "images/tearDevil/TearDevil_1.png", "images/tearDevil/TearDevil_2.png"],
        imgIndex: 0,
        content: "html/games/jumpGame.html",
    },
    isoStrategy: {
        imgSrc: ["images/tearDevil/TearDevil_0.png", "images/tearDevil/TearDevil_1.png", "images/tearDevil/TearDevil_2.png"],
        imgIndex: 0,
        content: "html/games/isoStrategy.html",
    },
    mathGame: {
        imgSrc: ["images/tearDevil/TearDevil_0.png", "images/tearDevil/TearDevil_1.png", "images/tearDevil/TearDevil_2.png"],
        imgIndex: 0,
        content: "html/games/mathGame.html",
    }
}

// JQuery Load Shared HTML
$.get("html/shared.html", function(data){
    $("#shared").replaceWith(data);
    onLoad();
    console.log()
    getHash();
});

window.addEventListener('hashchange',() =>{
    //console.log('The URL has has changed');
    getHash();
});

window.onresize = function (event) {
    sidebar.style.height = window.innerHeight - 60 + 'px';
    content.style.height = window.innerHeight - 60 + 'px';
};

function updateHamburger() {
    //console.log("Clicked");
    let hamburger = getHamburger();
    if (!running) {
        running = true;
        if (hamburger.className != "hamburger hamburger--elastic is-active")
            hamburger.className = "hamburger hamburger--elastic is-active";
        else
            hamburger.className = "hamburger hamburger--elastic";
        sidebarSlide();
        setTimeout(function () {
            running = false;
        }, 500)
    }
}

function sidebarSlide() {
    let sidebar = getSidebar();
    let hamburger = getHamburger();
    let contentWrapper = document.getElementById("contentWrapper");

    var openPosition = -sidebar.shadow;
    var closePosition = -sidebar.width;
    
    if (hamburger.className == "hamburger hamburger--elastic is-active") {
        if (x.matches) {
            contentWrapper.style.marginLeft = "184px";
            sidebar.style.width = "180px";
        } else {
            //sidebar.style.transition = "0.5s";
            sidebar.style.width = "100%";
        }
        sidebar.style.marginLeft = "184px";
    }
    else {
        if (x.matches) {
            sidebar.style.marginLeft = "0px";
            contentWrapper.style.marginLeft = "0px";
            sidebar.style.width = "180px";
        } else {
            //sidebar.style.transition = "0.5s";
            contentWrapper.style.marginLeft = "0px";
            sidebar.style.marginLeft = "-100%";
        }
    }
}

function onLoad()
{
    // Hamburger
    let hamburger = getHamburger();
    hamburger.addEventListener("click", updateHamburger);

    // Sidebar
    let sidebar = getSidebar();
    sidebar.width = 180;
    sidebar.shadow = 4;
    sidebar.style.height = window.innerHeight - 60 + 'px';
    sidebar.style.width = sidebar.width + 'px';
    sidebar.style.left = '-' + (sidebar.width + sidebar.shadow) + 'px';
    
    // Content
    let content = getContent();
    content.style.height = window.innerHeight - 60 + 'px';
    content.style.left = 0 + 'px';
    content.style.marginLeft = 0 + 'px';

    // Home
    let home = getButton("Home");
    home.addEventListener("click", onNavigationClick);
    home.content = "html/home.html";
    home.hash = "Home";
    


    //Games
    let games = getButton("Games");
    games.addEventListener("click", onNavigationClick);
    games.content = "html/games.html";
    games.hash = "Games";

    // Apps
    let apps = getButton("Apps");
    apps.addEventListener("click", onNavigationClick);
    apps.content = "html/apps.html";
    apps.hash = "Apps";

    // 3D Models
    let models = getButton("Models");
    models.addEventListener("click", onNavigationClick);
    models.content = "html/models.html";
    models.hash = "Models";

    // About Me
    let about = getButton("About");
    about.addEventListener("click", onNavigationClick);
    about.content = "html/aboutMe.html";
    about.hash = "About";

}

function onLoadGames() {
    let gridContainer = document.querySelector(".gamesGridContainer");
    console.log(gridContainer);
    let gameContainer = gridContainer.querySelectorAll(".gameMenu");
    //Iterate Through Menus
    gameContainer.forEach(element => {
        // Title
        let title = element.querySelector(".gameTitle");
        title.addEventListener("click", onNavigationClick);
        title.content = "html/games/" + element.id + ".html";
        title.hash = element.id;
        //gamesContainer.push(title);
        
        // Pictures
        let pictureContainer = element.querySelector(".pictureGridContainer")
        let leftArrow = pictureContainer.querySelector(".leftArrow");
        leftArrow.addEventListener("click", switchImage);
        leftArrow.modifier = -1;
        leftArrow.owner = element;
        let rightArrow = pictureContainer.querySelector(".rightArrow");
        rightArrow.addEventListener("click", switchImage);
        rightArrow.modifier = 1;
        rightArrow.owner = element;
    });

    // Reset Values
    for (var game in gameCatalog) {
        gameCatalog[game].imgIndex = 0;
    }
}

function onLoadGame(name)
{
    let pictureContainer = document.querySelector(".pictureGridContainer")
    let leftArrow = pictureContainer.querySelector(".leftArrow");
    leftArrow.addEventListener("click", switchImage);
    leftArrow.modifier = -1;
    console.log(gameCatalog[name]);
    leftArrow.owner = pictureContainer;
    let rightArrow = pictureContainer.querySelector(".rightArrow");
    rightArrow.addEventListener("click", switchImage);
    rightArrow.modifier = 1;
    rightArrow.owner = pictureContainer;

        // Reset Values
    for (var game in gameCatalog) {
        gameCatalog[game].imgIndex = 0;
    }
}

function getSidebar()
{
    return document.getElementById("sidebar");
}

function getContent()
{
    return document.getElementById("content");
}

function getHamburger()
{
    return document.getElementById("hamburger");
}

function getHome()
{
    return document.getElementById("homeButton");
}
function getButton(value)
{
    let button;
    switch(value)
    {
        case "Home":
            button = document.getElementById("homeButton");
            break;
        case "Games":
            button = document.getElementById("sidebarGames");
            break;
        case "Apps":
            button = document.getElementById("sidebarApps");
            break;
        case "Models":
            button = document.getElementById("sidebarModels");
            break;
        case "About":
            button = document.getElementById("sidebarAbout");
            break;
        default:
            button = document.getElementById("homeButton");
    }
    //console.log(button);
    return button;
}

function getHash()
{
    
    if(Object.keys(gameCatalog).includes(location.hash.slice(1)))
    {
        for (let propName in gameCatalog)
        {
            if(propName === location.hash.slice(1))
            {
                switchContent(gameCatalog[propName].content);
                
                setTimeout(function () {
                    onLoadGame(propName);
                }, 1000)
                
                return;
            }
                
        }
        console.log("Its a Game!");
        //console.log()
    }
    else
    {
        let content = getButton(location.hash.slice(1))
        switchContent(content.content);
    }
    
    // let object = sidebarContainer.find(object => location.hash.includes(object.hash));
    // if(object)
    // {
    //     console.log(object.hash);
    //     object.click();
    //     return;
    // }
    // console.log(gameCatalog[location.hash.slice(1)])
    // object = gameCatalog[location.hash.slice(1)]
    // //object = gameCatalog.find(object => location.hash.includes(object.id));
    // if(object) 
    // {
    //     switchContent(object.content);
    //     //object.click();
    // }
    
    // else
    // {
    //     switchContent(home.content);
    // }
}

function onNavigationClick(event) {
    
    // switchContent(event.currentTarget.content)
    // // Extra Functionality for Games 
    // if(event.currentTarget.hash == "Games") {
    //     setTimeout(function () {
    //         onLoadGames();
    //     }, 500) 
    // }  
    //history.pushState(true, '', '#' + event.currentTarget.hash);
    if(event.currentTarget.hash.includes("game-"))
        location.hash = event.currentTarget.hash.slice(5);
    else
        location.hash = event.currentTarget.hash;

    console.log(event.currentTarget.hash);
}

function switchContent(content)
{ 
    let hamberger = getHamburger();
    if (hamburger.className == "hamburger hamburger--elastic is-active")
        updateHamburger();

    if(window.innerWidth < 1025)
    {
        // Replace Data in Content
        $.get(content, function(data){
            $("#content").replaceWith(data);
            if(content === "html/games.html")
            {
                onLoadGames();    
            }
        });
    }
    else
    {
        if(!reloaded)
        {
            fadeOut();

            setTimeout(function () {
                // Replace Data in Content
                $.get(content, function(data){
                    $("#content").replaceWith(data);
                    if(content === "html/games.html")
                    {
                        onLoadGames();    
                    }
                });
            }, 500)  
        }

        else
        {
            reloaded = false;
            $.get(content, function(data){
                $("#content").replaceWith(data);
                if(content === "html/games.html")
                {
                    onLoadGames();    
                }
            });
        }
    }  
}

function fadeOut()
{
    let contentWrapper = document.getElementById("contentWrapper");

    // Slide Out Animation
    //contentWrapper.style.transform = "translate(-100%, 0px)";

    // Opacity Animation
    contentWrapper.style.opacity = "0%"

    setTimeout(function () {
        fadeIn();
    }, 600)
}

function fadeIn()
{
    let contentWrapper = document.getElementById("contentWrapper");

    // Slide In Animation
    /*contentWrapper.style.transition = "0.0s";
    contentWrapper.style.transform = "translate(100%, 0px)";
    setTimeout(function () {
        contentWrapper.style.transition = "0.5s";
        contentWrapper.style.transform = "translate(0%, 0px)";
    }, 50)*/

    // Opacity Animation
    contentWrapper.style.opacity = "100%"
}

function switchImage(event) {

    var game;

    if(event.currentTarget.owner.id.includes("game-"))
    {
        // Gets Game That Event Was Called For
        game = gameCatalog[event.currentTarget.owner.id.slice(5)];
    }
    else
    {
        // Gets Game That Event Was Called For
        game = gameCatalog[event.currentTarget.owner.id];
    }
    

    if(!game)
        console.log("nada")
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