/**
 * third party api
 * you can do things like:
 * 1. sync third party contacts to ringcentral widgets contact list
 * 2. when call outbound or call inbound, show caller/callee info panel
 * 3. sync call log to third party system
 *
 * document about third party features: https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/third-party-service-in-widget.md
 *
 * finish all todos in
 *
 * src/chrome-extension/features/activities.js
 * src/chrome-extension/features/auth.js
 * src/chrome-extension/features/call-log-sync.js
 * src/chrome-extension/features/contacts.js
 * to make all third party feature work
 *
 */

import {thirdPartyConfigs} from '../common/app-config'
import {
  showAuthBtn,
  unAuth,
  doAuth,
  renderAuthButton,
  notifyRCAuthed,
  renderAuthPanel
} from './auth'
import * as ls from '../common/ls'
import _ from 'lodash'
import {
  findMatchContacts,
  searchContacts,
  getContacts,
  hideContactInfoPanel,
  showContactInfoPanel
} from './contacts'
import {showActivityDetail, getActivities} from './activities'
import {syncCallLogToThirdParty} from './call-log-sync'
import {getUserId} from '../config'
import {lsKeys} from '../common/helpers'

window.rc = {
  local: {
    apiKey: null
  },
  postMessage: data => {
    document.querySelector('#rc-widget-adapter-frame')
      .contentWindow
      .postMessage(data, '*')
  },
  currentUserId: '',
  rcLogined: false,
  cacheKey: 'contacts' + '_' + '',
  updateToken: async (newToken, type = 'apiKey') => {
    if (!newToken){
      await ls.clear()
      window.rc.local = {
        apiKey: null
      }
    } else if (_.isString(newToken)) {
      window.rc.local[type] = newToken
      let key = lsKeys[`${type}LSKey`]
      await ls.set(key, newToken)
    } else {
      Object.assign(window.rc.local, newToken)
      let ext = Object.keys(newToken)
        .reduce((prev, key) => {
          prev[lsKeys[`${key}LSKey`]] = newToken[key]
          return prev
        }, {})
      await ls.set(ext)
    }
  }
}

let {
  serviceName
} = thirdPartyConfigs

/**
 * handle ringcentral widgets contacts list events
 * @param {Event} e
 */
async function handleRCEvents(e) {
  let {data} = e
  if (!data) {
    return
  }
  let {type, loggedIn, path, call} = data
  if (type ===  'rc-login-status-notify') {
    console.log('rc logined', loggedIn)
    window.rc.rcLogined = loggedIn
  }
  if (
    type === 'rc-route-changed-notify' &&
    path === '/contacts' &&
    !window.rc.local.apiKey
  ) {
    showAuthBtn()
  } else if (
    type === 'rc-active-call-notify' ||
    type === 'rc-call-start-notify'
  ) {
    showContactInfoPanel(call)
  } else if ('rc-call-end-notify' === type) {
    hideContactInfoPanel()
  }
  if (type !== 'rc-post-message-request') {
    return
  }

  let {rc} = window

  if (data.path === '/authorize') {
    if (rc.local.apiKey) {
      unAuth()
    } else {
      doAuth()
    }
    rc.postMessage({
      type: 'rc-post-message-response',
      responseId: data.requestId,
      response: { data: 'ok' }
    })
  }
  else if (path === '/contacts') {
    let contacts = await getContacts()
    rc.postMessage({
      type: 'rc-post-message-response',
      responseId: data.requestId,
      response: {
        data: contacts,
        nextPage: null
      }
    })
  }
  else if (path === '/contacts/search') {
    let contacts = await getContacts()
    let keyword = _.get(data, 'body.searchString')
    if (keyword) {
      contacts = searchContacts(contacts, keyword)
    }
    rc.postMessage({
      type: 'rc-post-message-response',
      responseId: data.requestId,
      response: {
        data: contacts
      }
    })
  }
  else if (path === '/contacts/match') {
    let contacts = await getContacts()
    let phoneNumbers = _.get(data, 'body.phoneNumbers') || []
    let res = findMatchContacts(contacts, phoneNumbers)
    rc.postMessage({
      type: 'rc-post-message-response',
      responseId: data.requestId,
      response: {
        data: res
      }
    })
  }
  else if (path === '/callLogger') {
    // add your codes here to log call to your service
    syncCallLogToThirdParty(data.body)
    // response to widget
    rc.postMessage({
      type: 'rc-post-message-response',
      responseId: data.requestId,
      response: { data: 'ok' }
    })
  }
  else if (path === '/activities') {
    const activities = await getActivities(data.body)
    /*
    [
      {
        id: '123',
        subject: 'Title',
        time: 1528854702472
      }
    ]
    */
    // response to widget
    rc.postMessage({
      type: 'rc-post-message-response',
      responseId: data.requestId,
      response: { data: activities }
    })
  }
  else if (path === '/activity') {
    // response to widget
    showActivityDetail(data.body)
    rc.postMessage({
      type: 'rc-post-message-response',
      responseId: data.requestId,
      response: { data: 'ok' }
    })
  }
}


export default async function initThirdPartyApi () {

  //register service to rc-widgets

  window.rc.postMessage({
    type: 'rc-adapter-register-third-party-service',
    service: {
      name: serviceName,

      // show contacts in ringcentral widgets
      contactsPath: '/contacts',
      contactSearchPath: '/contacts/search',
      contactMatchPath: '/contacts/match',

      // show auth/auauth button in ringcentral widgets
      authorizationPath: '/authorize',
      authorizedTitle: 'Unauthorize',
      unauthorizedTitle: 'Authorize',
      authorized: false,

      // Enable call log sync feature
      callLoggerPath: '/callLogger',
      callLoggerTitle: `Log to ${serviceName}`,

      // show contact activities in ringcentral widgets
      activitiesPath: '/activities',
      activityPath: '/activity'

    }
  })

  // init
  let userId = getUserId()
  window.rc.currentUserId = userId
  window.rc.cacheKey = 'contacts' + '_' + userId,
  window.addEventListener('message', handleRCEvents)

  // try to get api key from chrome storage
  let apiKey = await ls.get(lsKeys.apiKeyLSKey) || null
  window.rc.local = {
    apiKey
  }

  //get the html ready
  renderAuthPanel()
  renderAuthButton()

  if (window.rc.local.apiKey) {
    notifyRCAuthed()
  }

}

