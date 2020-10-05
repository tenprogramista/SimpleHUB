let userCurrency, userLocale = "{locale}";

//SET LATEST SUB AT THE START

window.addEventListener('onWidgetLoad', function (obj) {
  let data = obj["detail"]["session"]["data"];
  userCurrency = obj["detail"]["currency"];
  
  modifyLatestSubscriber(data["subscriber-latest"]);
});

// GET NEW EVENT

window.addEventListener('onEventReceived', function (obj) {
  const listener = obj.detail.listener;
  const data = obj["detail"]["event"];
  
  if(listener == "tip-latest") {
    modifyLatestTip(data);
  }
  else if(listener === "subscriber-latest") {
    modifyLatestSubscriber(data);
  }
  else if(listener === "follower-latest") {
    modifyLatestFollower(data);
  }
  else if(listener == "cheer-latest") {
    modifyLatestCheer(data);
  } 
});

// STATIC ELEMENT: LATEST EVENT

// SUB
function modifyLatestSubscriber(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var dynamic = document.getElementById("dynamic");
  
  if(data["bulkGifted"] === true) {

    if(data["amount"] === 1) {
      
      // HUB
      setTimeout(() => {
        username.innerHTML = `${data["name"]} {communitySingleSuffix}`;
        icon.style.color = "{communityColor}";
        icon.innerHTML = "{subIcon}";
      }, 3000);

      // ALERT
      dynamic.innerHTML = 
        `<div class="alert sub"><i class="material-icons sized scale">{subIcon}</i><div class="name">${data["name"]} {communitySingleSuffix}</div></div>`;

      return;
    }

    // HUB
    setTimeout(() => {
      username.innerHTML = `${data["sender"]} {communityMultipleSuffix} (x${data["amount"]})`;
      icon.style.color = "{communityColor}";
      icon.innerHTML = "{subIcon}";
    }, 3000);

    // ALERT
    dynamic.innerHTML = 
      `<div class="alert sub"><i class="material-icons sized scale">{subIcon}</i><div class="name">${data["sender"]} {communityMultipleSuffix} (x${data["amount"]})</div></div>`;
  }

  else if (data["gifted"] === true) {

    if (data["isCommunityGift"] === true) {
      SE_API.resumeQueue();
      return;
    } 

    // HUB
    setTimeout(() => {
      username.innerHTML = `${data["name"]} ({giftNote} ${data["sender"]})`;
      icon.style.color = "{giftColor}";
      icon.innerHTML = "{subIcon}";
    }, 3000);

    // ALERT
    dynamic.innerHTML = 
      `<div class="alert sub"><i class="material-icons sized scale">{subIcon}</i><div class="name">${data["name"]} ({giftNote} ${data["sender"]})</div></div>`;
  } 

  else {

    // HUB
    setTimeout(() => {
      username.innerHTML = `${data["name"]} (x${data["amount"]})`;
      icon.style.color = "{subColor}";
      icon.innerHTML = "{subIcon}";
    }, 3000);

    // ALERT
    dynamic.innerHTML = 
      `<div class="alert sub"><i class="material-icons sized scale">{subIcon}</i><div class="name">${data.name} (x${data.amount})</div></div>`;
  }
}

// FOLLOW
function modifyLatestFollower(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var dynamic = document.getElementById("dynamic");
  
  // HUB
  setTimeout(() => {
    username.innerHTML = `${data["name"]}`;
    icon.innerHTML = "{followIcon}";
    icon.style.color = "{followColor}";
  }, 3000);

  // ALERT
  dynamic.innerHTML = 
  `<div class="alert follow"><i class="material-icons sized pulse">{followIcon}</i><div class="name">${data.name}</div></div>`;
}

// CHEER
function modifyLatestCheer(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  
  // HUB
  username.innerHTML = `${data["name"]} (X${data["amount"]})`;
    
  icon.innerHTML = "{cheerIcon}";
  icon.style.color = "{cheerColor}";
}

// TIP
function modifyLatestTip(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var currency = data.amount.toLocaleString(userLocale, {style: 'currency', currency: userCurrency.code});
  
  // HUB
  username.innerHTML = `${data["name"]} (${currency})`;
    
  icon.innerHTML = "{tipIcon}";
  icon.style.color = "{tipColor}";
}