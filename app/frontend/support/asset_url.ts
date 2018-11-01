const assetUrl = (name: string): string => {
  console.dir(window)
  const url = window.DecidimMap.assets[name];

  if (!url) {
    throw new Error(`Asset "${name}" can't be found on decidim map manifest.`);
  }

  return url;
};

export default assetUrl;
