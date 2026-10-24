import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="min-h-[85vh] pt-24 md:pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Top Breadcrumb / Status */}
      <div className="flex items-center justify-between pb-8 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
          >
            ← Back to Gallery
          </Link>
        </div>
        <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
          Profile & Practice
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 my-10 md:my-16 items-start">
        {/* Left Editorial Info */}
        <div className="lg:col-span-7 flex flex-col gap-8 md:gap-10">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.12] instrument text-neutral-900">
              I’m Masum Prajapati, a{' '}
              <span className="italic font-normal">creative developer</span> and{' '}
              <span className="italic font-normal">designer</span> focused on
              immersive digital spaces.
            </h1>
          </div>

          <div className="space-y-4 text-base md:text-lg text-neutral-700 font-light leading-relaxed outfit max-w-2xl">
            <p>
              I blend aesthetics and mathematics to craft visually striking
              websites, interactive animations, and dynamic 3D environments.
              My work explores the intersection of motion, WebGL, and Three.js
              to break free from traditional flat layouts.
            </p>
            <p>
              Every project is an endeavor to turn abstract concepts into
              living, tactile digital artifacts that respond organically to
              human curiosity.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="pt-6 border-t border-black/[0.06]">
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-6">
              Core Capabilities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-sm md:text-base outfit font-normal text-neutral-800">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span>3D & WebGL Experiences</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span>Custom GLSL Shaders</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span>Interactive Frontend Architecture</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span>Creative Direction & Motion</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="pt-6 border-t border-black/[0.06] flex flex-wrap gap-8 items-start">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-1.5">
                Inquiries
              </h4>
              <a
                href="mailto:pm04092005@gmail.com"
                className="text-base md:text-lg instrument font-medium hover:underline text-neutral-900"
              >
                pm04092005@gmail.com
              </a>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-1.5">
                Availability
              </h4>
              <p className="text-sm md:text-base outfit font-normal text-neutral-700">
                Available for selected commissions & collaborations
              </p>
            </div>
          </div>
        </div>

        {/* Right Portrait Column */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <div className="w-full max-w-sm sm:max-w-md bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-black/[0.06] transition-transform duration-500 hover:-translate-y-1">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-200">
              <img
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                src="https://images.unsplash.com/photo-1774606570918-aa9d70b2932b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Masum Prajapati Portrait"
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 px-1">
              <span className="outfit font-medium text-neutral-800">
                Masum Prajapati
              </span>
              <span className="instrument italic text-sm">2026 Studio Portrait</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About