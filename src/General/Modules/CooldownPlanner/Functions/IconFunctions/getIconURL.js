export const getIconURL = (icon) => {
  if (!icon) {
    return null;
  }

  icon = icon.replace(".jpg", "").replace(/-/g, "");
  const baseURL = `//render-us.worldofwarcraft.com/icons/56`;
  const fullURL = `${baseURL}/${icon}.jpg`;

  return fullURL;
};
