"use client";

import Slider from "./Slider";
import { useSliderReviewsQuery } from "@/entities/reviews/lib/use-slider-reviews";

export default function ReviewsBody() {
  const { data: reviews = [], isPending, isError } = useSliderReviewsQuery();

  if (isPending || isError) {
    return null;
  }

  if (reviews.length === 0) {
    return null;
  }

  return <Slider reviews={reviews} />;
}
