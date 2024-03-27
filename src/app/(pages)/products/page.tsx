import React from 'react'
import { draftMode } from 'next/headers'

import { Category, Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import { Promotion } from '../../_components/Promotion'
import { Filters } from './Filters'

import classes from './index.module.scss'

const Products = async () => {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'products',
      draft: isDraftMode,
    })

    categories = await fetchDocs<Category>('categories')
  } catch (error) {
    // console.log(error)
  }

  const { promotionDate, promotionContent, promotionImage, categoriesCards } = page

  return (
    <div className={classes.container}>
      <Gutter className={classes.products}>
        <Filters categories={categories} categoriesCards={categoriesCards} />
        <Blocks blocks={page?.layout} disableTopPadding={true} />
      </Gutter>
      <Gutter className={classes.promo}>
        <Promotion
          promotionDate={promotionDate}
          promotionContent={promotionContent}
          promotionImage={promotionImage}
        />
      </Gutter>
      <HR />
    </div>
  )
}

export default Products
