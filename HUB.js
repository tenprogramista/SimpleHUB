let userCurrency, userLocale = "{locale}", delay;

// ON START

window.addEventListener('onWidgetLoad', (obj) => {
  let data = obj.detail.session.data;
  const field = obj.detail.fieldData;
  userCurrency = obj.detail.currency;
  delay = field.widgetDuration * 500;

  follower(data["follower-latest"]);
});

// ON EVENT

window.addEventListener('onEventReceived', (obj) => {
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
      }, delay);

      // ALERT
      dynamic.innerHTML = 
        `<div class="alert sub">
        <i class="material-icons sized {subIconAnimation}">{subIcon}</i>
        <audio id="audio" autoplay hidden src="{subAudio}></audio>
        <div class="name">${data.name} {communitySingleSuffix}</div>
        </div>`;


      document.getElementById('audio').volume = {subVolume};
      return;
    }

    // HUB
    setTimeout(() => {
      username.innerHTML = `${data.sender} {communityMultipleSuffix} (x${data.amount})`;
      icon.style.color = "{communityColor}";
      icon.innerHTML = "{subIcon}";
    }, delay);

    // ALERT
    dynamic.innerHTML = 
      `<div class="alert sub">
      <i class="material-icons sized {subIconAnimation}">{subIcon}</i>
      <audio id="audio" autoplay hidden src="{subAudio}"></audio>
      <div class="name">${data.sender} {communityMultipleSuffix} (x${data.amount})</div>
      </div>`;

      document.getElementById('audio').volume = {subVolume};
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
    }, delay);

    // ALERT
    dynamic.innerHTML = 
      `<div class="alert sub">
      <i class="material-icons sized {subIconAnimation}">{subIcon}</i>
      <audio id="audio" autoplay hidden src="{subAudio}"></audio>
      <div class="name">${data.name} ({giftNote} ${data.sender})</div>
      </div>`;

      document.getElementById('audio').volume = {subVolume};
  } 

  else {

    // HUB
    setTimeout(() => {
      username.innerHTML = `${data.name} (x${data.amount})`;
      icon.style.color = "{subColor}";
      icon.innerHTML = "{subIcon}";
    }, delay);

    // ALERT
    dynamic.innerHTML = 
      `<div class="alert sub">
      <i class="material-icons sized {subIconAnimation}">{subIcon}</i>
      <audio id="audio" autoplay hidden src="{subAudio}"></audio>
      <div class="name">${data.name} (x${data.amount})</div>
      </div>`;

      document.getElementById('audio').volume = {subVolume};
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
  }, delay);

  // ALERT
  dynamic.innerHTML = 
  `<div class="alert follow">
  <i class="material-icons sized {followIconAnimation}">{followIcon}</i>
  <audio id="audio" autoplay hidden src="{followAudio}"></audio>
  <div class="name">${data.name}</div>
  </div>`;

  document.getElementById('audio').volume = {followVolume};
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
  }, delay);

  // ALERT
  dynamic.innerHTML = 
  `<div class="alert cheer">
  <i class="material-icons sized {cheerIconAnimation}">{cheerIcon}</i>
  <audio id="audio" autoplay hidden src="{cheerAudio}"></audio>
  <div class="name">${data.name} (X${data.amount})</div>
  </div>`;

  document.getElementById('audio').volume = {cheerVolume};
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
  }, delay);

  // ALERT
  dynamic.innerHTML = 
  `<div class="alert tip">
  <i class="material-icons sized {tipIconAnimation}">{tipIcon}</i>
  <audio id="audio" autoplay hidden src="{tipAudio}"></audio>
  <div class="name">${data.name} (${currency})</div>
  </div>`;

  document.getElementById('audio').volume = {tipVolume};
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
  }, delay);

  // ALERT
  dynamic.innerHTML = 
  `<div class="alert host">
  <i class="material-icons sized {hostIconAnimation}">{hostIcon}</i>
  <audio id="audio" autoplay hidden src="{hostAudio}"></audio>
  <div class="name">${data.name} (${data.amount})</div>
  </div>`;

  document.getElementById('audio').volume = {hostVolume};
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
  }, delay);

  // ALERT
  dynamic.innerHTML = 
  `<div class="alert raid">
  <i class="material-icons sized {raidIconAnimation}">{raidIcon}</i>
  <audio id="audio" autoplay hidden src="{raidAudio}"></audio>
  <div class="name">${data.name} (${data.amount})</div>
  </div>`;

  document.getElementById('audio').volume = {raidVolume};
}