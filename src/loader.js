

// On app start, load player data. 
// First, we will check if they are signed in and have character data. 
// If they do, load that, if they don't, we will try their localstorage instead. 
// If we can't find anything, let's send them directly to the character creation page. 

// Each character import includes their spec, stat weights, and an optional log URL. If we find a log URL then automatically load the last fight. 
const loadPlayer = () => {

}


const credentials = {
    client: {
        id: '1be64387daf6494da2de568527ad82cc'
    }

    //fetch("https://us.battle.net/oauth/authorize?client_id=1be64387daf6494da2de568527ad82cc&redirect_uri=https://localhost:3000/&response_type=code&scope=openid")
    
    



}