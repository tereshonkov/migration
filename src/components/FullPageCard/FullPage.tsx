"use client";
import styles from "./FullPage.module.css";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PopapSell from "./PopapSell/Popap";

type Review = {
  id?: string;
  name: string;
  text: string;
  productId: string;
  isApproved?: boolean;
};

type Images = {
  url: string;
  id: string;
  isCover: boolean;
  productId: string;
  reviewId: string | null;
};

type Data = {
  id: string;
  title: string;
  description: string;
  color: string;
  furnitures: string;
  images: Images[];
  width?: number;
  height?: number;
  rating?: number;
  category?: "KITCHEN" | "WARDROBE" | "STORE" | "BEDROOM";
  reviews?: Review[];
};

export default function FullPage({ id }: { id: string }) {
  const t = useTranslations(`data_${id}`);
  const t2 = useTranslations("fullPage");
  const t3 = useTranslations("modal");
  const [data, setData] = useState<Data | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [popap, setPopap] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  const sendReview = async (
    e: React.MouseEvent<HTMLButtonElement>,
    review: Review
  ) => {
    e.preventDefault();
    try {
      await toast.promise(
        (async () => {
          const res = await fetch(
            "https://t-mebel.onrender.com/reviews/create-review",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(review),
            }
          );

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `Ошибка ${res.status}`);
          }
          setModalOpen(false);
          return res.json();
        })(),
        {
          loading: "Отправка отзыва...",
          success: "Отзыв отправлен и будет показан после проверки!",
          error: (err: unknown) =>
            `Ошибка при отправке отзыва: ${(err as Error).message}`,
        }
      );
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://t-mebel.onrender.com/product/product/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const items: Data = await response.json();
        // const item = items.find((item) => item.id === id);
        if (items) {
          setData(items);
        } else {
          console.error(`Item with id ${id} not found`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [review, setReview] = useState<Review>({
    name: "",
    text: "",
    productId: id,
    isApproved: false,
  });

  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.back}>
          <Button
            sx={{
              mb: 2,
              width: { xs: "100%", sm: 200 },
              ml: { xs: 0, sm: 8 },
              border: "2px solid #422313",
              color: "#422313",
              borderRadius: "15px",
            }}
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
          >
            Назад
          </Button>
        </div>
        <div className={styles.slider}>
          <div className={styles.emblaViewport} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {data?.images?.map((img) => (
                <div key={img?.id} className={styles.sliderMain}>
                  <Image
                    src={img?.url || ""}
                    alt={`${data?.title || ""} — меблі на замовлення Харків`}
                    width={1024}
                    height={768}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.track}>
            {data?.images.map((image, index) => (
              <div
                onClick={() => emblaApi?.scrollTo(index)}
                key={image.id}
                className={styles.trackItem}
              >
                <Image
                  src={image.url || ""}
                  alt={`${data?.title || ""} — меблі на замовлення Харків`}
                  width={1024}
                  height={768}
                />
              </div>
            ))}
          </div>

          <div className={styles.sliderBtns}>
            <button onClick={scrollPrev} className={styles.prev}></button>
            <button onClick={scrollNext} className={styles.next}></button>
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.heading}>
            <h2 className={styles.title}>
              {/* {data?.title} */}
              {t("title")}
            </h2>
            <div className={styles.stars}>
              <Image width={60} height={60} src="/star.svg" alt="" />
              <Image width={60} height={60} src="/star.svg" alt="" />
              <Image width={60} height={60} src="/star.svg" alt="" />
              <Image width={60} height={60} src="/star.svg" alt="" />
              <Image width={60} height={60} src="/star.svg" alt="" />
            </div>
          </div>
          <p className={styles.subtitle}>
            {/* {data?.description} */}
            {t("description")}
          </p>
          <p className={styles.width}>
            {/* {t2("size")}: {data?.width} x {data?.height} */}
          </p>
          <p className={styles.furnitures}>
            {t2("furniture")}: {data?.furnitures}
          </p>
          {isMobile ? (
            <Link className={styles.btn} href="tel:0671496741">
              {t2("phone")}
            </Link>
          ) : (
            <button onClick={() => setPopap(prev => !prev)}  className={styles.btn}>
              {t2("phone")}
            </button>
          )}
        </div>
      </section>
      <section className={styles.reviews}>
        {data?.reviews?.map((review, index) => (
          <div key={index} className={styles.review}>
            <div className={styles.reviewsHeading}>
              <h3 className={styles.name}>{review.name}</h3>
              <div className={styles.stars}>
                <Image width={60} height={60} src="/star.svg" alt="" />
                <Image width={60} height={60} src="/star.svg" alt="" />
                <Image width={60} height={60} src="/star.svg" alt="" />
                <Image width={60} height={60} src="/star.svg" alt="" />
                <Image width={60} height={60} src="/star.svg" alt="" />
              </div>
            </div>
            <p className={styles.body}>{review.text}</p>
          </div>
        ))}
        <div>
          <button
            onClick={() => setModalOpen((prev) => !prev)}
            className={styles.btn}
          >
            {t2("review")}
          </button>
        </div>
      </section>
      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              onClick={() => setModalOpen(false)}
              className={styles.closeBtn}
            >
              X
            </button>
            <h2>{t3("title")}</h2>
            <form className={styles.form}>
              <input
                value={review.name}
                onChange={(e) => setReview({ ...review, name: e.target.value })}
                type="text"
                placeholder={t3("name")}
                required
              />
              <textarea
                value={review.text}
                onChange={(e) => setReview({ ...review, text: e.target.value })}
                rows={6}
                placeholder={t3("review")}
                required
              ></textarea>
              <button
                onClick={(e) => sendReview(e, review)}
                type="submit"
                className={styles.btn}
              >
                {t3("submit")}
              </button>
            </form>
          </div>
        </div>
      )}
      {popap && <PopapSell isOpen={popap} setIsOpen={setPopap} />}
    </>
  );
}
