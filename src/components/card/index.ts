import Card from './Card'
import CardLay from './CardLay'

/**
 * Layout被定为any，调用是无法提示
 */
Card.Layout = CardLay

export { Card }

export * from './CardImg'

export * from './CardTag'
