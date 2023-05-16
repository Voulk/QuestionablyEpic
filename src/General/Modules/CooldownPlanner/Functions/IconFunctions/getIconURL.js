export const getIconURL = (icon) => {
  if (!icon) {
    return null;
  }

  icon = icon.replace(".jpg", "").replace(/-/g, "");

  try {
    // Attempt to load local image
    return require(`src/Images/CooldownPlanner/BossAbilities/${icon}.jpg`);
  } catch {
    // If local image load fails, return remote URL
    const baseURL = `//render-us.worldofwarcraft.com/icons/56`;
    const fullURL = `${baseURL}/${icon}.jpg`;
    return fullURL;
  }
};
