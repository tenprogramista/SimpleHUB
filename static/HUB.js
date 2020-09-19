let userCurrency, userLocale = 'pl-PL';

window.addEventListener('onWidgetLoad', function (obj) {
  let data = obj["detail"]["session"]["data"];
  userCurrency = obj["detail"]["currency"];
  
  modifyLatestSubscriber(data["subscriber-latest"]);
});

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

function modifyLatestSubscriber(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  
  if(data["bulkGifted"] === true) {
    if(data["amount"] === 1) {
     username.innerHTML = `${data["name"]} funduje komuś subskrypcję!`;
      icon.style.color = "{communityColor}";
      return;
    }
    username.innerHTML = `${data["sender"]} rozdaje subskrypcje (x${data["amount"]})`;
    icon.style.color = "{communityColor}";
  }
  else if (data["gifted"] === true) {
    if (data["isCommunityGift"] === true) {
      SE_API.resumeQueue();
      return;
    } 
    username.innerHTML = `${data["name"]} (prezent od ${data["sender"]})`;
    icon.style.color = "{giftColor}";
  } 
  else {
    username.innerHTML = `${data["name"]} (x${data["amount"]})`;
    icon.style.color = "{subColor}";
  }
  
  icon.innerHTML = "{subIcon}";
}

function modifyLatestFollower(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  
  username.innerHTML = `${data["name"]}`;
    
  icon.innerHTML = "{followIcon}";
  icon.style.color = "{followColor}";
}

function modifyLatestCheer(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  
  username.innerHTML = `${data["name"]} (X${data["amount"]})`;
    
  icon.innerHTML = "{cheerIcon}";
  icon.style.color = "{cheerColor}";
}

function modifyLatestTip(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  
  var currency = data.amount.toLocaleString(userLocale, {style: 'currency', currency: userCurrency.code});
  
  username.innerHTML = `${data["name"]} (${currency})`;
    
  icon.innerHTML = "{tipIcon}";
  icon.style.color = "{tipColor}";
}