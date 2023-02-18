// set theme color in meta tag
export const setThemeColor = (color) => {
  const MetaTag = document.querySelector('meta[name="theme-color"]');
  const oldColor = MetaTag.getAttribute("content");
  MetaTag.setAttribute("content", color);
  return oldColor;
};

// set theme color to default #fff
export const setThemeColorToDefault = () => {
  setThemeColor("#fff");
};

export const getMediaMirrorURL = (url) => {
  try {
    if (url.includes("https://media.forgecdn.net/avatars")) {
      let route = url.replace("https://media.forgecdn.net/avatars", "");
      return `https://api.daidr.me/apis/cfimage?url=${btoa(route)}`;
    } else {
      return url;
    }
  } catch (e) {
    return url;
  }
};
