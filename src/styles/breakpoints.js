// `rem` and `em` sizing units are not affected by root font size in media query
// expressions. ie. they both effectively perform the same function when applied
// in this situation.
//
// However, using `em` is preferable inside media query constraints, due to
// Safari handling `rem` based media queries incorrectly for non-standard
// browser font sizes. Dividing a pixel value by 16 (default browser font size
// in pixels) allows us to convert breakpoints from `px` into `em`, with 1em
// equal to 16px.
//
// Using a relative unit in media queries allows breakpoints to scale
// adaptively, ensuring layouts don't break in situations where the end user is
// using a non-default browser font size.

export const breakpoints = {
  // All units converted to em from px
  xs: 25, // 400px
  sm: 37.5, // 600px
  md: 60, // 960px
  lg: 80, // 1280px
  xl: 98.75, // 1580px
};
