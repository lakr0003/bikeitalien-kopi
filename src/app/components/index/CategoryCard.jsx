import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

const CategoryCard = ({ href, src, alt, label }) => {
  return (
    <a
      href={href}
      className="group relative aspect-4/3 overflow-hidden rounded-[20px]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-400 group-hover:scale-103"
      />
      <div className="absolute inset-0 bg-linear-to-t from-(--text-primary)/50 to-transparent" />
      <div className="absolute bottom-0 flex w-full items-center justify-between px-5 py-5">
        <h6 className="font-bold text-(--text-secondary)! transition-transform duration-200 group-hover:-translate-x-1">{label}</h6>
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          <IoIosArrowForward size={30} className="text-(--text-secondary)" />
        </span>
      </div>
    </a>
  );
};

export default CategoryCard;
