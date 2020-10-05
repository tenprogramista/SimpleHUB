# SimpleHUB 1.2.1
Customizable StreamElements-based alert HUB for your streams. 

## How To Use It
Paste the code into StreamElements Overlay Editor.

### STATIC
In StreamElements Overlay Editor click on "+", then on "STATIC/CUSTOM" in the menu. Select "Custom widget". A new layer will be added. Click on it to open the layer menu and select  "Settings" then "OPEN EDITOR". Paste the code to the proper tabs in the editor (FIELDS should contain the json file contents.) Once you've done that, the static widget properties should be visible for you in different categories ("BASIC SETTINGS", "BASE APPEARANCE", "SUBS", "FOLLOWS", etc.) Customize them to your liking.

### DYNAMIC
In StreamElements Overlay Editor click on "+", then on "ALERTS" and "AlertBox" in the menu. A new layer will be added. Click on it and select the cogwheel by the alert type you want to add/modify. Click on "OPEN CSS EDITOR" and paste the code into the proper tabs (FIELDS should contain the json file contents.) Once you're done, the extended alert properties will be visible. Customize them to you liking. Repeat for all the alerts you want to have.

**TIPS**
For the best effect the font size and icons should be the same in STATIC and DYNAMIC element of the HUB.

## Version Log
**1.0.0** - version directly from my streams

**1.0.1** - additional option to use Tip/Donation alerts

**1.1.0** - unified the appearance of alerts and static widget, added custom text

**1.1.1** - better customization options, bugfixes

**1.2.0** - sub alert variations

**1.2.1** - tip alert with custom suffix note (currency/amount issue workaround)

**1.2.2** - resizing fonts resizes the icon as well, fixed alignment issues

## Current Tasks
* bugfix: tip alert currency

## Development Plan
* in-editor text animation customization
* more alert animations

## Known Issues
* donated amount not being shown in alerts