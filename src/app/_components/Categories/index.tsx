import React from 'react'
import Link from 'next/link'

import { Category } from '../../../payload/payload-types'
import { CategoryCard } from './CategoryCard'

import classes from './index.module.scss'

type CategoryProps = {
  categories: Category[]
  title?: string
}

type CategorySectionProps = {
  categories: Category[]
  categoriesCards: 'normal' | 'brand' | 'both' | 'mixed'
}

export const CategoriesSections = ({ categories, categoriesCards }: CategorySectionProps) => {
  const filteredCategories = getCategories(categories, categoriesCards)
  return (
    <>
      <Categories
        categories={filteredCategories}
        title={categoriesCards === 'brand' ? 'Shop by brands' : 'Shop by categories'}
      />
      {categoriesCards === 'both' && (
        <Categories
          categories={categories.filter(cat => cat.isBrand === true)}
          title={'Shop by brands'}
        />
      )}
    </>
  )
}

const Categories = ({ categories, title = 'Shop by Categories' }: CategoryProps) => {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>{title}</h3>
        <Link href="/products">Show All</Link>
      </div>

      <div className={classes.list}>
        {categories.map(category => {
          return <CategoryCard key={category.id} category={category} />
        })}
      </div>
    </section>
  )
}

const getCategories = (
  categories: Category[],
  categoryCards: 'normal' | 'brand' | 'both' | 'mixed',
) => {
  switch (categoryCards) {
    case 'normal':
      return categories.filter(cat => cat.isBrand === false)
    case 'brand':
      return categories.filter(cat => cat.isBrand === true)
    case 'both':
      return categories.filter(cat => cat.isBrand === false)
    default:
      return categories
  }
}
