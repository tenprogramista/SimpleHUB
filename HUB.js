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
  var icon = $("#icon");
  var username = $("#username");
  var dynamic = $("#dynamic");
  var iconHTML;
  var dynamicIconHTML;

  if(field.subFontSource === "font-awesome") {
    dynamicIconHTML = `<i class="fas fa-${field.subIcon} ${field.subIconAnimation}"></i>`;
    iconHTML = `<i class="fas fa-${field.subIcon}"></i>`;
  } 
  else {
    dynamicIconHTML =  `<i class="material-icons sized ${field.subIconAnimation}">${field.subIcon}</i>`;
    iconHTML = `<i class="material-icons sized">${field.subIcon}</i>`;
  }
  
  var delay = showAnimation ? globalDelay : 0;

  if(data.bulkGifted === true) {

    if(data.amount === 1) {
      
      // HUB
      setTimeout(() => {
        username.html(`${data.name} ${field.communitySingleSuffix}`);
        icon.css("color", `${field.communityColor}`);
        icon.html(iconHTML);
      }, delay);

      // ALERT
      if(showAnimation) {
        dynamic.html(
          `<div class="alert sub">
          ${dynamicIconHTML}
          <audio id="audio" autoplay hidden src="${field.subAudio}></audio>
          <div class="name">${data.name} ${field.communitySingleSuffix}</div>
          </div>`);

        $("#audio")[0].volume = field.subVolume;
      }

      return;
    }

    // HUB
    setTimeout(() => {
      username.html(`${data.sender} ${field.communityMultipleSuffix} (x${data.amount})`);
      icon.css("color", `${field.communityColor}`);
      icon.html(iconHTML);
    }, delay);

    // ALERT
    if(showAnimation) {
      dynamic.html(
        `<div class="alert sub">
        ${dynamicIconHTML}
        <audio id="audio" autoplay hidden src="${field.subAudio}"></audio>
        <div class="name">${data.sender} ${field.communityMultipleSuffix} (x${data.amount})</div>
        </div>`);

        $("#audio")[0].volume = field.subVolume;
    }
  }

  else if (data.gifted === true) {

    if (data.isCommunityGift === true) {
      SE_API.resumeQueue();
      return;
    } 

    // HUB
    setTimeout(() => {
      username.html(`${data.name} (${field.giftNote} ${data.sender})`);
      icon.css("color", `${field.giftColor}`);
      icon.html(iconHTML);
    }, delay);

    // ALERT
    if(showAnimation) {
      dynamic.html(
        `<div class="alert sub">
        ${dynamicIconHTML}
        <audio id="audio" autoplay hidden src="${field.subAudio}"></audio>
        <div class="name">${data.name} (${field.giftNote} ${data.sender})</div>
        </div>`);

        $("#audio")[0].volume = field.subVolume;
    }
  } 

  else {

    // HUB
    setTimeout(() => {
      username.html(`${data.name} (x${data.amount})`);
      icon.css("color", `${field.subColor}`);
      icon.html(iconHTML);
    }, delay);

    // ALERT
    if(showAnimation) {
      dynamic.html(
        `<div class="alert sub">
        ${dynamicIconHTML}
        <audio id="audio" autoplay hidden src="${field.subAudio}"></audio>
        <div class="name">${data.name} (x${data.amount})</div>
        </div>`);

        $("#audio")[0].volume = field.subVolume;
    }
  }
}

// FOLLOW
function follower(data, showAnimation) {
  var icon = $("#icon");
  var username = $("#username");
  var dynamic = $("#dynamic");
  var delay = showAnimation ? globalDelay : 0;

  var iconHTML;

  if(field.followFontSource === "font-awesome") {
    dynamicIconHTML = `<i class="fas fa-${field.followIcon} ${field.followIconAnimation}"></i>`;
    iconHTML = `<i class="fas fa-${field.followIcon}"></i>`;
  } 
  else {
    dynamicIconHTML =  `<i class="material-icons sized ${field.followIconAnimation}">${field.followIcon}</i>`;
    iconHTML = `<i class="material-icons sized">${field.followIcon}</i>`;
  }

  // HUB
  setTimeout(() => {
    username.html(`${data.name}`);
    icon.html(iconHTML);
    icon.css("color", `${field.followColor}`);
  }, delay);

   // ALERT
  if(showAnimation) {
    dynamic.html(
    `<div class="alert follow">
    ${dynamicIconHTML}
    <audio id="audio" autoplay hidden src="${field.followAudio}"></audio>
    <div class="name">${data.name}</div>
    </div>`);

    $("#audio")[0].volume = field.followVolume;
  }
}

