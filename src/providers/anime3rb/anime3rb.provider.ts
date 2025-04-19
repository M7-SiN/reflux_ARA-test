import { NlpProcessingService } from '@/modules/nlp/services/processing.service';
import { NlpQueriesService } from '@/modules/nlp/services/queries.service';
import { PrismaRepository } from '@/modules/prisma/prisma.repository';
import { ProviderService } from '@/modules/provider/provider.service';
import { TrendingService } from '@/modules/trending/trending.service';
import { Anime3rbClient } from '@/providers/anime3rb/anime3rb.client';
import { Anime3rbData } from '@/providers/anime3rb/anime3rb.data';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class Anime3rbProvider implements OnModuleInit {
  public readonly client = new Anime3rbClient(
    this.prismaRepository,
    this.trendingService,
    this.nlpProcessingService,
  );
  public readonly data = new Anime3rbData(this.client);

  public constructor(
    public readonly prismaRepository: PrismaRepository,
    public readonly providerService: ProviderService,
    public readonly trendingService: TrendingService,
    public readonly nlpProcessingService: NlpProcessingService,
    public readonly nlpQueriesService: NlpQueriesService,
  ) {}

  public onModuleInit(): void {
    this.providerService.inject(this.client);
  }
}
