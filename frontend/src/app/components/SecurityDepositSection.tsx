import Image from "next/image";

export default function VerifiedListingsSection() {
  return (
    <div className="w-4/5 md:w-2/3 p-4 md:text-base md:px-20 rounded-xl md:py-8 border border-blue-500 mx-auto mb-6 flex flex-col md:flex-row items-center shadow-[0_0_20px_20px_rgba(59,130,246,0.1)]">
      <Image
        src="/images/icons/Headset.png"
        alt="Verification Medal"
        width={40}
        height={40}
        className="mr-4"
      />
      <p>
        <strong className="font-bold">24/7 Assistance:</strong> Whether it’s
        before, during, or after your move, our support team is here around the
        clock to help.
      </p>
    </div>
  );
}
