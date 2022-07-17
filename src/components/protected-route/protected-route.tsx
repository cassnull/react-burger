import { Redirect, Route } from 'react-router-dom'
import { ReactNode } from 'react'
import { useSelector } from '../../services/hooks'

type TProp = {
  children: ReactNode
  path: string
  exact?: boolean
}

export const ProtectedRoute = ({ children, ...rest }: TProp) => {
  const { user } = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.name ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
