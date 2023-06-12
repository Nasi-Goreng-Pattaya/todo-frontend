const PrivateRoute = ({ outlet, authenticationElement } :{ outlet: JSX.Element, authenticationElement: JSX.Element }) => {
    const isAuthenticated = localStorage.getItem('user') !== null
    if (!isAuthenticated)
        return authenticationElement
    return outlet
}

export default PrivateRoute
