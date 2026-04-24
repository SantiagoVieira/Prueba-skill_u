'use client';
import { useReputation }   from '@/hooks/useReputation';
import { ReviewForm }      from '@/components/reputation/ReviewForm';
import { ReviewList }      from '@/components/reputation/ReviewList';
import { ReputationBadge } from '@/components/reputation/ReputationBadge';

interface Props {
  sellerId:   string;
  sellerName: string;
  onClose:    () => void;
  onReviewed: () => void;
}

export function RateSellerModal({ sellerId, sellerName, onClose, onReviewed }: Props) {
  const { reputation, reviews, loading, submitting, error, hasReviewed, submitReview } =
    useReputation(sellerId);

  const handleSubmit = async (rating: number, comment?: string, isAnonymous?: boolean) => {
    const ok = await submitReview(rating, comment, isAnonymous);
    if (ok) onReviewed();
    return ok;
  };

  return (
    <div
      className="modal-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box" style={{ maxWidth: 560 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="modal-title">Calificar a {sellerName}</span>
            <ReputationBadge reputation={reputation} />
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {loading ? (
            <p style={{ fontSize: 13, color: 'var(--gray-400)', textAlign: 'center', padding: '20px 0' }}>
              Cargando…
            </p>
          ) : (
            <>
              {!hasReviewed && (
                <ReviewForm
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  error={error}
                />
              )}

              {hasReviewed && (
                <div style={{
                  background: '#f0fdf4', border: '1px solid #86efac',
                  borderRadius: 10, padding: '12px 16px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  marginBottom: 4,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p style={{ fontSize: 13, color: '#15803d', margin: 0, fontWeight: 600 }}>
                    Ya dejaste una reseña a este vendedor.
                  </p>
                </div>
              )}

              {/* Reseñas existentes */}
              {reviews.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <p style={{
                    fontSize: 12, fontWeight: 600, color: 'var(--gray-500)',
                    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10,
                  }}>
                    Reseñas de otros compradores
                  </p>
                  <ReviewList reputation={reputation} reviews={reviews} />
                </div>
              )}
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