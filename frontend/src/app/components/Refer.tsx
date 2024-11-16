export default function Refer() {
    return(
        <section
        className="relative w-full h-[300px] sm:h-[400px] overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground) ",
        }}
      >
        <img
          src="/images/refer.png"
          alt="Refer and Earn"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Refer and Earn</h2>
          <p className="text-sm sm:text-lg mb-6">
            Share the joy of premium living! Refer your friends to join, and for
            every successful referral, receive exclusive rewards.
          </p>
          <ul className="text-sm sm:text-lg list-disc list-inside">
            <li>Sign up and get your unique referral link</li>
            <li>Share with friends who are looking for a new home</li>
            <li>Earn rewards for each successful referral</li>
          </ul>
        </div>
      </section>
    );
}