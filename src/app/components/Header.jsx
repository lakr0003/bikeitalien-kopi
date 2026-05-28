import { supabase } from "@/lib/supabase";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const { data: rejse, error } = await supabase.from("cykelrejser").select("*");

  if (error) {
    console.error(error);
  }
  return (
    <>
      <section className="col-[full] grid grid-cols-subgrid">
        <HeaderClient rejse={rejse} />
      </section>
    </>
  );
};

export default Header;
