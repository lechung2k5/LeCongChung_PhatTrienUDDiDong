export type MainTab =
  | 'cart-level1'
  | 'cart-level2'
  | 'cart-level3'
  | 'lesson1'
  | 'lesson2'
  | 'lesson3'
  | 'lesson4'
  | 'lesson5'
  | 'theory';

export interface NavbarProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
}

export const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  return (
    <nav className="nav-tabs">
      <button
        className={`nav-tab-btn ${activeTab === 'cart-level1' ? 'active' : ''}`}
        onClick={() => setActiveTab('cart-level1')}
      >
        Level 1 (Cơ Bản)
      </button>
      <button
        className={`nav-tab-btn ${activeTab === 'cart-level2' ? 'active' : ''}`}
        onClick={() => setActiveTab('cart-level2')}
      >
        Level 2 (Nâng Cao)
      </button>
      <button
        className={`nav-tab-btn ${activeTab === 'cart-level3' ? 'active' : ''}`}
        onClick={() => setActiveTab('cart-level3')}
      >
        Level 3 (Chuyên Nghiệp)
      </button>

      <span style={{ borderLeft: '1px solid #ced4da', margin: '0 4px' }} />

      <button
        className={`nav-tab-btn ${activeTab === 'lesson1' ? 'active' : ''}`}
        onClick={() => setActiveTab('lesson1')}
      >
        Bài 1: Selector
      </button>
      <button
        className={`nav-tab-btn ${activeTab === 'lesson2' ? 'active' : ''}`}
        onClick={() => setActiveTab('lesson2')}
      >
        Bài 2: AsyncThunk
      </button>
      <button
        className={`nav-tab-btn ${activeTab === 'lesson3' ? 'active' : ''}`}
        onClick={() => setActiveTab('lesson3')}
      >
        Bài 3: CRUD
      </button>
      <button
        className={`nav-tab-btn ${activeTab === 'lesson4' ? 'active' : ''}`}
        onClick={() => setActiveTab('lesson4')}
      >
        Bài 4: RTK Query
      </button>
      <button
        className={`nav-tab-btn ${activeTab === 'lesson5' ? 'active' : ''}`}
        onClick={() => setActiveTab('lesson5')}
      >
        Bài 5: TanStack Query
      </button>

      <span style={{ borderLeft: '1px solid #ced4da', margin: '0 4px' }} />

      <button
        className={`nav-tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
        onClick={() => setActiveTab('theory')}
      >
        Lý Thuyết &amp; Tóm Tắt
      </button>
    </nav>
  );
};
