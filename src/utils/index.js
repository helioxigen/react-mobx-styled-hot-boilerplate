export { default as media } from "utils/media"

export const switchDev = (prod, dev) => (process.env.NODE_ENV === "development" ? dev : prod)

export const preload = handler => {
    const fileContext = require.context("../components", true, /\.png$/)
    const files = fileContext.keys()

    let loaded = 0

    const load = key => {
        const img = new Image()
        img.src = fileContext(key)

        img.addEventListener("load", () => {
            if (img.complete) {
                loaded += 1
                handler(Math.ceil((loaded / files.length) * 100))
            } else {
                load(key)
            }
        })
    }

    files.forEach(load)
}

export const nextInArray = (arr = [], forward = true) => (el = "") => {
    const idx = arr.indexOf(el)
    const lastIdx = arr.length - 1

    const isLast = idx === (forward ? lastIdx : 0)
    const arrBounds = forward ? 0 : lastIdx

    const nextIdx = isLast ? arrBounds : idx + (forward ? 1 : -1)

    return arr[nextIdx]
}

export const getRandomItem = list => list[Math.floor(Math.random() * list.length)]

export const getQueryParam = name => {
    const regex = new RegExp(`[?&]${name.replace(/[[\]]/g, "\\$&")}(=([^&#]*)|&|#|$)`)
    const results = regex.exec(window.location.href)

    if (!results || !results[2]) return ""

    return decodeURIComponent(results[2].replace(/\+/g, " "))
}
