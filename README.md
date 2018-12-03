# Build Chrome RingCentral widgets extension for CRM <!-- omit in toc -->

This tutorial will show you how to build Chrome RingCentral widgets extension for CRM with [ringcentral-embeddable-extension-factory](https://github.com/zxdong262/ringcentral-embeddable-extension-factory)

## Table of Contents <!-- omit in toc -->

- [What does Chrome RingCentral widgets extension for CRM do?](#what-does-chrome-ringcentral-widgets-extension-for-crm-do)
- [Demo video(Insightly)](#demo-videoinsightly)
- [Screenshots(Insightly and Hubspot)](#screenshotsinsightly-and-hubspot)
- [Realworld code examples](#realworld-code-examples)
- [Create project with ringcentral-embeddable-extension-factory](#create-project-with-ringcentral-embeddable-extension-factory)
- [Build and Use](#build-and-use)
- [Make the features works](#make-the-features-works)
- [Build with custom RingCentral clientID/appServer](#build-with-custom-ringcentral-clientidappserver)
- [Credits](#credits)
- [License](#license)

## What does Chrome RingCentral widgets extension for CRM do?

In general, All the third party features of our [ringcentral-embeddable](https://github.com/ringcentral/ringcentral-embeddable) supported and some content insert:

- For CRM contact phone number text, we make it click-to-call link.

![ ](https://github.com/zxdong262/ringcentral-embeddable-extension-factory/raw/master/screenshots/fac-1.png)

- For CRM contact info page, we will add a click-to-call button in proper position.

![ ](https://github.com/zxdong262/ringcentral-embeddable-extension-factory/raw/master/screenshots/fac-3.png)

- For CRM contact list, we will add a hover-to-show tooltip to show click-to-call button.

![cc](https://github.com/zxdong262/ringcentral-embeddable-extension-factory/raw/master/screenshots/fac-2.png)

- Sync CRM contacts to our widgets after user authorize.

![ ](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-4.png)

- Sync call log to CRM automatically or manually.

![ ](https://github.com/zxdong262/hubspot-embeddable-ringcentral-phone/raw/master/screenshots/hs6.png)

- Check CRM contact activities from our widgets.

![ ](https://github.com/zxdong262/hubspot-embeddable-ringcentral-phone/raw/master/screenshots/hs7.png)

- Show CRM contact info panel when inbound/outbound call with CRM contact.

![ ](https://github.com/zxdong262/hubspot-embeddable-ringcentral-phone/raw/master/screenshots/hubspot1.png)

## Demo video(Insightly)

[https://youtu.be/Qfje5d5OdK0](https://youtu.be/Qfje5d5OdK0)

## Screenshots(Insightly and Hubspot)

| screenshots            |  screenshots |
:-------------------------:|:-------------------------:
![insightly-1](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-5.png) | ![insightly-1](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-4.png)
![insightly-1](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-3.png) | ![insightly-1](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-2.png)
![insightly-1](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone/raw/master/screenshots/insightly-1.png) | ![x](https://github.com/zxdong262/hubspot-embeddable-ringcentral-phone/raw/master/screenshots/hs6.png)
![x](https://github.com/zxdong262/hubspot-embeddable-ringcentral-phone/raw/master/screenshots/hs7.png) |  

## Realworld code examples

- [insightly-embeddable-ringcentral-phone](https://github.com/zxdong262/insightly-embeddable-ringcentral-phone)
- [hubspot-embeddable-ringcentral-phone](https://github.com/zxdong262/hubspot-embeddable-ringcentral-phone)

## Create project with ringcentral-embeddable-extension-factory

Need nodejs 8.10+/npm, recommend using [nvm](https://github.com/creationix/nvm) to install nodejs/npm.

Then let's create an extension project with [ringcentral-embeddable-extension-factory](https://github.com/zxdong262/ringcentral-embeddable-extension-factory):

```bash
npx ringcentral-embeddable-extension-factory my-app
```

Looks like this:

![ ](https://github.com/zxdong262/ringcentral-embeddable-extension-factory/raw/master/screenshots/cli.png)

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

## Make the features works

For now it is just a widget, you can call with it, to make all the features work, still need more developer work.

To make it easier, we already set common modules to reduce developer efforts, you could set proper selectors, methods to make all features to work:

- Edit [src/chrome-extension/config.js](src/chrome-extension/config.js) to make click-to-call related features to work
- Follow the guide in [src/chrome-extension/features/third-party-api.js](src/chrome-extension/features/third-party-api.js) to make all third party features to work.
- Further more you can edit [dist/manifest.json](dist/manifest.json) and [dist/background.js](dist/background.js) to do more customization work.
- And you can always read [Realworld code examples](#realworld-code-examples) to get some hint about how to do it.

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

## Credits

Created with [Embbnux Ji](https://github.com/embbnux)'s tuturial:
 [Building Chrome Extension Integrations with RingCentral Embeddable](https://medium.com/ringcentral-developers/build-a-chrome-extension-with-ringcentral-embeddable-bb6faee808a3)

## License

MIT
