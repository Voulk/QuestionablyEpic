import ReactGA from "react-ga";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  ReactGA.initialize("UA-90234903-1");
}

export const trackPageView = (url: string) => {
  if (isProd) {
    ReactGA.pageview(url);
  }
};