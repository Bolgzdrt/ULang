import Vue from 'vue'

export const languages = [
  'french',
  'spanish',
  'italian',
  'german',
  'portuguese',
  'swedish',
  'dutch',
  'romanian'
]

export const getInitials = ({ firstName, lastName, username }) => {
  if (firstName && lastName) {
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
  } else if (username) {
    return username[0].toUpperCase()
  }
  return ''
}

export const getName = (data) => {
  const { firstName, lastName, username } = data
  let name = ''
  if (firstName) {
    if (lastName) {
      name = `${firstName} ${lastName}`
    } else {
      name = firstName
    }
  } else {
    name = username
  }
  return name
}

export const checkIfEmail = (email) => {
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  return regex.test(email)
}

export const checkIfValidPassword = (password) => {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
  return regex.test(password)
}

export const updateRecentList = (event, setId, setting=-1) => {
  const currentUserId = Vue.$cookies.get('userId')
  const newEvent = {
    event,
    setId,
    setting,
    userId: currentUserId
  }
  let recentList = JSON.parse(window.localStorage.getItem('recentList')) || []
  
  if (recentList.length < 4) {
    const sameItems = recentList.filter(item => {
      if (
        item.event  === event 
        && item.setId === setId 
        && item.setting === setting
      ) {
        return item
      }
    })
    if (!sameItems.length) {
      recentList.push(newEvent)
    }
  } else {
    recentList.shift()
    recentList.push(newEvent)
  }
  window.localStorage.setItem('recentList', JSON.stringify(recentList))
}

export const getRecentList = () => {
  let recentList = JSON.parse(window.localStorage.getItem('recentList')) || []

  // If the current "recentList" items belong to another user, empty the list
  const currentUserId = Vue.$cookies.get('userId')
  for (let item of recentList) {
    if (item.userId !== currentUserId) {
      window.localStorage.removeItem('recentList')
      window.localStorage.setItem('recentList', JSON.stringify([]))
      recentList = []
      break
    }
  }
  return recentList
}

Vue.directive('click-outside', {
  bind: function(el, binding, vnode) {
    el.eventSetDrag = function() {
      el.setAttribute('data-dragging', 'yes')
    }
    el.eventClearDrag = function() {
      el.removeAttribute('data-dragging')
    }
    el.eventOnClick = function(event) {
      let dragging = el.getAttribute('data-dragging')
      // Check that the click was outside the el and its children, and wasn't a drag
      if (!(el == event.target || el.contains(event.target)) && !dragging) {
        // call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.addEventListener('touchstart', el.eventClearDrag)
    document.addEventListener('touchmove', el.eventSetDrag)
    document.addEventListener('click', el.eventOnClick)
    document.addEventListener('touchend', el.eventOnClick)
  },
  unbind: function(el) {
    document.removeEventListener('touchstart', el.eventClearDrag)
    document.removeEventListener('touchmove', el.eventSetDrag)
    document.removeEventListener('click', el.eventOnClick)
    document.removeEventListener('touchend', el.eventOnClick)
    el.removeAttribute('data-dragging')
  }
})
