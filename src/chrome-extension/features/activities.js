/**
 * third party activies related feature
 */

import {
  notify
} from '../common/helpers'

import extLinkSvg from '../common/link-external.svg'

/**
 * todo:
 * when user click conatct activity item, show activity detail
 * @param {object} body
 */
export function showActivityDetail(body) {
  console.log(body)
  let {activity = {}} = body
  let {
    subject,
    url
  } = activity
  let msg = `
    <div>
      <div class="rc-pd1b">
        <a href="${url}">
          <b>
            Subject: ${subject}
            <img width=16 height=16 src="${extLinkSvg}" />
          </b>
        </a>
      </div>
    </div>
  `
  notify(msg, 'info', 8000)
}

/**
 * todo
 * method to get contact activities from CRM site
 * @param {*} body
 */
export async function getActivities(body) {
  console.log(body)
  return []
  /* should return array:
  [
    {
      id: '123',
      subject: 'Title',
      time: 1528854702472
    }
  ]
  */
}

