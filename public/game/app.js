let showInventory = false
form.onsubmit = (e) => {
    // dette er henriks kommentar
    //Jørgen er kul
    e.preventDefault()
        socket.emit('new-user', textField.value)
        form.style.display = "none"

        socket.on("playerID", id => {
            playerID = id
            console.log(playerID)
        })
        socket.on('heartbeat', (map, users) => {
            for (let [id, user] of Object.entries(users)) {
                if(user.player.direction == "right") user.player.img = player_right
                else if(user.player.direction == "left") user.player.img = player_left
                else user.player.img = player_front
            }
            draw(map, users)
        })
    
        window.addEventListener("keydown", e => {
            if(e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 32 || e.keyCode == 66) socket.emit('keysD', e.keyCode)
        })
    
        window.addEventListener("keyup", e => {
            if(e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 66) socket.emit('keysU', e.keyCode)
        })

        window.addEventListener("mousemove", e => {
            clientX = e.clientX
            clientY = e.clientY
        })

        window.addEventListener("mousedown", e => {
         if(!showInventory){
            if(e.button == 0 || e.button == 2){
                socket.emit('click', e.button, clientX, clientY, canvas.width, canvas.height)
                console.log(1)
            } 
         }
         else{
             
         }
        })
        
        window.addEventListener("keydown", e => {
            if(e.keyCode == 69/*nice*/) showInventory = !showInventory
        })
        
}

function draw(map, users){
    c.clearRect(0,0,w,h)
    c.drawImage(sky, 0, 0, w, h)
    for(i=Math.floor(users[playerID].player.y - 32/64 - canvas.height/64)-1; i<Math.ceil(users[playerID].player.y - 32/64 + canvas.height/64)+1; i++){
        if(i<0) continue
        if(i>=map.length) break
        for(j=Math.floor(users[playerID].player.x - 7/32 - canvas.width/64)-1; j<Math.ceil(users[playerID].player.x - 7/32 + canvas.width/64)+1; j++){
            if(j<0) continue
            if(j>=map[i].length) break
            c.drawImage(imgs[map[i][j]], canvas.width/2 + 32*(j-users[playerID].player.x-7/32), canvas.height/2 + 32*(i-users[playerID].player.y-32/64), 32, 32)
        }
    }

    c.drawImage(users[playerID].player.img, (canvas.width-16)/2, (canvas.height-32)/2, 32, 64)
    c.font = "14px Monospace"
    c.textAlign = "center"
    c.fillText(users[playerID].username, (canvas.width-16)/2 + 16, (canvas.height-32)/2 - 16)


  
  for (let [id, user] of Object.entries(users)){
    if(id != playerID){
        c.drawImage(user.player.img, canvas.width/2 + 32*(user.player.x-users[playerID].player.x-7/32), canvas.height/2 + 32*(user.player.y-users[playerID].player.y-32/64), 32, 64)
        c.fillText(user.username, canvas.width/2 + 32*(user.player.x-users[playerID].player.x-7/32) + 16, canvas.height/2 + 32*(user.player.y-users[playerID].player.y-32/64) - 16)
    }
  }

  if(showInventory){
      c.drawImage(inventory, (canvas.width-800)/2, (canvas.height-480)/2, 800, 480)
    for(i=0; i<32; i+=1){
        if(imgs[users[playerID].player.inventory[i][1]]!=0){
            c.drawImage(imgs[users[playerID].player.inventory[i][0]], 100 + i%8*80 + (canvas.width - 800)/2, 100 + Math.floor(i/8)*80 + (canvas.height-480)/2, 40, 40)
            c.fillText(users[playerID].player.inventory[i][1], 95 + (i%8)*80 + (canvas.width - 800)/2, 100 + Math.floor(i/8)*80 + (canvas.height-480)/2)
        }
    }
  }   
}