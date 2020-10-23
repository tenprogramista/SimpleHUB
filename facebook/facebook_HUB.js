let field, userCurrency, userLocale, globalDelay;

// ON START

window.addEventListener('onWidgetLoad', (obj) => {
  let data = obj.detail.session.data;
  field = obj.detail.fieldData;
  userCurrency = obj.detail.currency;
  userLocale = field.locale;
  globalDelay = field.widgetDuration * 500;

  switch (field.initialRecentEvent) {
    case "fan-latest":
      fan(data, field.initialRecentEvent);
      break;
    case "follower-latest":
      follower(data, field.initialRecentEvent);
      break;
    case "share-latest":
      share(data, field.initialRecentEvent);
      break;
    case "stars-latest":
      stars(data, field.initialRecentEvent);
      break;
    case "supporter-latest":
      supporter(data, field.initialRecentEvent);
      break;
    case "videolike-latest":
      videolike(data, field.initialRecentEvent);
      break;

    default:
      break;
  }
});

// ON EVENT

window.addEventListener('onEventReceived', (obj) => {
  const listener = obj.detail.listener;
  const data = obj.detail.event;
  
  if(listener === "fan-latest") {
    fan(data, field.showFanAlert);
  }
  else if(listener === "star-latest") {
    stars(data, field.showStarAlert);
  }
  else if(listener === "follower-latest") {
    follower(data, field.showFollowAlert);
  }
  else if(listener === "share-latest") {
    share(data, field.showCheerAlert);
  } 
  else if(listener === "supporter-latest") {
    supporter(data, field.showHostAlert);
  }
  else if(listener === "videolike-latest") {
    videolike(data, field.showRaidAlert);
  }
});

