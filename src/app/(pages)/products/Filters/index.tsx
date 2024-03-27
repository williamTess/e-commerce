'use client'

import React from 'react'

import { Category } from '../../../../payload/payload-types'
import { Checkbox } from '../../../_components/Checkbox'
import { HR } from '../../../_components/HR'
import { RadioButton } from '../../../_components/Radio'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

type FilterProps = {
  categories: Category[]
  categoriesCards: 'normal' | 'brand' | 'both' | 'mixed'
}

export const Filters = ({ categories, categoriesCards }: FilterProps) => {
  const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter()
  const filteredCategories = getCategories(categories, categoriesCards)

  const handleCategories = (categoryId: string) => {
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter(id => id !== categoryId)

      setCategoryFilters(updatedCategories)
    } else {
      setCategoryFilters([...categoryFilters, categoryId])
    }
  }

  const handleSort = (value: string) => setSort(value)

  return (
    <div className={classes.filters}>
      <div>
        <h6 className={classes.title}>
          {categoriesCards === 'brand' ? 'Product Brands' : 'Product Categories'}
        </h6>
        <div className={classes.categories}>
          {filteredCategories.map(category => {
            const isSelected = categoryFilters.includes(category.id)

            return (
              <Checkbox
                key={category.id}
                label={category.title}
                value={category.id}
                isSelected={isSelected}
                onClickHandler={handleCategories}
              />
            )
          })}
        </div>
        <HR className={classes.hr} />
        {categoriesCards === 'both' && (
          <>
            <h6 className={classes.title}>Product Brands</h6>
            <div className={classes.categories}>
              {categories
                .filter(cat => cat.isBrand)
                .map(category => {
                  const isSelected = categoryFilters.includes(category.id)

                  return (
                    <Checkbox
                      key={category.id}
                      label={category.title}
                      value={category.id}
                      isSelected={isSelected}
                      onClickHandler={handleCategories}
                    />
                  )
                })}
            </div>
            <HR className={classes.hr} />
          </>
        )}
        <h6 className={classes.title}>Sort By</h6>
        <div className={classes.categories}>
          <RadioButton
            label="Latest"
            value="-createdAt"
            isSelected={sort === '-createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
          <RadioButton
            label="Oldest"
            value="createdAt"
            isSelected={sort === 'createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
        </div>
      </div>
    </div>
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
