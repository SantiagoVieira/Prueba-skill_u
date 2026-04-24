import { useState, useEffect, useCallback } from 'react';
import { SellerReview, SellerReputation } from '@/types/reputation';
import { supabase } from '@/lib/supabase';

export function useReputation(sellerId: string) {
  const [reputation,  setReputation]  = useState<SellerReputation | null>(null);
  const [reviews,     setReviews]     = useState<SellerReview[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    // Reputation via API
    const repRes = await fetch(`/api/reviews/reputation?seller_id=${sellerId}`);
    setReputation(repRes.ok ? await repRes.json() : null);

    // Reviews via RPC con SECURITY DEFINER (bypasses RLS)
    const { data: rows, error: rpcError } = await supabase
      .rpc('get_seller_reviews', { p_seller_id: sellerId });

    if (!rpcError && rows) {
      setReviews(
        rows.map((r: any) => ({
          id:           r.id,
          seller_id:    r.seller_id,
          reviewer_id:  r.reviewer_id,
          rating:       r.rating,
          comment:      r.comment,
          is_anonymous: r.is_anonymous,
          created_at:   r.created_at,
          reviewer: r.is_anonymous || (!r.reviewer_first_name && !r.reviewer_last_name)
            ? null
            : { first_name: r.reviewer_first_name, last_name: r.reviewer_last_name },
        }))
      );
    } else {
      setReviews([]);
    }

    // Verificar si el usuario actual ya reseñó a este vendedor
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('seller_reviews')
        .select('id')
        .eq('seller_id', sellerId)
        .eq('reviewer_id', user.id)
        .maybeSingle();
      setHasReviewed(!!data);
    }

    setLoading(false);
  }, [sellerId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const submitReview = async (rating: number, comment?: string, isAnonymous?: boolean) => {
    setSubmitting(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('Debes iniciar sesión para dejar una reseña');
      setSubmitting(false);
      return false;
    }

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        seller_id:    sellerId,
        rating,
        comment,
        reviewer_id:  user.id,
        is_anonymous: isAnonymous ?? false,
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error);
      setSubmitting(false);
      return false;
    }
    await fetchData();
    setSubmitting(false);
    return true;
  };

  return { reputation, reviews, loading, submitting, error, hasReviewed, submitReview };
}