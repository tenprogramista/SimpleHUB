let userCurrency, userLocale = "{locale}";

// ON START

window.addEventListener('onWidgetLoad', function (obj) {
  let data = obj.detail.session.data;
  userCurrency = obj.detail.currency;
  
  subscriber(data["subscriber-latest"]);
});

// ON EVENT

window.addEventListener('onEventReceived', function (obj) {
  const listener = obj.detail.listener;
  const data = obj.detail.event;
  
  if(listener === "tip-latest") {
    tip(data);
  }
  else if(listener === "subscriber-latest") {
    subscriber(data);
  }
  else if(listener === "follower-latest") {
    follower(data);
  }
  else if(listener === "cheer-latest") {
    cheer(data);
  } 
  else if(listener === "host-latest") {
    host(data);
  }
  else if(listener === "raid-latest") {
    raid(data);
  }
});

// SUB
function subscriber(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var dynamic = document.getElementById("dynamic");
  
  if(data.bulkGifted === true) {

    if(data.amount === 1) {
      
      // HUB
      setTimeout(() => {
        username.innerHTML = `${data.name} {communitySingleSuffix}`;
        icon.style.color = "{communityColor}";
        icon.innerHTML = "{subIcon}";
      }, 3000);

      // ALERT
      dynamic.innerHTML = 
        `<div class="alert sub"><i class="material-icons sized scale">{subIcon}</i><div class="name">${data.name} {communitySingleSuffix}</div></div>`;

      return;
    }

    // HUB
    setTimeout(() => {
      username.innerHTML = `${data.sender} {communityMultipleSuffix} (x${data.amount})`;
      icon.style.color = "{communityColor}";
      icon.innerHTML = "{subIcon}";
    }, 3000);

    // ALERT
    dynamic.innerHTML = 
      `<div class="alert sub"><i class="material-icons sized scale">{subIcon}</i><div class="name">${data.sender} {communityMultipleSuffix} (x${data.amount})</div></div>`;
  }

  else if (data.gifted === true) {

    if (data.isCommunityGift === true) {
      SE_API.resumeQueue();
      return;
    } 

    // HUB
    setTimeout(() => {
      username.innerHTML = `${data.name} ({giftNote} ${data.sender})`;
      icon.style.color = "{giftColor}";
      icon.innerHTML = "{subIcon}";
    }, 3000);

    // ALERT
    dynamic.innerHTML = 
      `<div class="alert sub"><i class="material-icons sized scale">{subIcon}</i><div class="name">${data.name} ({giftNote} ${data.sender})</div></div>`;
  } 

  else {

    // HUB
    setTimeout(() => {
      username.innerHTML = `${data.name} (x${data.amount})`;
      icon.style.color = "{subColor}";
      icon.innerHTML = "{subIcon}";
    }, 3000);

    // ALERT
    dynamic.innerHTML = 
      `<div class="alert sub"><i class="material-icons sized scale">{subIcon}</i><div class="name">${data.name} (x${data.amount})</div></div>`;
  }
}

// FOLLOW
function follower(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var dynamic = document.getElementById("dynamic");
  
  // HUB
  setTimeout(() => {
    username.innerHTML = `${data.name}`;
    icon.innerHTML = "{followIcon}";
    icon.style.color = "{followColor}";
  }, 3000);

  // ALERT
  dynamic.innerHTML = 
  `<div class="alert follow"><i class="material-icons sized pulse">{followIcon}</i><div class="name">${data.name}</div></div>`;
}

// CHEER
function cheer(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  
  // HUB
  setTimeout(() => {
    username.innerHTML = `${data.name} (X${data.amount})`;
    icon.innerHTML = "{cheerIcon}";
    icon.style.color = "{cheerColor}";
  }, 3000);

  // ALERT
  dynamic.innerHTML = 
  `<div class="alert cheer"><i class="material-icons sized pulse">{cheerIcon}</i><div class="name">${data.name} (X${data.amount})</div></div>`;
}

// TIP
function tip(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var currency = data.amount.toLocaleString(userLocale, {style: 'currency', currency: userCurrency.code});
  
  // HUB
  setTimeout(() => {
    username.innerHTML = `${data.name} (${currency})`;
    icon.innerHTML = "{tipIcon}";
    icon.style.color = "{tipColor}";
  }, 3000);

  // ALERT
  dynamic.innerHTML = 
  `<div class="alert tip"><i class="material-icons sized scale">{followIcon}</i><div class="name">${data.name} (${currency})</div></div>`;
}

// HOST
function host(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  
  // HUB
  setTimeout(() => {
    username.innerHTML = `${data.name} (${data.amount})`;
    icon.innerHTML = "{hostIcon}";
    icon.style.color = "{hostColor}";
  }, 3000);

  // ALERT
  dynamic.innerHTML = 
  `<div class="alert host"><i class="material-icons sized scale">{hostIcon}</i><div class="name">${data.name} (${data.amount})</div></div>`;
}

// RAID
function raid(data) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  
  // HUB
  setTimeout(() => {
    username.innerHTML = `${data.name} (${data.amount})`;
    icon.innerHTML = "{raidIcon}";
    icon.style.color = "{raidColor}";
  }, 3000);

  // ALERT
  dynamic.innerHTML = 
  `<div class="alert raid"><i class="material-icons sized scale">{raidIcon}</i><div class="name">${data.name} (${data.amount})</div></div>`;
}