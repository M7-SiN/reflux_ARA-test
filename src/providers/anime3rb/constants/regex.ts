export const RAW_REGEX = /(.*)<a\s*href=".*"\s*target=".*">/g;
export const TITLE_REGEX_1 = /^(.+?)(?:\s*\([^)]*\))(?=\s+-\s*|$)/;
export const TITLE_REGEX_2 = /^(.+?)(?:\s*\([^)]*\))?(?=\s+-\s*|$)/;

export const AUDIO_REGEX =
  /\s\((Dubbed|Subtitled|Original|Mute)\)\s[-]?/;

export const AUDIO_URL_REGEX =
  /.*<a\s*href=".*-(dubbed|subtitled|original|mute)(?:-)?.*"\s*target=".*">/;

export const QUALITY_REGEX =
  /[-]?\s(180p|480p|720p|1080p|2160p\s\(4K\))\s[-]?/;

export const QUALITY_URL_REGEX =
  /.*<a\s*href=".*-(180p|480p|720p|1080p|2160p-4k)(?:-)?.*"\s*target=".*">/;

export const URL_REGEX = /.*<a\s*href="(.*)"\s*target=".*">/;

export const AUDIO_DUBBED_REGEX = /(dubbed)/i;
export const AUDIO_SUBTITLED_REGEX = /(subtitled)/i;
export const AUDIO_MUTED_REGEX = /(mute)/i;
export const AUDIO_ORIGINAL_REGEX = /(original)/i;

export const QUALITY_SD_REGEX = /(480p)/i;
export const QUALITY_HD_REGEX = /(720p)/i;
export const QUALITY_FHD_REGEX = /(1080p)/i;
export const QUALITY_UHD_REGEX = /(2160p\s\(4K\)|2160p-4k)/i;

export const EPISODE_TITLE_REGEX =
  /(?:episode\s*\d+\s*-\s*)?(.*?)(?=\s*-\s*)/i;
