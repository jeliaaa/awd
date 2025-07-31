export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-12 space-y-24">

      {/* Section 1: Introduction */}
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          We’re a passionate team dedicated to building meaningful digital experiences.
          With a focus on creativity, innovation, and functionality, we strive to bring ideas to life
          through intuitive design and powerful technology.
        </p>
      </section>

      {/* Section 2: Mission */}
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Our mission is to empower individuals and businesses with cutting-edge solutions
          that drive growth, inspire change, and make a positive impact on the world.
          Every line of code and pixel we craft is rooted in purpose and clarity.
        </p>
      </section>

      {/* Section 2: Mission */}
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h2>
        <div className="grid grid-cols-4 gap-5">

          {/* 5 */}
          <div className="group rounded-lg overflow-hidden cursor-pointer flex relative h-[400px] flex-col justify-start items-start">
            <img className="w-full h-full object-cover" src="https://picsum.photos/400/400" alt="200/300"/>
            <div className="absolute transition-all flex flex-col gap-2 items-start justify-start h-2/4 bottom-0 translate-y-full py-2 group-hover:translate-y-0 px-4 left-0 bg-gray-700/50 shadow-2xl backdrop-blur-3xl w-full">
              <h2 className="text-xl text-start">Name Surname</h2>
              <p className="text-sm text-start">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, culpa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, veritatis!</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
