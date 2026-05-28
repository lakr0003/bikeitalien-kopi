import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumb = ({ current }) => {
  return (
    <nav aria-label="Breadcrumb" className="col-[content]">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-[var(--grey-400)] hover:underline">
            Forside
          </Link>
        </li>

        <li className="text-[var(--grey-400)]"><IoIosArrowForward /></li>

        <li>
          <Link
            href="/rejser"
            className="text-[var(--grey-400)] hover:underline"
          >
            Rejser
          </Link>
        </li>

        <li className="text-[var(--grey-400)]"><IoIosArrowForward /></li>

        <li className="font-medium text-[var(--text-primary)]">{current}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
