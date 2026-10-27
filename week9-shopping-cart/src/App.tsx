import { useState } from 'react';
import { Navbar, type MainTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { Level1Cart } from './features/cart/Level1Cart';
import { Level2Cart } from './features/cart/Level2Cart';
import { Level3Cart } from './features/cart/Level3Cart';
import { Lesson1Selectors } from './features/lesson1-selectors/Lesson1Selectors';
import { Lesson2Thunk } from './features/lesson2-thunk/Lesson2Thunk';
import { Lesson3Crud } from './features/lesson3-crud/Lesson3Crud';
import { Lesson4RTKQuery } from './features/lesson4-rtk-query/Lesson4RTKQuery';
import { Lesson5TanStack } from './features/lesson5-tanstack/Lesson5TanStack';
import { TheoryGuide } from './features/docs/TheoryGuide';

export function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('cart-level1');

  return (
    <div className="container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {activeTab === 'cart-level1' && <Level1Cart />}
        {activeTab === 'cart-level2' && <Level2Cart />}
        {activeTab === 'cart-level3' && <Level3Cart />}
        {activeTab === 'lesson1' && <Lesson1Selectors />}
        {activeTab === 'lesson2' && <Lesson2Thunk />}
        {activeTab === 'lesson3' && <Lesson3Crud />}
        {activeTab === 'lesson4' && <Lesson4RTKQuery />}
        {activeTab === 'lesson5' && <Lesson5TanStack />}
        {activeTab === 'theory' && <TheoryGuide />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
