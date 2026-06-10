export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  window.gtag('event', eventName, params)
}

export const trackDemoRequestClick = (location) => {
  trackEvent('demo_request_click', {
    link_location: location,
  })
}

export const trackDemoRequestSubmit = () => {
  trackEvent('demo_request_submit')
}

export const trackScreenshotOpen = ({ id, title }) => {
  trackEvent('screenshot_open', {
    screenshot_id: id,
    screenshot_title: title,
  })
}
