import Image from "next/image";

export default function VerifiedListingsSection() {
  return (
    <div className="w-4/5 md:w-2/3 p-10 text-[15px] md:text-base md:px-20 rounded-xl md:py-8 border border-blue-500 mx-auto mb-6 flex flex-col md:flex-row items-center justify-center shadow-[0_0_20px_20px_rgba(59,130,246,0.1)]">
      <Image
        src="/images/icons/Guarantee.png"
        alt="Verification Medal"
        width={60}
        height={60}
        className="mr-4 mb-4 md:mb-0"
      />
      <p className="text-center md:text-left">
        <strong className="font-bold">Verified Listings:</strong> Every property
        is thoroughly checked to ensure safety, quality, and reliability.
      </p>
    </div>
  );
}

