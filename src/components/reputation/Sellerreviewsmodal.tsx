'use client';
import { useReputation } from '@/hooks/useReputation';
import { ReviewList }    from '@/components/reputation/ReviewList';
import { ReputationBadge } from '@/components/reputation/ReputationBadge';

interface Props {
  sellerId:   string;
  sellerName: string;
  onClose:    () => void;
}

export function SellerReviewsModal({ sellerId, sellerName, onClose }: Props) {
  const { reputation, reviews, loading } = useReputation(sellerId);

  return (
    <div
      className="modal-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box" style={{ maxWidth: 560 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="modal-title">Reseñas de {sellerName}</span>
            <ReputationBadge reputation={reputation} />
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {loading ? (
            <p style={{ fontSize: 13, color: 'var(--gray-400)', textAlign: 'center', padding: '20px 0' }}>
              Cargando reseñas…
            </p>
          ) : (
            <>
              {/* Aviso solo lectura */}
              <div style={{
                background: '#fff8e1', border: '1px solid #f59e0b',
                borderRadius: 8, padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: 8,
                marginBottom: 4,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p style={{ fontSize: 12, color: '#92400e', margin: 0 }}>
                  Para calificar a este vendedor, primero debes comprarle un material.
                  Podrás hacerlo desde <strong>Mis compras</strong>.
                </p>
              </div>

              <ReviewList reputation={reputation} reviews={reviews} />
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn-cancel" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}