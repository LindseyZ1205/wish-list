import type { Wish } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { Trash2 } from 'lucide-react';

interface WishCardProps {
  wish: Wish;
  onUpdate: () => void;
}

const timeframeLabels = {
  short: '短期 (1年内)',
  medium: '中期 (1-5年)',
  long: '长期 (5-10年)',
};

const statusLabels = {
  not_started: '未开始',
  planning: '计划中',
  in_progress: '进行中',
  completed: '已完成',
};

const statusColors: Record<string, string> = {
  not_started: '#f5d5f5',
  planning: '#f0d5f5',
  in_progress: '#e8b4e8',
  completed: '#d4a5d4',
};

export default function WishCard({ wish, onUpdate }: WishCardProps) {
  async function handleDelete() {
    if (confirm('确定要删除这个愿望吗？')) {
      try {
        await supabase.from('wishes').delete().eq('id', wish.id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting wish:', error);
      }
    }
  }

  const ownerDisplay = {
    lindsey: 'Lindsey',
    lucia: 'Lucia',
    both: 'Both',
  };

  return (
    <div className="wish-card" style={{ borderLeftColor: statusColors[wish.status], borderLeftWidth: '4px' }}>
      <div className="wish-header">
        <h3 className="wish-title">{wish.title}</h3>
        <button
          onClick={handleDelete}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#d4a5d4',
            padding: '0.5rem',
          }}
          title="删除"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <span className={`wish-owner owner-${wish.owner}`}>{ownerDisplay[wish.owner]}</span>

      {wish.description && <p className="wish-description">{wish.description}</p>}

      <div className="wish-meta">
        <span className="meta-tag">⏱️ {timeframeLabels[wish.timeframe]}</span>
        <span className="meta-tag">📊 {statusLabels[wish.status]}</span>
      </div>

      {wish.budget && <div className="meta-tag">💰 {wish.budget}</div>}

      {wish.notes && <div className="wish-notes">📝 {wish.notes}</div>}
    </div>
  );
}
