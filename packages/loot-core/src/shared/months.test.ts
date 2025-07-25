import * as monthUtils from './months';

test('range returns a full range', () => {
  expect(monthUtils.range('2016-10', '2018-01')).toMatchSnapshot();
});

describe('bounds function with pay period logic', () => {
  test('normal case: 15th to 14th', () => {
    // January 2024: 15th is Monday, normal case
    const result = monthUtils.bounds('2024-01');
    expect(result).toEqual({
      start: 20240115, // January 15th, 2024
      end: 20240214,   // February 14th, 2024
    });
  });

  test('Sunday adjustment: 13th to 14th when 15th is Sunday', () => {
    // September 2024: 15th is Sunday, payday moves to 13th (Friday)
    // October 2024: 15th is Tuesday, payday stays on 15th
    // Period runs Sep 13 to Oct 14 (day before Oct 15 payday)
    const result = monthUtils.bounds('2024-09');
    expect(result).toEqual({
      start: 20240913, // September 13th, 2024 (Friday)
      end: 20241014,   // October 14th, 2024 (day before Oct 15)
    });
  });

  test('Saturday adjustment: 14th to 14th when 15th is Saturday', () => {
    // November 2025: 15th is Saturday, payday moves to 14th (Friday)  
    // December 2025: 15th is Monday, payday stays on 15th
    // Period runs Nov 14 to Dec 14 (day before Dec 15 payday)
    const result = monthUtils.bounds('2025-11');
    expect(result).toEqual({
      start: 20251114, // November 14th, 2025 (Friday)
      end: 20251214,   // December 14th, 2025 (day before Dec 15)
    });
  });

  test('consecutive periods align correctly (Oct-Nov 2025 example)', () => {
    // October 2025: normal case, ends day before November payday
    const oct2025 = monthUtils.bounds('2025-10');
    const nov2025 = monthUtils.bounds('2025-11');
    
    expect(oct2025).toEqual({
      start: 20251015, // October 15th, 2025 (Wednesday)
      end: 20251113,   // November 13th, 2025 (day before Nov 14 payday)
    });
    
    expect(nov2025).toEqual({
      start: 20251114, // November 14th, 2025 (Friday - Saturday adjustment)
      end: 20251214,   // December 14th, 2025 (day before Dec 15 payday)
    });
    
    // Verify periods connect: Oct ends Nov 13, Nov starts Nov 14
    expect(oct2025.end + 1).toBe(nov2025.start);
  });

  test('year boundary with Sunday adjustment', () => {
    // December 2024: 15th is Sunday, payday moves to 13th (Friday)
    // January 2025: 15th is Wednesday, payday stays on 15th
    // Period runs Dec 13 to Jan 14 (day before Jan 15 payday)
    const result = monthUtils.bounds('2024-12');
    expect(result).toEqual({
      start: 20241213, // December 13th, 2024 (Friday, due to Sunday adjustment)
      end: 20250114,   // January 14th, 2025 (day before Jan 15)
    });
  });

  test('another normal case', () => {
    // March 2024: 15th is Friday, normal case
    const result = monthUtils.bounds('2024-03');
    expect(result).toEqual({
      start: 20240315, // March 15th, 2024
      end: 20240414,   // April 14th, 2024
    });
  });

  test('Japanese holiday adjustment: 15th on Respect for the Aged Day', () => {
    // September 2025: 15th is Respect for the Aged Day (Monday holiday)
    // Should move to previous Friday (September 12th)
    // October 2025: 15th is Wednesday (normal working day)
    const result = monthUtils.bounds('2025-09');
    expect(result).toEqual({
      start: 20250912, // September 12th, 2025 (Friday, holiday adjustment)
      end: 20251014,   // October 14th, 2025 (day before Oct 15 payday)
    });
  });

  test('Normal case after holiday period', () => {
    // January 2026: 15th is Thursday (normal working day, not a holiday)
    const result = monthUtils.bounds('2026-01');
    expect(result).toEqual({
      start: 20260115, // January 15th, 2026 (Thursday, normal)
      end: 20260214,   // February 14th, 2026 (day before Feb 15)
    });
  });
});
