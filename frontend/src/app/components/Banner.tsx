export default function Banner() {

    return(
        <section className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
        <img
          src="/images/banner-friends.png"
          alt="Friends relaxing in a cozy space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div
          className="absolute inset-y-0 left-0 flex flex-col justify-center px-6 sm:px-10 max-w-md sm:max-w-lg"
          style={{
            color: "var(--foreground)",
          }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            A Lifestyle Tailored Just for You
          </h1>
          <p className="text-sm sm:text-lg text-gray-200">
            Discover a space that feels like home and a lifestyle that reflects
            who you are. From curated services to unique spaces, we offer more
            than just a place to live; we bring you a community.
          </p>
        </div>
      </section>
    );
};
