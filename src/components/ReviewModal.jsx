import React, { useState } from 'react';
import { X, Star, ThumbsUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ReviewModal({ isOpen, onClose, worker }) {
  const { addReview } = useApp();

  const [quality, setQuality] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [professionalism, setProfessionalism] = useState(5);
  const [timeliness, setTimeliness] = useState(5);
  const [comment, setComment] = useState('');

  if (!isOpen || !worker) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(worker.id, {
      quality: Number(quality),
      communication: Number(communication),
      professionalism: Number(professionalism),
      timeliness: Number(timeliness),
      comment: comment || 'Exceptional work delivered on time with great attention to detail.'
    });
    onClose();
  };

  const avg = ((Number(quality) + Number(communication) + Number(professionalism) + Number(timeliness)) / 4).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 p-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Review & Rate Freelancer</h3>
            <p className="text-xs text-slate-500">Provide multi-category audit feedback for {worker.name}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <RatingSelector label="Deliverable Quality" value={quality} onChange={setQuality} />
            <RatingSelector label="Communication & Agility" value={communication} onChange={setCommunication} />
            <RatingSelector label="Professionalism" value={professionalism} onChange={setProfessionalism} />
            <RatingSelector label="Timeliness & Deadlines" value={timeliness} onChange={setTimeliness} />
          </div>

          <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl flex items-center justify-between">
            <div className="text-xs">
              <span className="font-semibold text-brand-900">Overall Calculated Rating</span>
              <p className="text-[11px] text-brand-700">Average across the 4 verified criteria</p>
            </div>
            <div className="flex items-center gap-1 text-brand-700 font-bold text-lg">
              <Star className="w-5 h-5 fill-brand-500 text-brand-500" />
              <span>{avg}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Feedback Comment</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your collaboration, strengths, and outcome..."
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition flex items-center gap-1.5"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              Publish Verified Review
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

function RatingSelector({ label, value, onChange }) {
  return (
    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
      <label className="block font-semibold text-slate-700 mb-1">{label}</label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 hover:scale-110 transition"
          >
            <Star
              className={`w-4 h-4 ${
                star <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-1 font-bold text-slate-800">{value}.0</span>
      </div>
    </div>
  );
}
