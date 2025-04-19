import { Data, Output } from '@/classes/provider/data';
import { Audio } from '@/enums/audio';
import { Media } from '@/enums/media';
import { Quality } from '@/enums/quality';
import {
  AUDIO_DUBBED_REGEX,
  AUDIO_MUTED_REGEX,
  AUDIO_REGEX,
  AUDIO_SUBTITLED_REGEX,
  AUDIO_URL_REGEX,
  QUALITY_FHD_REGEX,
  QUALITY_HD_REGEX,
  QUALITY_REGEX,
  QUALITY_SD_REGEX,
  QUALITY_UHD_REGEX,
  QUALITY_URL_REGEX,
  RAW_REGEX,
  TITLE_REGEX_1,
  TITLE_REGEX_2,
  URL_REGEX,
} from '@/providers/anime3rb/constants/regex'; // updated path
import { ANIME_URL } from '@/providers/anime3rb/constants/url'; // updated path
import { Anime3rbClient } from '@/providers/anime3rb/anime3rb.client'; // updated client
import { match, matches } from '@/utils/regex';

export class Anime3rbData extends Data {
  public readonly output: Output[] = [];

  public constructor(public readonly client: Anime3rbClient) {
    super(client);
  }

  public async build(): Promise<void> {
    const animeList = await this.get(ANIME_URL);

    const animeData = animeList.map(this.sanitize.bind(this, Media.TV));
    const formattedData = animeData.map(this.format);

    Object.assign(this.output, formattedData);
  }

  private async get(url: string): Promise<string[]> {
    const { data } = await this.client.api.get(url);
    const indexes: string[] = data.match(RAW_REGEX) ?? [];

    return indexes;
  }

  private sanitize(type: Media, content: string) {
    const url = match(content, URL_REGEX);
    const title =
      match(content, TITLE_REGEX_1) ?? match(content, TITLE_REGEX_2);
    const audio =
      match(content, AUDIO_REGEX) ??
      match(content, AUDIO_URL_REGEX) ??
      Audio.UNKNOWN;
    const quality =
      match(content, QUALITY_REGEX) ??
      match(content, QUALITY_URL_REGEX) ??
      Quality.UNKNOWN;

    return { type, url, title, audio, quality };
  }

  private format(output: Output): Output {
    const audios = {
      DUBBED: AUDIO_DUBBED_REGEX,
      SUBTITLED: AUDIO_SUBTITLED_REGEX,
      MUTED: AUDIO_MUTED_REGEX,
    };

    const qualities = {
      SD: QUALITY_SD_REGEX,
      HD: QUALITY_HD_REGEX,
      FHD: QUALITY_FHD_REGEX,
      UHD: QUALITY_UHD_REGEX,
    };

    const audio = (matches(output.audio, audios) ?? Audio.UNKNOWN) as Audio;
    const quality = (matches(output.quality, qualities) ?? Quality.UNKNOWN) as Quality;

    return { ...output, audio, quality };
  }
}
