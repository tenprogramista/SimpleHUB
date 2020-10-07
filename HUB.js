let field, userCurrency, userLocale, globalDelay;

// ON START

window.addEventListener('onWidgetLoad', (obj) => {
  let data = obj.detail.session.data;
  field = obj.detail.fieldData;
  userCurrency = obj.detail.currency;
  userLocale = field.locale;
  globalDelay = field.widgetDuration * 500;

  switch (field.initialRecentEvent) {
    case "follower-latest":
      follower(data[field.initialRecentEvent], field.showInitialAnimation);
      break;
    case "subscriber-latest":
      subscriber(data[field.initialRecentEvent], field.showInitialAnimation);
      break;
    case "cheer-latest":
    case "cheer-alltime-top-donation":
    case "cheer-monthly-top-donation":
    case "cheer-weekly-top-donation":
    case "cheer-alltime-top-donator":
    case "cheer-monthly-top-donator":
    case "cheer-weekly-top-donator":
      cheer(data[field.initialRecentEvent], field.showInitialAnimation);
      break;
    case "tip-latest":
    case "tip-alltime-top-donation":
    case "tip-monthly-top-donation":
    case "tip-weekly-top-donation":
    case "tip-alltime-top-donator":
    case "tip-monthly-top-donator":
    case "tip-weekly-top-donator":
      tip(data[field.initialRecentEvent], field.showInitialAnimation);
      break;
    case "raid-latest":
      raid(data[field.initialRecentEvent], field.showInitialAnimation);
      break;
    case "host-latest":
      host(data[field.initialRecentEvent], field.showInitialAnimation);
      break;

    default:
      break;
  }
});

// ON EVENT

window.addEventListener('onEventReceived', (obj) => {
  const listener = obj.detail.listener;
  const data = obj.detail.event;
  
  if(listener === "tip-latest") {
    tip(data, field.showTipAlert);
  }
  else if(listener === "subscriber-latest") {
    subscriber(data, field.showSubAlert);
  }
  else if(listener === "follower-latest") {
    follower(data, field.showFollowAlert);
  }
  else if(listener === "cheer-latest") {
    cheer(data, field.showCheerAlert);
  } 
  else if(listener === "host-latest") {
    host(data, field.showHostAlert);
  }
  else if(listener === "raid-latest") {
    raid(data, field.showRaidAlert);
  }
});

// SUB
function subscriber(data, showAnimation) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var dynamic = document.getElementById("dynamic");
  
  var delay = showAnimation ? globalDelay : 0;

  if(data.bulkGifted === true) {

    if(data.amount === 1) {
      
      // HUB
      setTimeout(() => {
        username.innerHTML = `${data.name} ${field.communitySingleSuffix}`;
        icon.style.color = `${field.communityColor}`;
        icon.innerHTML = `${field.subIcon}`;
      }, delay);

      // ALERT
      if(showAnimation) {
        dynamic.innerHTML = 
          `<div class="alert sub">
          <i class="material-icons sized ${field.subIconAnimation}">${field.subIcon}</i>
          <audio id="audio" autoplay hidden src="${field.subAudio}></audio>
          <div class="name">${data.name} ${field.communitySingleSuffix}</div>
          </div>`;

        document.getElementById('audio').volume = field.subVolume;
      }

      return;
    }

    // HUB
    setTimeout(() => {
      username.innerHTML = `${data.sender} ${field.communityMultipleSuffix} (x${data.amount})`;
      icon.style.color = `${field.communityColor}`;
      icon.innerHTML = `${field.subIcon}`;
    }, delay);

    // ALERT
    if(showAnimation) {
      dynamic.innerHTML = 
        `<div class="alert sub">
        <i class="material-icons sized ${field.subIconAnimation}">${field.subIcon}</i>
        <audio id="audio" autoplay hidden src="${field.subAudio}"></audio>
        <div class="name">${data.sender} ${field.communityMultipleSuffix} (x${data.amount})</div>
        </div>`;

        document.getElementById('audio').volume = field.subVolume;
    }
  }

  else if (data.gifted === true) {

    if (data.isCommunityGift === true) {
      SE_API.resumeQueue();
      return;
    } 

    // HUB
    setTimeout(() => {
      username.innerHTML = `${data.name} (${field.giftNote} ${data.sender})`;
      icon.style.color = `${field.giftColor}`;
      icon.innerHTML = `${field.subIcon}`;
    }, delay);

    // ALERT
    if(showAnimation) {
      dynamic.innerHTML = 
        `<div class="alert sub">
        <i class="material-icons sized ${field.subIconAnimation}">${field.subIcon}</i>
        <audio id="audio" autoplay hidden src="${field.subAudio}"></audio>
        <div class="name">${data.name} (${field.giftNote} ${data.sender})</div>
        </div>`;

        document.getElementById('audio').volume = field.subVolume;
    }
  } 

  else {

    // HUB
    setTimeout(() => {
      username.innerHTML = `${data.name} (x${data.amount})`;
      icon.style.color = `${field.subColor}`;
      icon.innerHTML = `${field.subIcon}`;
    }, delay);

    // ALERT
    if(showAnimation) {
      dynamic.innerHTML = 
        `<div class="alert sub">
        <i class="material-icons sized ${field.subIconAnimation}">${field.subIcon}</i>
        <audio id="audio" autoplay hidden src="${field.subAudio}"></audio>
        <div class="name">${data.name} (x${data.amount})</div>
        </div>`;

        document.getElementById('audio').volume = field.subVolume;
    }
  }
}

