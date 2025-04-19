import { ProviderService } from '@/modules/provider/provider.service';
import { Anime3rbProvider  } from '@/providers/anime3rb/anime3rb.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [ProviderService],
  exports: [ProviderService],
})
export class ProviderModule {}

export const Providers = [Anime3rbProvider ];
