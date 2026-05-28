"use client";
import Image from "next/image";
import Button from "./Button";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const layout = [
  { className: "md:col-start-1 md:col-end-3 md:row-span-1" },
  { className: "md:col-start-3 md:col-end-4 md:row-span-1" },
  { className: "md:col-start-4 md:col-end-6 md:row-span-1" },
  { className: "md:col-start-6 md:col-end-7 md:row-span-1" },
  { className: "md:col-start-1 md:col-end-2 md:row-span-2" },
  { className: "md:col-start-2 md:col-end-4 md:row-span-2" },
  { className: "md:col-start-4 md:col-end-5 md:row-span-2" },
  { className: "md:col-start-5 md:col-end-7 md:row-span-2" },
];

const Gallery = ({ images = [] }) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  if (!images.length) return null;

  return (
    <>
      <section className="col-[content] grid py-20 md:py-27" id="galleri">
        <div className="grid w-full grid-cols-1 gap-4 md:max-h-[65vh] md:grid-cols-6 md:grid-rows-2">
          {images.map((img, index) => {
            const item = layout[index % layout.length];
            return (
              <button
                key={index}
                aria-label={`Åbn billede ${index + 1}`} //for accessibility
                onClick={() => handleOpen(index)}
                className={`${item.className} h-48 cursor-pointer overflow-hidden rounded-[20px] md:h-auto`}
              >
                <Image
                  src={img.src}
                  alt={img.alt || ""}
                  width={800}
                  height={600}
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </button>
            );
          })}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="max-h-[65vh] max-w-[70vw]! justify-center p-0 md:max-h-[75vh] md:max-w-[55vw]!"
            aria-describedby="gallery-description"
          >
            <DialogTitle className="hidden">Galleri</DialogTitle>
            <Carousel opts={{ startIndex: selectedIndex }}>
              <CarouselPrevious className="z-50 cursor-pointer rounded-full border-0 bg-(--button-dark) text-(--text-secondary) transition-transform hover:scale-[1.02] md:h-14 md:w-14" />
              <CarouselNext className="z-50 cursor-pointer rounded-full border-0 bg-(--button-dark) text-(--text-secondary) transition-transform hover:scale-[1.02] md:h-14 md:w-14" />

              <CarouselContent className="max-h-[65vh] max-w-[70vw] md:max-h-[75vh] md:max-w-[55vw]">
                {images.map((img, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={img.src}
                      alt={img.alt || ""}
                      width={800}
                      height={600}
                      className="h-full w-full rounded-[20px] object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};

export default Gallery;
