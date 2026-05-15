import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AddWishModalProps {
  onClose: () => void;
  onWishAdded: () => void;
}

export default function AddWishModal({ onClose, onWishAdded }: AddWishModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'travel' as const,
    owner: 'lindsey' as const,
    timeframe: 'medium' as const,
    status: 'not_started' as const,
    budget: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('wishes').insert([
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          owner: formData.owner,
          timeframe: formData.timeframe,
          status: formData.status,
          budget: formData.budget || null,
          notes: formData.notes || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
      onWishAdded();
    } catch (error) {
      console.error('Error adding wish:', error);
      alert('添加失败，请重试');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '1.5rem', color: '#5a4a6a' }}>✨ 添加新愿望</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>标题 *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="比如：去日本旅行"
            />
          </div>

          <div className="form-group">
            <label>描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="详细说明你的愿望..."
            />
          </div>

          <div className="form-group">
            <label>分类 *</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}>
              <option value="travel">🌍 旅行与冒险</option>
              <option value="lifestyle">💑 生活与家庭</option>
              <option value="growth">💼 自我成长</option>
              <option value="quality">💝 品质生活</option>
              <option value="other">🎯 其他梦想</option>
            </select>
          </div>

          <div className="form-group">
            <label>由谁提出 *</label>
            <select value={formData.owner} onChange={(e) => setFormData({ ...formData, owner: e.target.value as any })}>
              <option value="lindsey">Lindsey</option>
              <option value="lucia">Lucia</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="form-group">
            <label>时间跨度 *</label>
            <select value={formData.timeframe} onChange={(e) => setFormData({ ...formData, timeframe: e.target.value as any })}>
              <option value="short">短期 (1年内)</option>
              <option value="medium">中期 (1-5年)</option>
              <option value="long">长期 (5-10年)</option>
            </select>
          </div>

          <div className="form-group">
            <label>状态 *</label>
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}>
              <option value="not_started">未开始</option>
              <option value="planning">计划中</option>
              <option value="in_progress">进行中</option>
              <option value="completed">已完成</option>
            </select>
          </div>

          <div className="form-group">
            <label>预算（可选）</label>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="比如：1000-2000元"
            />
          </div>

          <div className="form-group">
            <label>备注（可选）</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="补充说明..."
            />
          </div>

          <div className="form-buttons">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              取消
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading || !formData.title}>
              {loading ? '添加中...' : '添加愿望'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
