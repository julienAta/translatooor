import { TranslatorMain } from "@/components/component/translator-main";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-28">
      <div className="text-center text-2xl font-bold">Translatoor</div>
      <TranslatorMain />
    </div>
  );
}
