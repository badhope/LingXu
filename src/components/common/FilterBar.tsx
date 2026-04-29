'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './FilterBar.module.scss'

interface FilterKeyConfig<T> {
  key: keyof T
  label: string
  allLabel?: string
}

interface FilterBarOptions<T> {
  searchKeys: (keyof T | string)[]
  filterKeys?: Record<string, string[]>
  filterOptions?: FilterKeyConfig<T>[]
  sortOptions?: {
    key: keyof T | string | ((a: T, b: T) => number)
    label: string
  }[]
}

interface NewFilterBarProps<T> {
  data: T[]
  options: FilterBarOptions<T>
  onFiltered: (filtered: T[]) => void
  placeholder?: string
}

interface LegacyFilterBarProps<T> {
  data: T[]
  searchKeys?: (keyof T | string)[]
  filterOptions?: FilterKeyConfig<T>[]
  filters?: FilterBarOptions<T>
  onFiltered?: (filtered: T[]) => void
  onFilter?: (filtered: T[]) => void
  placeholder?: string
}

type FilterBarProps<T> = NewFilterBarProps<T> | LegacyFilterBarProps<T>

function isNewProps<T>(props: FilterBarProps<T>): props is NewFilterBarProps<T> {
  return 'options' in props
}

export default function FilterBar<T extends Record<string, any>>(_props: FilterBarProps<T>) {
  const props = isNewProps(_props)
    ? _props
    : {
        data: _props.data,
        options: _props.filters || {
          searchKeys: _props.searchKeys || [],
          filterOptions: _props.filterOptions,
        },
        onFiltered: _props.onFiltered || _props.onFilter || (() => {}),
        placeholder: _props.placeholder,
      }

  const { data, options, onFiltered, placeholder = '输入关键词搜索...' } = props
  const { searchKeys, filterKeys, filterOptions, sortOptions } = options

  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [sortKey, setSortKey] = useState<string>('__default__')

  const onFilteredRef = useRef(onFiltered)
  onFilteredRef.current = onFiltered

  useEffect(() => {
    let result = [...data]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(item =>
        searchKeys.some(key => {
          const value = item[key as keyof T]
          if (Array.isArray(value)) {
            return value.some((v: unknown) => String(v).toLowerCase().includes(term))
          }
          return String(value).toLowerCase().includes(term)
        })
      )
    }

    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && value !== '__all__') {
        result = result.filter(item => {
          const itemValue = item[key as keyof T]
          if (Array.isArray(itemValue)) {
            return itemValue.includes(value)
          }
          return String(itemValue) === value
        })
      }
    })

    if (sortKey && sortKey !== '__default__') {
      const sortOption = sortOptions?.find(s => s.label === sortKey || String(s.key) === sortKey)
      if (sortOption) {
        if (typeof sortOption.key === 'function') {
          result.sort(sortOption.key)
        } else {
          result.sort((a, b) => {
            const aVal = a[sortOption.key as keyof T]
            const bVal = b[sortOption.key as keyof T]
            if (typeof aVal === 'number' && typeof bVal === 'number') {
              return bVal - aVal
            }
            return String(aVal).localeCompare(String(bVal), 'zh-CN')
          })
        }
      }
    }

    onFilteredRef.current(result)
  }, [searchTerm, activeFilters, sortKey, data, searchKeys, sortOptions])

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className={styles.filterBar}>
      <div className={styles.searchBox}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button
            className={styles.clearBtn}
            onClick={() => setSearchTerm('')}
            title="清除搜索"
          >
            ✕
          </button>
        )}
      </div>

      <div className={styles.filterRow}>
        {filterKeys && Object.entries(filterKeys).map(([key, values]) => (
          <div key={key} className={styles.filterSelectWrapper}>
            <span className={styles.filterLabel}>{key}:</span>
            <select
              className={styles.filterSelect}
              value={activeFilters[key] || '__all__'}
              onChange={(e) => handleFilterChange(key, e.target.value)}
            >
              <option value="__all__">全部</option>
              {values.map((value: string) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        ))}

        {filterOptions && filterOptions.map(filter => {
          const values = [...new Set(data.map(item => String(item[filter.key])))]
          return (
            <div key={String(filter.key)} className={styles.filterSelectWrapper}>
              <span className={styles.filterLabel}>{filter.label}:</span>
              <select
                className={styles.filterSelect}
                value={activeFilters[String(filter.key)] || '__all__'}
                onChange={(e) => handleFilterChange(String(filter.key), e.target.value)}
              >
                <option value="__all__">{filter.allLabel || '全部'}</option>
                {values.map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          )
        })}

        {sortOptions && (
          <div className={styles.filterSelectWrapper}>
            <span className={styles.filterLabel}>排序:</span>
            <select
              className={styles.filterSelect}
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="__default__">默认排序</option>
              {sortOptions.map(option => (
                <option key={option.label} value={option.label}>{option.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