// FOLLOW
function follower(data, showAnimation) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var dynamic = document.getElementById("dynamic");
  var delay = showAnimation ? globalDelay : 0;

  // HUB
  setTimeout(() => {
    username.innerHTML = `${data.name}`;
    icon.innerHTML = `${field.followIcon}`;
    icon.style.color = `${field.followColor}`;
  }, delay);

   // ALERT
  if(showAnimation) {
    dynamic.innerHTML = 
    `<div class="alert follow">
    <i class="material-icons sized ${field.followIconAnimation}">${field.followIcon}</i>
    <audio id="audio" autoplay hidden src="${field.followAudio}"></audio>
    <div class="name">${data.name}</div>
    </div>`;

    document.getElementById('audio').volume = field.followVolume;
  }
}

// CHEER
function cheer(data, showAnimation) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var delay = showAnimation ? globalDelay : 0;

  // HUB
  setTimeout(() => {
    username.innerHTML = `${data.name} (X${data.amount})`;
    icon.innerHTML = `${field.cheerIcon}`;
    icon.style.color = `${field.cheerColor}`;
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.innerHTML = 
    `<div class="alert cheer">
    <i class="material-icons sized ${field.cheerIconAnimation}">${field.cheerIcon}</i>
    <audio id="audio" autoplay hidden src="${field.cheerAudio}"></audio>
    <div class="name">${data.name} (X${data.amount})</div>
    </div>`;

    document.getElementById('audio').volume = field.cheerVolume;
  }
}

// TIP
function tip(data, showAnimation) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var currency = data.amount.toLocaleString(userLocale, {style: 'currency', currency: userCurrency.code});
  var delay = showAnimation ? globalDelay : 0;
  
  // HUB
  setTimeout(() => {
    username.innerHTML = `${data.name} (${currency})`;
    icon.innerHTML = `${field.tipIcon}`;
    icon.style.color = `${field.tipColor}`;
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.innerHTML = 
    `<div class="alert tip">
    <i class="material-icons sized ${field.tipIconAnimation}">${field.tipIcon}</i>
    <audio id="audio" autoplay hidden src="${field.tipAudio}"></audio>
    <div class="name">${data.name} (${currency})</div>
    </div>`;

    document.getElementById('audio').volume = field.tipVolume;
  }
}

// HOST
function host(data, showAnimation) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var delay = showAnimation ? globalDelay : 0;
  
  // HUB
  setTimeout(() => {
    username.innerHTML = `${data.name} (${data.amount})`;
    icon.innerHTML = `${field.hostIcon}`;
    icon.style.color = `${field.hostColor}`;
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.innerHTML = 
    `<div class="alert host">
    <i class="material-icons sized ${field.hostIconAnimation}">${field.hostIcon}</i>
    <audio id="audio" autoplay hidden src="${field.hostAudio}"></audio>
    <div class="name">${data.name} (${data.amount})</div>
    </div>`;

    document.getElementById('audio').volume = field.hostVolume;
  }
}

// RAID
function raid(data, showAnimation) {
  var icon = document.getElementById("icon");
  var username = document.getElementById("username");
  var delay = showAnimation ? globalDelay : 0;

  // HUB
  setTimeout(() => {
    username.innerHTML = `${data.name} (${data.amount})`;
    icon.innerHTML = `${field.raidIcon}`;
    icon.style.color = `${field.raidColor}`;
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.innerHTML = 
    `<div class="alert raid">
    <i class="material-icons sized ${field.raidIconAnimation}">${field.raidIcon}</i>
    <audio id="audio" autoplay hidden src="${field.raidAudio}"></audio>
    <div class="name">${data.name} (${data.amount})</div>
    </div>`;

    document.getElementById('audio').volume = field.raidVolume;
  }
}