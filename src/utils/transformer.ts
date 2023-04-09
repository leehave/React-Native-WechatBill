/**
 * Type transformer
 * @file Type 类型转换器
 * @module app/utils/transform
 */

export type ValueOf<T extends object> = T[keyof T]
