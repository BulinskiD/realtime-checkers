import { css } from 'styled-components'
const sizes = {
    big: 1200,
    medium: 1000,
    small: 600,
    extraSmall: 400
}
export default Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}px) {
         ${css(...args)};
      }
   `
    return acc
}, {})