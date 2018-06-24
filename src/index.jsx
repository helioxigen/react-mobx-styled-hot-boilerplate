import React from "react"
import ReactDOM from "react-dom"
import { injectGlobal } from "styled-components"
import { normalize } from "polished"

import { enableLogging } from "mobx-logger"
import { Provider } from "mobx-react"
import App from "./App"

import store from "./store"

injectGlobal`
    ${normalize()};
`

const debug = process.env.NODE_ENV === "development"

debug && enableLogging()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app"),
)
