import { Tour, formatDate, getSeatLabel, groupByCity } from '../utils/tour';

// Dữ liệu giả dùng để test
const mockTours: Tour[] = [
  {
    id: '1',
    name: 'Tour Nha Trang 1',
    city: 'Nha Trang',
    days: 3,
    price: 1000,
    seats: 5,
    departure: '2026-11-10',
    image: 'https://example.com/1.jpg',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Tour Đà Lạt 1',
    city: 'Đà Lạt',
    days: 2,
    price: 2000,
    seats: 0,
    departure: '2026-11-20',
    image: 'https://example.com/2.jpg',
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Tour Đà Lạt 2',
    city: 'Đà Lạt',
    days: 3,
    price: 3000,
    seats: 2,
    departure: '2026-11-05',
    image: 'https://example.com/3.jpg',
    isFavorite: false,
  },
];

describe('Câu 7a & 7b: Test Utils (tour.ts)', () => {
  // Câu 7a: Test groupByCity
  test('groupByCity: Đúng số nhóm, đúng thứ tự thành phố A -> Z và đúng thứ tự ngày departure tăng dần', () => {
    const result = groupByCity(mockTours);

    // 1. Kiểm tra số lượng nhóm
    expect(result.length).toBe(2);

    // 2. Kiểm tra thứ tự thành phố A -> Z ("Đà Lạt" đứng trước "Nha Trang")
    expect(result[0].title).toBe('Đà Lạt');
    expect(result[1].title).toBe('Nha Trang');

    // 3. Kiểm tra thứ tự ngày trong nhóm Đà Lạt (05/11/2026 đứng trước 20/11/2026)
    expect(result[0].data[0].id).toBe('3'); // Ngày 05/11
    expect(result[0].data[1].id).toBe('2'); // Ngày 20/11
  });

  // Câu 7b: Test formatDate & getSeatLabel
  test('formatDate: Chuyển "2026-11-05" thành "05/11/2026"', () => {
    expect(formatDate('2026-11-05')).toBe('05/11/2026');
  });

  test('getSeatLabel: Kiểm tra các giá trị biên 0, 3, 4', () => {
    expect(getSeatLabel(0)).toBe('Hết chỗ');
    expect(getSeatLabel(3)).toBe('Chỉ còn 3 chỗ');
    expect(getSeatLabel(4)).toBe('Còn 4 chỗ');
  });
});