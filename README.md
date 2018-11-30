# build-chrome-ringcentral-widgets-extension-for-crm <!-- omit in toc -->

This tutorial will show you how to build Chrome RingCentral widgets extension for CRM with [ringcentral-embeddable-extension-factory](https://github.com/zxdong262/ringcentral-embeddable-extension-factory)


## Table of Contents <!-- omit in toc -->

- [Features](#features)
- [Demo video(Insightly)](#demo-videoinsightly)
- [Screenshots(Insightly and Hubspot)](#screenshotsinsightly-and-hubspot)
- [Realworld examples](#realworld-examples)
- [Build and Use](#build-and-use)
- [Build with custom RingCentral clientID/appServer](#build-with-custom-ringcentral-clientidappserver)
- [Make the features works](#make-the-features-works)
- [Credits](#credits)
- [License](#license)

## Features

- Add Click-to-call button in page.
- Hover conact list to show Click-to-call tooltip.
- Convert phone number text to Click-to-call link.
- Popup caller/callee info panel when call inbound/outbound
- Build with custom app config
- Show contact event from RingCentral Widgets
- Manully/auto Sync Call log to third party contact event

## Demo video(Insightly)

[https://youtu.be/Qfje5d5OdK0](https://youtu.be/Qfje5d5OdK0)

## Screenshots(Insightly and Hubspot)

| screenshots            |  screenshots |
:-------------------------:|:-------------------------:
![insightly-1](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-5.png) | ![insightly-1](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-4.png)
![insightly-1](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-3.png) | ![insightly-1](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-2.png)
![insightly-1](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-1.png) | ![x](https://github.com/zxdong262/hubspot-embeddable-ringcentral-phone/raw/master/screenshots/hs6.png)
![x](https://github.com/zxdong262/hubspot-embeddable-ringcentral-phone/raw/master/screenshots/hs7.png) |  

## Realworld examples

- [insightly-embeddable-ringcentral-phone](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone)
- [ubspot-embeddable-ringcentral-phone](https://github.com/zxdong262/hubspot-embeddable-ringcentral-phone)

## Build and Use

1. build `content.js`

```bash

# install dependencies, requires nodejs8.10+
npm i

# create config file, and set proper thirdPartyConfigs.serviceName
cp config.sample.js config.js

# then run it
npm start

# edit src/*.js, webpack will auto-rebuild,
# after rebuild, do not forget to refresh in extension page
```

1. Go to Chrome extensions page.
2. Open developer mode
3. Load `dist` as unpacked package.
4. Go to the CRM site to check

## Build with custom RingCentral clientID/appServer

- Create an app from [https://developer.ringcentral.com/](https://developer.ringcentral.com/), make sure you choose a browser based app, and set all permissions, and add `https://ringcentral.github.io/ringcentral-embeddable/redirect.html` to your redirect URI list, Edit `config.js`.

- Fill your RingCentral app's clientID and appServer in `config.js`.

```js

  ringCentralConfigs: {
    // your ringCentral app's Client ID
    clientID: 'your-clientID',

    // your ringCentral app's Auth Server URL
    appServer: 'your ringCentral app Auth Server URL'
  },
```

## Make the features works

For now it is just a widget, you can call with it, to make all the features work, still need more developer work.

To make it easier, we already set common modules to reduce developer efforts, you could set proper selectors, methods to make all features to work:

- Edit [src/chrome-extension/config.js](src/chrome-extension/config.js) to make click-to-call related features to work
- Follow the guide in [src/chrome-extension/features/third-party-api.js](src/chrome-extension/features/third-party-api.js) to make all third party features to work.
- And you can always read [Realworld examples](#realworld-examples) as examples

## Credits

Created with [Embbnux Ji](https://github.com/embbnux)'s tuturial:
 [Building Chrome Extension Integrations with RingCentral Embeddable](https://medium.com/ringcentral-developers/build-a-chrome-extension-with-ringcentral-embeddable-bb6faee808a3)

## License

MIT
