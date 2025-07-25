import * as d from 'date-fns';
import type { Locale } from 'date-fns';
import * as monthUtils from './months';

type DateLike = string | Date;

/**
 * Get the period number (1-12) for a given month identifier
 * Period 1 = January's pay period (Jan 15 - Feb 14)
 * Period 2 = February's pay period (Feb 15 - Mar 14)
 * etc.
 */
export function getPeriodNumber(month: DateLike): number {
  const monthDate = monthUtils._parse(month);
  const monthIndex = monthDate.getMonth(); // 0-based (0 = January)
  return monthIndex + 1; // Convert to 1-based period number
}

/**
 * Format a period for display in constrained spaces
 * Returns "Period 1", "Period 2", etc.
 */
export function formatPeriodShort(month: DateLike): string {
  const periodNum = getPeriodNumber(month);
  return `Period ${periodNum}`;
}

/**
 * Format a period for display with more space
 * Returns the actual date range like "Jan 15 - Feb 14"
 */
export function formatPeriodRange(month: DateLike): string {
  const { start, end } = monthUtils.bounds(month);
  const startDate = d.parse(start.toString(), 'yyyyMMdd', new Date());
  const endDate = d.parse(end.toString(), 'yyyyMMdd', new Date());
  
  const startFormatted = d.format(startDate, 'MMM d');
  const endFormatted = d.format(endDate, 'MMM d');
  
  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Format a period for display with year context
 * Returns "Period 1 '24" or "Jan 15 - Feb 14 '24"
 */
export function formatPeriodWithYear(month: DateLike, useRange = false): string {
  const monthDate = monthUtils._parse(month);
  const year = d.format(monthDate, "'yy");
  
  if (useRange) {
    const range = formatPeriodRange(month);
    return `${range} ${year}`;
  } else {
    const periodNum = getPeriodNumber(month);
    return `Period ${periodNum} ${year}`;
  }
}

/**
 * Get a descriptive title for the period
 * Returns something like "Period 1 (Jan 15 - Feb 14, 2024)"
 */
export function getPeriodTitle(month: DateLike): string {
  const periodNum = getPeriodNumber(month);
  const { start, end } = monthUtils.bounds(month);
  const startDate = d.parse(start.toString(), 'yyyyMMdd', new Date());
  const endDate = d.parse(end.toString(), 'yyyyMMdd', new Date());
  
  const startFormatted = d.format(startDate, 'MMM d, yyyy');
  const endFormatted = d.format(endDate, 'MMM d, yyyy');
  
  return `Period ${periodNum} (${startFormatted} - ${endFormatted})`;
} 