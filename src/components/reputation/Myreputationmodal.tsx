'use client';
import { useReputation }   from '@/hooks/useReputation';
import { ReviewList }      from '@/components/reputation/ReviewList';
import { ReputationBadge } from '@/components/reputation/ReputationBadge';

interface Props {
  sellerId: string;
  onClose:  () => void;
}

export function MyReputationModal({ sellerId, onClose }: Props) {
  const { reputation, reviews, loading } = useReputation(sellerId);

  return (
    <div
      className="modal-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box" style={{ maxWidth: 580 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="modal-title">Mi reputación</span>
            <ReputationBadge reputation={reputation} />
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {loading ? (
            <p style={{ fontSize: 13, color: 'var(--gray-400)', textAlign: 'center', padding: '24px 0' }}>
              Cargando tu reputación…
            </p>
          ) : !reputation || reputation.total_reviews === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#fff8e1', margin: '0 auto 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f59e0b">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 6 }}>
                Aún no tienes reseñas
              </p>
              <p style={{ fontSize: 12, color: 'var(--gray-400)', lineHeight: 1.6 }}>
                Cuando tus compradores te califiquen,<br />sus reseñas aparecerán aquí.
              </p>
            </div>
          ) : (
            <ReviewList reputation={reputation} reviews={reviews} />
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn-cancel" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}