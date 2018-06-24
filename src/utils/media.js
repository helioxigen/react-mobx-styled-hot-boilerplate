import { css } from "styled-components"

export default {
    landscape: (...styles) => css`
        @media only screen and (min-aspect-ratio: 1/1), (orientation: landscape) {
            ${css(...styles)}
        }
    `,
    desktop: (...styles) => css`
        @media only screen and (min-aspect-ratio: 6/8) {
            ${css(...styles)}
        }
    `,
    mobile: (...styles) => css`
        @media only screen and (max-aspect-ratio: 6/8) {
            ${css(...styles)}
        }
    `,
}
