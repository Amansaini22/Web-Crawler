import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { CrawlerRepository } from '../../crawler.repository';
import { Crawler } from '../../../../domain/crawler';
import {
  FilterCrawlerDto,
  QueryCrawlerDto,
  SortCrawlerDto,
} from '../../../../dto/query-crawler.dto';
import { CrawlerSchemaClass } from '../entities/crawler.schema';
import { CrawlerMapper } from '../mappers/crawler.mapper';

@Injectable()
export class CrawlerDocumentRepository implements CrawlerRepository {
  constructor(
    @InjectModel(CrawlerSchemaClass.name)
    private readonly crawlerModel: Model<CrawlerSchemaClass>,
  ) {}

  async create(data: Crawler): Promise<Crawler> {
    const persistenceModel = CrawlerMapper.toPersistence(data);
    const createdCrawler = new this.crawlerModel(persistenceModel);
    const crawlerObject = await createdCrawler.save();
    return CrawlerMapper.toDomain(crawlerObject);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCrawlerDto | null;
    sortOptions?: SortCrawlerDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Crawler[]> {
    const where: FilterQuery<CrawlerSchemaClass> = {};

    if (filterOptions?.domain) {
      where['domain'] = filterOptions.domain;
    }

    if (filterOptions?.isActive !== undefined) {
      where['isActive'] = filterOptions.isActive;
    }

    const crawlerObjects = await this.crawlerModel
      .find(where)
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return crawlerObjects.map((crawlerObject) =>
      CrawlerMapper.toDomain(crawlerObject),
    );
  }

  async findById(id: Crawler['id']): Promise<NullableType<Crawler>> {
    const crawlerObject = await this.crawlerModel.findById(id);
    return crawlerObject ? CrawlerMapper.toDomain(crawlerObject) : null;
  }

  async findOne(query: FilterCrawlerDto): Promise<NullableType<Crawler>> {
    const crawlerObject = await this.crawlerModel.findOne(query);
    return crawlerObject ? CrawlerMapper.toDomain(crawlerObject) : null;
  }

  async findByIds(ids: Crawler['id'][]): Promise<Crawler[]> {
    const crawlerObjects = await this.crawlerModel.find({
      _id: { $in: ids },
    });
    return crawlerObjects.map((crawlerObject) =>
      CrawlerMapper.toDomain(crawlerObject),
    );
  }

  async update(
    id: Crawler['id'],
    payload: Partial<Crawler>,
  ): Promise<Crawler | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    const filter = { _id: new Types.ObjectId(id) };
    const existingCrawler = await this.crawlerModel.findOne(filter);

    if (!existingCrawler) {
      return null;
    }

    const updatedPayload = {
      ...CrawlerMapper.toDomain(existingCrawler),
      ...payload,
    };

    const updatedCrawler = await this.crawlerModel.findOneAndUpdate(
      filter,
      CrawlerMapper.toPersistence(updatedPayload),
      { new: true },
    );

    return updatedCrawler ? CrawlerMapper.toDomain(updatedCrawler) : null;
  }

  async remove(id: Crawler['id']): Promise<void> {
    await this.crawlerModel.deleteOne({
      _id: id.toString(),
    });
  }

  async activate(id: Crawler['id']): Promise<Crawler | null> {
    const crawlerObject = await this.crawlerModel.findOneAndUpdate(
      { _id: id.toString() },
      { isActive: true },
      { new: true },
    );
    return crawlerObject ? CrawlerMapper.toDomain(crawlerObject) : null;
  }

  async deactivate(id: Crawler['id']): Promise<Crawler | null> {
    const crawlerObject = await this.crawlerModel.findOneAndUpdate(
      { _id: id.toString() },
      { isActive: false },
      { new: true },
    );
    return crawlerObject ? CrawlerMapper.toDomain(crawlerObject) : null;
  }
}
