import {
  lengthBetween,
  required,
  isBool,
  isString,
  isDate,
  nullable,
  notNull,
} from "../../deps.ts";
import { optionlaLengthBetween } from "../rules/rules.ts";
export interface Order {
  name: string;
  title: string;
  description?: string;
  done: boolean;
  color?: string;
  endDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export const orderSchema = {
  name: [lengthBetween(5, 100), isString, required],
  title: [lengthBetween(5, 100), required, isString],
  description: [isString, nullable],
  done: [isBool, required],
  color: [isString, nullable],
  endDate: [isDate, nullable],
  createdAt: [isDate, required],
  updatedAt: [isDate, nullable],
};

export type OrderrUpdate = Partial<Order>;

export const orderSchemaUpdate = {
  name: [notNull, optionlaLengthBetween(5, 50)],
  title: [notNull, optionlaLengthBetween(5, 50)],
  description: [isString, nullable],
  done: [notNull, isBool],
  color: [isString, nullable],
  endDate: [isDate, nullable],
  createdAt: [isDate],
  updatedAt: [isDate, nullable],
};
