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

export const getInitials = (data) => {
  const { firstName, lastName, username } = data
  let initials
  if (firstName && lastName) {
    initials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
  } else {
    initials = username[0].toUpperCase()
  }
  return initials
}

export const arrayCompare = (_arr1, _arr2) => {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
  ) {
    return false
  }

  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort()
  const arr2 = _arr2.concat().sort()

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}

export const checkIfEmail = (email) => {
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  return regex.test(email)
}

export const checkIfValidPassword = (password) => {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
  return regex.test(password)
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
