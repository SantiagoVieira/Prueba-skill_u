import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/reviews?seller_id=xxx
export async function GET(req: NextRequest) {
  const sellerId = req.nextUrl.searchParams.get('seller_id');

  if (!sellerId) {
    return NextResponse.json({ error: 'seller_id requerido' }, { status: 400 });
  }

  // Fetch reviews
  const { data: reviewsRaw, error } = await supabase
    .from('seller_reviews')
    .select('*')
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!reviewsRaw || reviewsRaw.length === 0) return NextResponse.json([]);

  // Fetch profiles for non-anonymous reviews
  const reviewerIds = [...new Set(
    reviewsRaw
      .filter(r => !r.is_anonymous)
      .map(r => r.reviewer_id)
  )];

  let profilesMap: Record<string, { first_name: string; last_name: string }> = {};
  if (reviewerIds.length > 0) {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, first_name, last_name')
      .in('id', reviewerIds);
    if (profiles) {
      profilesMap = Object.fromEntries(profiles.map(p => [p.id, p]));
    }
  }

  const data = reviewsRaw.map(r => ({
    ...r,
    reviewer: r.is_anonymous ? null : (profilesMap[r.reviewer_id] ?? null),
  }));

  return NextResponse.json(data);
}

// POST /api/reviews
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { seller_id, rating, comment, reviewer_id, is_anonymous } = body;

  if (!reviewer_id) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  if (!seller_id || !rating) {
    return NextResponse.json({ error: 'seller_id y rating son requeridos' }, { status: 400 });
  }

  if (seller_id === reviewer_id) {
    return NextResponse.json({ error: 'No puedes reseñarte a ti mismo' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('seller_reviews')
    .insert({
      seller_id,
      reviewer_id,
      rating,
      comment,
      is_anonymous: is_anonymous ?? false,
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Ya dejaste una reseña a este vendedor' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}