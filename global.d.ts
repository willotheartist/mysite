/// <reference types="react" />
/// <reference types="react-dom" />

import type React from "react";

declare global {
  namespace JSX {
    // Reuse React's built-in IntrinsicElements so <div>, <section>, etc. work
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}

    // Keep JSX element typing aligned with the react-jsx runtime
    interface Element extends React.JSX.Element {}
    interface ElementClass extends React.JSX.ElementClass {}
    interface ElementAttributesProperty
      extends React.JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute
      extends React.JSX.ElementChildrenAttribute {}
  }
}

export {};
