import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() createSearchDto: CreateSearchDto) {
    return await this.searchService.search(createSearchDto);
  }
}