// FAN
function fan(data, showAnimation) {
  var icon = $("#icon");
  var username = $("#username");
  var dynamic = $("#dynamic");
  var iconHTML;
  var dynamicIconHTML;

  if(field.fanFontSource === "font-awesome") {
    dynamicIconHTML = `<i class="fas fa-${field.fanIcon} ${field.fanIconAnimation}"></i>`;
    iconHTML = `<i class="fas fa-${field.fanIcon}"></i>`;
  } 
  else {
    dynamicIconHTML =  `<i class="material-icons sized ${field.fanIconAnimation}">${field.fanIcon}</i>`;
    iconHTML = `<i class="material-icons sized">${field.fanIcon}</i>`;
  }
  
  // HUB
  setTimeout(() => {
    username.html(`${data.name}`);
    icon.css("color", `${field.fanColor}`);
    icon.html(iconHTML);
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.html(
      `<div class="alert sub">
      ${dynamicIconHTML}
      <audio id="audio" autoplay hidden src="${field.fanAudio}></audio>
      <div class="name">${data.name}</div>
      </div>`);

    $("#audio")[0].volume = field.fanVolume;
  }
}

function stars(data, showAnimation) {
  var icon = $("#icon");
  var username = $("#username");
  var dynamic = $("#dynamic");
  var iconHTML;
  var dynamicIconHTML;

  if(field.starFontSource === "font-awesome") {
    dynamicIconHTML = `<i class="fas fa-${field.starIcon} ${field.starIconAnimation}"></i>`;
    iconHTML = `<i class="fas fa-${field.starIcon}"></i>`;
  } 
  else {
    dynamicIconHTML =  `<i class="material-icons sized ${field.starIconAnimation}">${field.starIcon}</i>`;
    iconHTML = `<i class="material-icons sized">${field.starIcon}</i>`;
  }
  
  // HUB
  setTimeout(() => {
    username.html(`${data.name}`);
    icon.css("color", `${field.starColor}`);
    icon.html(iconHTML);
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.html(
      `<div class="alert sub">
      ${dynamicIconHTML}
      <audio id="audio" autoplay hidden src="${field.starAudio}></audio>
      <div class="name">${data.name}</div>
      </div>`);

    $("#audio")[0].volume = field.starVolume;
  }
}

function follower(data, showAnimation) {
  var icon = $("#icon");
  var username = $("#username");
  var dynamic = $("#dynamic");
  var iconHTML;
  var dynamicIconHTML;

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
    icon.css("color", `${field.followColor}`);
    icon.html(iconHTML);
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.html(
      `<div class="alert sub">
      ${dynamicIconHTML}
      <audio id="audio" autoplay hidden src="${field.followAudio}></audio>
      <div class="name">${data.name}</div>
      </div>`);

    $("#audio")[0].volume = field.followVolume;
  }
}

function share(data, showAnimation) {
  var icon = $("#icon");
  var username = $("#username");
  var dynamic = $("#dynamic");
  var iconHTML;
  var dynamicIconHTML;

  if(field.shareFontSource === "font-awesome") {
    dynamicIconHTML = `<i class="fas fa-${field.shareIcon} ${field.shareIconAnimation}"></i>`;
    iconHTML = `<i class="fas fa-${field.shareIcon}"></i>`;
  } 
  else {
    dynamicIconHTML =  `<i class="material-icons sized ${field.shareIconAnimation}">${field.shareIcon}</i>`;
    iconHTML = `<i class="material-icons sized">${field.shareIcon}</i>`;
  }
  
  // HUB
  setTimeout(() => {
    username.html(`${data.name}`);
    icon.css("color", `${field.shareColor}`);
    icon.html(iconHTML);
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.html(
      `<div class="alert sub">
      ${dynamicIconHTML}
      <audio id="audio" autoplay hidden src="${field.shareAudio}></audio>
      <div class="name">${data.name}</div>
      </div>`);

    $("#audio")[0].volume = field.shareVolume;
  }
}

function supporter(data, showAnimation) {
  var icon = $("#icon");
  var username = $("#username");
  var dynamic = $("#dynamic");
  var iconHTML;
  var dynamicIconHTML;

  if(field.supporterFontSource === "font-awesome") {
    dynamicIconHTML = `<i class="fas fa-${field.supporterIcon} ${field.supporterIconAnimation}"></i>`;
    iconHTML = `<i class="fas fa-${field.supporterIcon}"></i>`;
  } 
  else {
    dynamicIconHTML =  `<i class="material-icons sized ${field.supporterIconAnimation}">${field.supporterIcon}</i>`;
    iconHTML = `<i class="material-icons sized">${field.supporterIcon}</i>`;
  }
  
  // HUB
  setTimeout(() => {
    username.html(`${data.name}`);
    icon.css("color", `${field.supporterColor}`);
    icon.html(iconHTML);
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.html(
      `<div class="alert sub">
      ${dynamicIconHTML}
      <audio id="audio" autoplay hidden src="${field.supporterAudio}></audio>
      <div class="name">${data.name}</div>
      </div>`);

    $("#audio")[0].volume = field.supporterVolume;
  }
}

function videolike(data, showAnimation) {
  var icon = $("#icon");
  var username = $("#username");
  var dynamic = $("#dynamic");
  var iconHTML;
  var dynamicIconHTML;

  if(field.videolikeFontSource === "font-awesome") {
    dynamicIconHTML = `<i class="fas fa-${field.videolikeIcon} ${field.videolikeIconAnimation}"></i>`;
    iconHTML = `<i class="fas fa-${field.videolikeIcon}"></i>`;
  } 
  else {
    dynamicIconHTML =  `<i class="material-icons sized ${field.videolikeIconAnimation}">${field.videolikeIcon}</i>`;
    iconHTML = `<i class="material-icons sized">${field.videolikeIcon}</i>`;
  }
  
  // HUB
  setTimeout(() => {
    username.html(`${data.name}`);
    icon.css("color", `${field.videolikeColor}`);
    icon.html(iconHTML);
  }, delay);

  // ALERT
  if(showAnimation) {
    dynamic.html(
      `<div class="alert sub">
      ${dynamicIconHTML}
      <audio id="audio" autoplay hidden src="${field.videolikeAudio}></audio>
      <div class="name">${data.name}</div>
      </div>`);

    $("#audio")[0].volume = field.videolikeVolume;
  }
}