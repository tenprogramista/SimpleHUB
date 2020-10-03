var text = document.getElementById('username');

var randomString = "";
var possible = "48CD3F6H1JKLMNOP0R57UVWXY2";

var username = "{name} ({amount})";

// TEXT EFFECT DELAYED FOR THE REVEAL TO OCCUR BEFORE
setTimeout( function() {

  for(var i=0; i < username.length; i++) {
    randomString = username.substr(0, i);
    for(var j=i; j < username.length; j++) { 
      randomString += possible.charAt(Math.floor(Math.random() * possible.length)); 
    }
    generateRandomTitle(i, randomString);
    randomString = '';
  }

  startFlickering();
}, 300);

function generateRandomTitle(i, random) {
  setTimeout( function() {
    text.innerHTML = random; }, i*75);
}

/* GLITCH EFFECT
 * Made by replacing random character with one from the "possible" string
 * and switching it back to the original character after a delay. 
 */
function glitch(delay) {
  let index = Math.floor(Math.random() * (username.length - 2)) + 2;
  
  setTimeout(function() {
    text.innerHTML =
    username.substring(0, index-1) + 
    possible.charAt(Math.floor(Math.random() * possible.length)) + 
    username.substring(index,username.length);
  }, 1600+delay);
  
  setTimeout(function() {
    text.innerHTML = username;
  }, 1680+delay);
}

/* FLICKERING EFFECT
 * Is just a multiplied GLITCH EFFECT on different cahracters at different times.
 */
function startFlickering() {
  for(var i = Math.ceil(Math.random() * 5) + 4; i >= 0; i--) {
    glitch(Math.floor(Math.random() * 3600));
  }
}
