import { stringify } from 'qs'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { useLocation } from 'react-router-dom'
import { LocationDescriptor } from 'history'
import { SupportedLocale } from 'constants/locales'
import { useActiveLocale } from './useActiveLocale'
import { useMemo } from 'react'

export function useLocationLinkProps(locale: SupportedLocale | null): {
  to?: LocationDescriptor
  onClick?: () => void
} {
  const location = useLocation()
  const qs = useParsedQueryString()
  const activeLocale = useActiveLocale()

  return useMemo(
    () =>
      !locale
        ? {}
        : {
            to: {
              ...location,
              search: stringify({ ...qs, lng: locale }),
            },
            onClick: () => {
              console.log()
            },
          },
    [location, qs, activeLocale, locale]
  )
}
