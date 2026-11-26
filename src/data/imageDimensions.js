// Natural dimensions of the local images used across the site.
// Passing width/height to <img> lets the browser reserve space before the
// image loads, which improves layout stability without changing any content.
const DIMENSIONS = {
  '/RRvVSLogo_result.webp': [2000, 2000],
  '/photo-1486406146926-c627a92ad1ab_result.webp': [2070, 1380],
  '/V4Sback_result.webp': [1024, 559],
  '/6140a93d-2584-4ba5-93e6-aee4393cd2c2_result.webp': [1792, 2398],
  '/istockphoto-1508453163-612x612_result.webp': [612, 344],
  '/Security Escort_result.webp': [900, 470],
  '/6e4ba378-4f08-4fe7-be98-99aa4908b7ba_result.webp': [1024, 1024],
  '/photo-1601597111158-2fceff292cdc_result.webp': [800, 533],
  '/images (9)_result.webp': [729, 421],
  '/download_result.webp': [800, 533],
  '/fullbory_result.webp': [1122, 1402],
  '/chest1_result.webp': [1122, 1402],
  '/shoulder1_result.webp': [1024, 765],
  '/cap-real_result.webp': [1083, 1452],
};

export function imageSize(src) {
  const size = DIMENSIONS[src];
  return size ? { width: size[0], height: size[1] } : {};
}
