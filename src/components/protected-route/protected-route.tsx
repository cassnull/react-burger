import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useSelector } from '../../services/hooks'

type TProps = {
  component: React.Component | React.FC
} & RouteProps

export const ProtectedRoute = ({ component, ...rest }: TProps) => {
  const { user } = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      render={(props) =>
        user?.name ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}
