export const getIconURL = (icon) => {
  if (!icon) {
    return null;
  }

  icon = icon.replace(".jpg", "").replace(/-/g, "");
  const baseURL = `//render-us.worldofwarcraft.com/icons/56`;
  const localPath = `src/Images/CooldownPlanner/BossAbilities`;

  try {
    // Try to return local image
    return require(`${localPath}/${icon}.jpg`).default;
  } catch (e) {
    // If local image load fails, return external URL
    const fullURL = `${baseURL}/${icon}.jpg`;
    return fullURL;
  }
};
