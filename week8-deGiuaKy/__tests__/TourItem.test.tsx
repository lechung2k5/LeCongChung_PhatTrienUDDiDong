import { fireEvent, render } from '@testing-library/react-native';
import TourItem from '../components/TourItem';
import { Tour } from '../utils/tour';

const mockTour: Tour = {
  id: 'tour-001',
  name: 'Đà Lạt Mộng Mơ cùng sinh viên A',
  city: 'Đà Lạt',
  days: 3,
  price: 3500000,
  seats: 5,
  departure: '2026-11-05',
  image: 'https://example.com/image.jpg',
  isFavorite: false,
};

describe('Câu 7c & 7d: Test Component TourItem', () => {
  const mockOnPress = jest.fn();
  const mockOnToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Câu 7c: Test bố cục
  test('Bố cục compact = true: Không hiển thị thành phố', () => {
    const { queryByText, getByText } = render(
      <TourItem
        tour={mockTour}
        compact={true}
        onPress={mockOnPress}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(getByText('Đà Lạt Mộng Mơ cùng sinh viên A')).toBeTruthy();
    expect(queryByText('Đà Lạt')).toBeNull(); // queryByText trả về null khi không tìm thấy
  });

  test('Bố cục compact = false: Có hiển thị thành phố', () => {
    const { getByText } = render(
      <TourItem
        tour={mockTour}
        compact={false}
        onPress={mockOnPress}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(getByText('Đà Lạt')).toBeTruthy();
  });

  // Câu 7d: Test sự kiện
  test('Bấm nút tim: onToggleFavorite được gọi 1 lần với (id, true), onPress không được gọi', () => {
    const { getByTestId } = render(
      <TourItem
        tour={mockTour}
        compact={false}
        onPress={mockOnPress}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const favBtn = getByTestId('fav-btn');
    fireEvent.press(favBtn);

    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockOnToggleFavorite).toHaveBeenCalledWith('tour-001', true);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  test('Bấm vào tên tour: onPress được gọi với cả object tour', () => {
    const { getByText } = render(
      <TourItem
        tour={mockTour}
        compact={false}
        onPress={mockOnPress}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const titleText = getByText('Đà Lạt Mộng Mơ cùng sinh viên A');
    fireEvent.press(titleText);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith(mockTour);
  });
});