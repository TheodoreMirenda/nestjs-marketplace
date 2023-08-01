import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Category, CategorySelect } from './model';
import { CategoryArgs, CategoryCreateInput } from './dto';
import { CategoryService } from './category.service';
import { GraphQLFields, IGraphQLFields } from '../../shared/decorators';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => Category,{nullable:true})
  public async category(
    @Args() args: CategoryArgs,
    @GraphQLFields() { fields }: IGraphQLFields<CategorySelect>,
  ): Promise<Category | null> {
    return this.categoryService.findOne(args, fields);
  }

  @Mutation(() => Category)
  public async createCategory(
    @Args('data') data: CategoryCreateInput,
    @GraphQLFields() { fields }: IGraphQLFields<CategorySelect>,
  ): Promise<Category> {
    return this.categoryService.create(data, fields);
  }
}