// CHEER
function cheer(data, showAnimation) {
  var icon = $("#icon");
  var username = $("#username");
  var delay = showAnimation ? globalDelay : 0;
  var iconHTML;

  if(field.cheerFontSource === "font-awesome") {
    dynamicIconHTML = `<i class="fas fa-${field.cheerIcon} ${field.cheerIconAnimation}"></i>`;
    iconHTML = `<i class="fas fa-${field.cheerIcon}"></i>`;
  } 
  else {
    dynamicIconHTML =  `<i class="material-icons sized ${field.cheerIconAnimation}">${field.cheerIcon}</i>`;
    iconHTML = `<i class="material-icons sized">${field.cheerIcon}</i>`;
  }

  // HUB
  setTimeout(() => {
    username.html(`${data.name} (X${data.amount})`);
    icon.html(iconHTML);
    icon.css("color", `${field.cheerColor}`);
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.html(
    `<div class="alert cheer">
    ${dynamicIconHTML}
    <audio id="audio" autoplay hidden src="${field.cheerAudio}"></audio>
    <div class="name">${data.name} (X${data.amount})</div>
    </div>`);

    $("#audio")[0].volume = field.cheerVolume;
  }
}

// TIP
function tip(data, showAnimation) {
  var icon = $("#icon");
  var username = $("#username");
  var currency = data.amount.toLocaleString(userLocale, {style: 'currency', currency: userCurrency.code});
  var delay = showAnimation ? globalDelay : 0;
  var iconHTML;

  if(field.tipFontSource === "font-awesome") {
    dynamicIconHTML = `<i class="fas fa-${field.tipIcon} ${field.tipIconAnimation}"></i>`;
    iconHTML = `<i class="fas fa-${field.tipIcon}"></i>`;
  } 
  else {
    dynamicIconHTML =  `<i class="material-icons sized ${field.tipIconAnimation}">${field.tipIcon}</i>`;
    iconHTML = `<i class="material-icons sized">${field.tipIcon}</i>`;
  }
  
  // HUB
  setTimeout(() => {
    username.html(`${data.name} (${currency})`);
    icon.html(iconHTML);
    icon.css("color", `${field.tipColor}`);
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.html(
    `<div class="alert tip">
    ${dynamicIconHTML}
    <audio id="audio" autoplay hidden src="${field.tipAudio}"></audio>
    <div class="name">${data.name} (${currency})</div>
    </div>`);

    $("#audio")[0].volume = field.tipVolume;
  }
}

// HOST
function host(data, showAnimation) {
  var icon = $("#icon");
  var username = $("#username");
  var delay = showAnimation ? globalDelay : 0;
  var iconHTML;

  if(field.hostFontSource === "font-awesome") {
    dynamicIconHTML = `<i class="fas fa-${field.hostIcon} ${field.hostIconAnimation}"></i>`;
    iconHTML = `<i class="fas fa-${field.hostIcon}"></i>`;
  } 
  else {
    dynamicIconHTML =  `<i class="material-icons sized ${field.hostIconAnimation}">${field.hostIcon}</i>`;
    iconHTML = `<i class="material-icons sized">${field.hostIcon}</i>`;
  }
  
  // HUB
  setTimeout(() => {
    username.html(`${data.name} (${data.amount})`);
    icon.html(iconHTML);
    icon.css("color", `${field.hostColor}`);
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.html(
    `<div class="alert host">
    ${dynamicIconHTML}
    <audio id="audio" autoplay hidden src="${field.hostAudio}"></audio>
    <div class="name">${data.name} (${data.amount})</div>
    </div>`);

    $("#audio")[0].volume = field.hostVolume;
  }
}

// RAID
function raid(data, showAnimation) {
  var icon = $("#icon");
  var username = $("#username");
  var delay = showAnimation ? globalDelay : 0;
  var iconHTML;

  if(field.raidFontSource === "font-awesome") {
    dynamicIconHTML = `<i class="fas fa-${field.raidIcon} ${field.raidIconAnimation}"></i>`;
    iconHTML = `<i class="fas fa-${field.raidIcon}"></i>`;
  } 
  else {
    dynamicIconHTML =  `<i class="material-icons sized ${field.raidIconAnimation}">${field.raidIcon}</i>`;
    iconHTML = `<i class="material-icons sized">${field.raidIcon}</i>`;
  }

  // HUB
  setTimeout(() => {
    username.html(`${data.name} (${data.amount})`);
    icon.html(iconHTML);
    icon.css("color", `${field.raidColor}`);
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.html(
    `<div class="alert raid">
    ${dynamicIconHTML}
    <audio id="audio" autoplay hidden src="${field.raidAudio}"></audio>
    <div class="name">${data.name} (${data.amount})</div>
    </div>`);

    $("#audio")[0].volume = field.raidVolume;
  }
}