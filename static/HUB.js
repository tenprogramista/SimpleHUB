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
    setTimeout(function() { modifyLatestTip(data); }, 3000);
  }
  else if(listener === "subscriber-latest") {
    setTimeout(function() { modifyLatestSubscriber(data); }, 3000);
  }
  else if(listener === "follower-latest") {
    setTimeout(function() { modifyLatestFollower(data); }, 3000);
  }
  else if(listener == "cheer-latest") {
    setTimeout(function() { modifyLatestCheer(data); }, 3000);
  } 
});

// SUB
function modifyLatestSubscriber(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  
  if(data["bulkGifted"] === true) {
    if(data["amount"] === 1) {
     username.innerHTML = `${data["name"]} {communitySingleSuffix}`;
      icon.style.color = "{communityColor}";
      return;
    }
    username.innerHTML = `${data["sender"]} {communityMultipleSuffix} (x${data["amount"]})`;
    icon.style.color = "{communityColor}";
  }
  else if (data["gifted"] === true) {
    if (data["isCommunityGift"] === true) {
      SE_API.resumeQueue();
      return;
    } 
    username.innerHTML = `${data["name"]} ({giftNote} ${data["sender"]})`;
    icon.style.color = "{giftColor}";
  } 
  else {
    username.innerHTML = `${data["name"]} (x${data["amount"]})`;
    icon.style.color = "{subColor}";
  }
  
  icon.innerHTML = "{subIcon}";
}

// FOLLOW
function modifyLatestFollower(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  
  username.innerHTML = `${data["name"]}`;
    
  icon.innerHTML = "{followIcon}";
  icon.style.color = "{followColor}";
}

// CHEER
function modifyLatestCheer(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  
  username.innerHTML = `${data["name"]} (X${data["amount"]})`;
    
  icon.innerHTML = "{cheerIcon}";
  icon.style.color = "{cheerColor}";
}

// TIP
function modifyLatestTip(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");

  var currency = data.amount.toLocaleString(userLocale, {style: 'currency', currency: userCurrency.code});
  
  username.innerHTML = `${data["name"]} (${currency})`;
    
  icon.innerHTML = "{tipIcon}";
  icon.style.color = "{tipColor}";
}