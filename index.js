var start = document.querySelector("#start")
var game = document.querySelector("#game")
var time = document.querySelector("#time")
var timeHeader = document.querySelector("#time-header")
var resultHeader = document.querySelector("#result-header")
var result = document.querySelector("#result")
var gameTime = document.querySelector("#game-time")

var score = 0
var isGameStarted=false
var hex="a,b,c,d,e,f,1,2,3,4,5,6,7,8,9"
var masHex=hex.split(",")

start.addEventListener("click",startGame)
game.addEventListener("click",handleBoxClick)
gameTime.addEventListener("input",function(){
    hide(resultHeader)
    show(timeHeader)
    time.textContent=(+gameTime.value).toFixed(1)
})
var show = (el)=>{
    el.classList.remove("hide")
}
var hide = (el)=>{
    el.classList.add("hide")
}
function startGame (){
    score=0
    isGameStarted=true
    hide(start)
    hide(resultHeader)
    show(timeHeader)  
    game.style.backgroundColor='#fff'
    gameTime.setAttribute('disabled',true)
    var interval = setInterval(()=>{
        var newTime=time.textContent
        if(newTime<=0){
            clearInterval(interval)
            endGame()
        }else{
            time.textContent=(newTime-0.1).toFixed(1)
        }
        
    },100)
    renderBox()
}
function endGame(){
    isGameStarted=false
    show(start)
    show(resultHeader)
    hide(timeHeader)
    game.style.backgroundColor='#ccc'
    game.innerHTML=" "
    gameTime.removeAttribute("disabled")
    result.textContent=score
    time.textContent=(+gameTime.value).toFixed(1)
 }
function handleBoxClick (event) {
    if(!isGameStarted) return
    if(event.target.dataset.box){
        score++
        renderBox()
    }
}
function renderBox () {
    game.innerHTML =""
    var box = document.createElement("div")
    var boxSize = getRandom(30,100)
    var gameSize = game.getBoundingClientRect()
    var maxLeft = gameSize.width - boxSize
    var maxTop = gameSize.height - boxSize
    box.style.height=box.style.width = boxSize+"px"
    box.style.position = "absolute"
    box.style.backgroundColor="#"+getRandomColor()
    box.style.borderRadius="100%"
    box.style.top=getRandom(0,maxTop)+'px'
    box.style.left=getRandom(0,maxLeft)+'px'
    box.style.cursor="pointer"
    box.setAttribute('data-box','true')
    game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min,max){
    return parseInt(Math.random()*(max-min)+min)
}
function getRandomColor(){
    return (masHex[getRandom(0,14)]+masHex[getRandom(0,14)]+masHex[getRandom(0,14)]+masHex[getRandom(0,14)]+masHex[getRandom(0,14)]+masHex[getRandom(0,14)])
}