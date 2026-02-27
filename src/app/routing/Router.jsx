import { useEffect, useState } from 'react'
const MatchPath = (pasth, route) => {
  const pasthParts = pasth.split('/')
  const routeParts = route.split('/')

  if (routeParts.length !== pasthParts.length) {
    return null
  }

  const params = {}

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      const paramName = routeParts[i].slice(1)
      params[paramName] = pasthParts[i]
    } else if (routeParts[i] !== pasthParts[i]) {
      return null
    }
  }
  return params
}

export const useRoute = () => {
  const [pasth, setPasth] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setPasth(window.location.pathname)
    }
    window.addEventListener('popstate', onLocationChange)

    return () => window.removeEventListener('popstate', onLocationChange)
  }, [])

  return pasth
}

const Router = (props) => {
  const { routes } = props
  const pasth = useRoute()
  for (const route in routes) {
    const params = MatchPath(pasth, route)
    if (params) {
      const Page = routes[route]
      return <Page params={params} />
    }
  }
  const NotFound = routes['*']
  return <NotFound />
}

export default Router
