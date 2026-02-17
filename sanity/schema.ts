import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import category from './schemas/category'
import post from './schemas/post'
import author from './schemas/author'
import job from './schemas/job'
import project from './schemas/project'
import resource from './schemas/resource'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [post, author, category, job, project, resource, blockContent],
}
