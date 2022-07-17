import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

export const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state.auth)
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

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired,
  rest: PropTypes.object,
}