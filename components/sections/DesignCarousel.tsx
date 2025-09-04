"use client";

import React from "react";

type Props = {
  images: string[];
  title?: string;
  subtitle?: string;
};

export default function DesignCarousel({
  images,
  title = "Selected Designs",
  subtitle = "A rotating peek at some recent visuals",
}: Props) {
  const ring =
    images.length >= 6
      ? images
      : Array.from(
          { length: Math.max(6, images.length || 6) },
          (_, i) => images[i % Math.max(images.length, 1)]
        );

  return (
    <section className="carousel-section py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col items-center justify-center text-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="heading">{title}</h2>
          <p className="sub">{subtitle}</p>
        </div>

        {/* Carousel */}
        <div
          className="wrapper"
          style={
            {
              "--color-card": "0, 0, 0",
              "--quantity": ring.length,
            } as React.CSSProperties
          }
        >
          <div className="inner">
            {ring.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="card"
                style={{ "--index": i } as React.CSSProperties}
              >
                <img
                  className="img"
                  src={src}
                  alt={`Design ${i + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .heading {
          font-size: clamp(1.5rem, 1.1rem + 2vw, 2.5rem);
          font-weight: 700;
          line-height: 1.1;
        }
        .sub {
          opacity: 0.7;
          font-size: 0.95rem;
        }

        .wrapper {
          width: 100%;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          position: relative;
        }

        .inner {
          --w: 160px;
          --h: 220px;
          --translateZ: calc((var(--w) + var(--h)) + 0px);
          --rotateX: -12deg;
          --perspective: 1000px;
          width: var(--w);
          height: var(--h);
          transform-style: preserve-3d;
          animation: rotating 22s linear infinite;
        }

        @keyframes rotating {
          from {
            transform: perspective(var(--perspective)) rotateX(var(--rotateX))
              rotateY(0);
          }
          to {
            transform: perspective(var(--perspective)) rotateX(var(--rotateX))
              rotateY(1turn);
          }
        }

        .card {
          position: absolute;
          border: 2px solid rgba(var(--color-card), 0.15);
          border-radius: 14px;
          overflow: hidden;
          inset: 0;
          transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
            translateZ(var(--translateZ));
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 900px) {
          .inner {
            --w: 130px;
            --h: 180px;
          }
          .wrapper {
            min-height: 420px;
          }
        }
        @media (max-width: 600px) {
          .inner {
            --w: 110px;
            --h: 150px;
          }
          .wrapper {
            min-height: 380px;
          }
        }
      `}</style>
    </section>
  );
}
