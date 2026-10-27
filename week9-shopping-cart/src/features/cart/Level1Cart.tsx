import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, removeFromCart, clearCart } from './cartSlice';

export const Level1Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleAddLaptop = () => {
    dispatch(
      addToCart({
        id: 1,
        name: 'Laptop',
        price: 1000,
      })
    );
  };

  const handleAddMouse = () => {
    dispatch(
      addToCart({
        id: 2,
        name: 'Chuột không dây',
        price: 25,
      })
    );
  };

  const handleAddKeyboard = () => {
    dispatch(
      addToCart({
        id: 3,
        name: 'Bàn phím cơ',
        price: 80,
      })
    );
  };

  const handleRemoveProduct = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <h1>Giỏ Hàng Cơ Bản (Level 1)</h1>

      <div style={{ marginBottom: '16px' }}>
        <button onClick={handleAddLaptop} style={{ marginRight: '8px' }}>
          + Thêm Laptop ($1000)
        </button>
        <button onClick={handleAddMouse} style={{ marginRight: '8px' }}>
          + Thêm Chuột ($25)
        </button>
        <button onClick={handleAddKeyboard}>
          + Thêm Bàn Phím ($80)
        </button>
      </div>

      <h2>Sản phẩm trong giỏ ({cartItems.length})</h2>

      {cartItems.length === 0 ? (
        <p style={{ color: '#6c757d' }}>Giỏ hàng trống.</p>
      ) : (
        <div style={{ marginBottom: '16px' }}>
          {cartItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="item-row"
            >
              <span>
                <strong>{item.name}</strong> - ${item.price}
              </span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleRemoveProduct(item.id)}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <button className="btn btn-danger" onClick={() => dispatch(clearCart())}>
          Xóa Tất Cả
        </button>
      )}

      <div className="alert alert-info" style={{ marginTop: '20px' }}>
        <strong>Mục tiêu Level 1:</strong> Thêm sản phẩm vào giỏ (<code>addToCart</code>), xóa sản phẩm (<code>removeFromCart</code>), xem danh sách và xóa toàn bộ (<code>clearCart</code>).
      </div>
    </div>
  );
};
