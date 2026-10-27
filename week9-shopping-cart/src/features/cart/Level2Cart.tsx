import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from './cartSlice';
import {
  selectCartItems,
  selectCartItemCount,
  selectSimpleCartTotal,
} from './cartSelectors';

export const Level2Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectSimpleCartTotal);
  const itemCount = useAppSelector(selectCartItemCount);

  const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 80 },
  ];

  return (
    <div>
      <h1>🛒 Giỏ Hàng Nâng Cao (Level 2)</h1>

      <h2>Danh Sách Sản Phẩm</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => dispatch(addToCart(product))}
          >
            + {product.name} (${product.price})
          </button>
        ))}
      </div>

      <h2>Giỏ Hàng ({itemCount} sản phẩm)</h2>

      {cartItems.length === 0 ? (
        <p style={{ color: '#6c757d' }}>Giỏ hàng trống</p>
      ) : (
        <>
          <div style={{ marginBottom: '16px' }}>
            {cartItems.map((item) => (
              <div key={item.id} className="item-row">
                <span>
                  <strong>{item.name}</strong> x {item.quantity} = ${item.price * item.quantity}
                </span>

                <div>
                  <button
                    className="btn btn-sm"
                    style={{ marginRight: '4px' }}
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{ marginRight: '8px' }}
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <hr />
          <h3>Tổng Cộng: ${totalPrice.toFixed(2)}</h3>

          <button className="btn btn-danger" onClick={() => dispatch(clearCart())}>
            Xóa Tất Cả
          </button>
        </>
      )}

      <div className="alert alert-info" style={{ marginTop: '20px' }}>
        <strong>Mục tiêu Level 2:</strong> Xử lý số lượng (nếu có thì tăng số lượng thay vì thêm trùng), tăng/giảm số lượng, tính tổng số lượng (<code>selectCartItemCount</code>) và tổng tiền (<code>selectCartTotal</code>) qua Selectors.
      </div>
    </div>
  );
};
