"use client";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const CategoryCard = ({ href, src, alt, label, description }) => {
  return (
    <Link
      href={href}
      scroll={false}
      onClick={() => window.scrollTo(0, 0)}
      className="group flex flex-col overflow-hidden rounded-[20px] bg-(--card-background) shadow-md"
    >
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <h6 className="font-bold transition-transform duration-200 group-hover:-translate-x-1">
            {label}
          </h6>
          <IoIosArrowForward
            size={22}
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>
        <p className="text-(--grey-400)">{description}</p>
      </div>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="h-auto w-full transition-transform duration-400 group-hover:scale-103"
      />
    </Link>
  );
};

export default CategoryCard;
