const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
const form = document.querySelector('form')
const textField = document.getElementById('textField')
const socket = (window.location.href == "http://localhost:3000/game/") ? io.connect('localhost:3000') : io.connect('https://paaskespill.herokuapp.com/')
let playerID


function newImg(src){
    let img = new Image()
    img.src = src
    return img
}

const playerSprites = {
    // girl: [newImg("assets/girl_left.png"), newImg("assets/girl_left.png"), newImg("assets/girl_front.png"), newImg("assets/girl_right.png"), newImg("assets/girl_right.png")],
    boy: {
      running: {
        left: [
          newImg("assets/player/man/running_left/1.png"), 
          newImg("assets/player/man/running_left/2.png"), 
          newImg("assets/player/man/running_left/3.png"), 
          newImg("assets/player/man/running_left/4.png")],
        front: [newImg("assets/player/man/front/boy_front.png")],
        right: [
          newImg("assets/player/man/running_right/1.png"), 
          newImg("assets/player/man/running_right/2.png"), 
          newImg("assets/player/man/running_right/3.png"), 
          newImg("assets/player/man/running_right/4.png")]
      },
      walking: {
        left: [
          newImg("assets/player/man/walking_left/1.png"), 
          newImg("assets/player/man/walking_left/mid.png"), 
          newImg("assets/player/man/walking_left/2.png"), 
          newImg("assets/player/man/walking_left/mid.png")],
        front: [newImg("assets/player/man/front/boy_front.png")],
        right: [
          newImg("assets/player/man/walking_right/1.png"), 
          newImg("assets/player/man/walking_right/mid.png"), 
          newImg("assets/player/man/walking_right/2.png"), 
          newImg("assets/player/man/walking_right/mid.png")]
      },
      mining: ["assets/player/man/mining/1.png", "assets/player/man/mining/2.png", "assets/player/man/mining/3.png", "assets/player/man/mining/4.png"]
    }
}

const air = newImg("assets/blocks/general/air.png")

const grass = newImg("assets/blocks/general/grass.png")

const dirt = newImg("assets/blocks/general/dirt.png")

const log = newImg("assets/blocks/general/log.png")

const leaves = newImg("assets/blocks/general/leaves.png")

const stone = newImg("assets/blocks/general/stone.png")

const coal_ore = newImg("assets/blocks/ores/coal_ore.png")

const iron_ore = newImg("assets/blocks/ores/iron_ore.png")

const safe = newImg("assets/blocks/interactables/safe.png")

const sky = newImg("assets/backgrounds/sky.png")

const inventory = newImg("assets/ui/inventory.png")

const safe_inside = newImg("assets/ui/safe_inside.png")

const crafting = newImg("assets/ui/crafting.png")

const iron_pick = newImg("assets/tools/iron_pick.png")

const imgs = [air, stone, log, leaves, coal_ore, grass, iron_ore, dirt, safe, 0, 0, 0, iron_pick]



canvas.width = window.innerWidth
canvas.height = window.innerHeight
const w = window.innerWidth
const h = window.innerHeight
var clientX = 0
var clientY = 0
var users = {}

function equalsSome(val, arr){
  let value = val
  for(let i = 0; i < arr.length; i++){
    if(arr[i] == value) return true
  }
  return false
}

const fl = num => Math.floor(num)
const ce = num => Math.ceil(num)
const ro = num => Math.r(num)
const sq = num => Math.sqrt(num)
const pow = (num, ex) => Math.pow(num, ex)
const dist = (p1, p2) => sq(pow(p2.x-p1.x, 2) + pow(p2.y-p1.y, 2))
