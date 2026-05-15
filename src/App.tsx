import { useEffect, useState } from 'react';
import { supabase, type Wish } from './lib/supabase';
import WishCard from './components/WishCard';
import AddWishModal from './components/AddWishModal';
import './App.css';
import { Plus } from 'lucide-react';

type Category = 'all' | 'travel' | 'lifestyle' | 'growth' | 'quality' | 'other';
type Owner = 'all' | 'lindsey' | 'lucia' | 'both';

const categoryLabels: Record<string, string> = {
  travel: '🌍 旅行与冒险',
  lifestyle: '💑 生活与家庭',
  growth: '💼 自我成长',
  quality: '💝 品质生活',
  other: '🎯 其他梦想',
};

function App() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedOwner, setSelectedOwner] = useState<Owner>('all');

  useEffect(() => {
    fetchWishes();
  }, []);

  async function fetchWishes() {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWishes(data || []);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleAddWish() {
    setShowModal(true);
  }

  function handleWishAdded() {
    setShowModal(false);
    fetchWishes();
  }

  const filteredWishes = wishes.filter((wish) => {
    const categoryMatch = selectedCategory === 'all' || wish.category === selectedCategory;
    const ownerMatch = selectedOwner === 'all' || wish.owner === selectedOwner;
    return categoryMatch && ownerMatch;
  });

  return (
    <div className="container">
      <div className="header">
        <h1>💭 我们的愿望清单</h1>
        <p>一起记录生活的梦想，一步步实现</p>
      </div>

      <div className="controls">
        <div className="filters">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            全部
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(key as Category)}
            >
              {label}
            </button>
          ))}
        </div>
        <button className="add-btn" onClick={handleAddWish}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          新愿望
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <span style={{ marginRight: '1rem', color: '#7a6a8a' }}>由谁提出：</span>
        {['all', 'lindsey', 'lucia', 'both'].map((owner) => (
          <button
            key={owner}
            className={`filter-btn ${selectedOwner === owner ? 'active' : ''}`}
            onClick={() => setSelectedOwner(owner as Owner)}
            style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
          >
            {owner === 'all' ? '全部' : owner === 'lindsey' ? 'Lindsey' : owner === 'lucia' ? 'Lucia' : 'Both'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="empty-state">
          <div className="empty-state-emoji">⏳</div>
          <p>加载中...</p>
        </div>
      ) : filteredWishes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-emoji">✨</div>
          <h2>还没有愿望呢</h2>
          <p>点击上面的"新愿望"按钮，开始记录你们的梦想吧！</p>
        </div>
      ) : (
        <div className="wishes-grid">
          {filteredWishes.map((wish) => (
            <WishCard key={wish.id} wish={wish} onUpdate={fetchWishes} />
          ))}
        </div>
      )}

      {showModal && <AddWishModal onClose={() => setShowModal(false)} onWishAdded={handleWishAdded} />}
    </div>
  );
}

export default App;
