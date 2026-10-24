import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const PROJECTS = [
  {
    id: 0,
    title: "Solitude in Light",
    category: "Portrait Photography",
    year: "2024",
    role: "Art Direction & Spatial Capture",
    description:
      "A study in natural light and shadow, exploring the quiet moments between stillness and movement. Each frame was captured during golden hour, tracing the contours of solitude through a contemporary cinematic lens.",
    tags: ["Photography", "Portrait", "Fine Art", "Lighting"],
    heroImage:
      "https://images.unsplash.com/photo-1774606570918-aa9d70b2932b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0",
    gallery: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    ],
    wideImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 1,
    title: "Urban Cartography",
    category: "Architecture & Space",
    year: "2024",
    role: "Architectural Photography & Geometry",
    description:
      "Mapping the invisible grammar of contemporary cities — the way facades speak, streets breathe, and monolithic structures lean into each other like old friends. A structural visual language for the built environment.",
    tags: ["Architecture", "Urbanism", "Documentary", "Structure"],
    heroImage:
      "https://images.unsplash.com/photo-1774523195578-121a2d1da490?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    ],
    wideImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Chromatic Fields",
    category: "Abstract Colour Study",
    year: "2023",
    role: "Color Theory & Generative Art",
    description:
      "An immersive investigation into the emotional resonance of color as a primary subject. No physical objects, no overt narratives — only the raw physiological experience of chromatic tension, saturation, and release.",
    tags: ["Abstract", "Color Spectrum", "Installation", "Sensory"],
    heroImage:
      "https://images.unsplash.com/photo-1773772255047-74744067601e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    gallery: [
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
    ],
    wideImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Temporal Drift",
    category: "Long Exposure Series",
    year: "2023",
    role: "Experimental Motion Photography",
    description:
      "Time rendered tangible. Long exposures stretching fleeting fractions of seconds into luminous ribbons, transforming the ordinary chaos of nocturnal life into impressionistic, layered memory.",
    tags: ["Long Exposure", "Light Painting", "Nocturnal", "Kinetic"],
    heroImage:
      "https://images.unsplash.com/photo-1749303544314-cb8ec06223d5?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0",
    gallery: [
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    ],
    wideImage:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Verdant Systems",
    category: "Nature & Botany",
    year: "2022",
    role: "Botanical Research & Macro Study",
    description:
      "Nature conceptualized as algorithmic infrastructure. Botanical organisms examined through systems thinking — root topologies, branching hierarchies, and the ancient mathematical logic underpinning organic growth.",
    tags: ["Botany", "Ecosystems", "Morphology", "Macro"],
    heroImage:
      "https://images.unsplash.com/photo-1775119221769-6b0af28704ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    gallery: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop",
    ],
    wideImage:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Still Life, Moving",
    category: "Object & Materiality",
    year: "2022",
    role: "Material Exploration & Tactility",
    description:
      "Inanimate forms suspended mid-metamorphosis. A contemporary re-examination of classical still life — examining raw textural grain, reflection, and the quiet tension of materials enduring time.",
    tags: ["Materiality", "Sculpture", "Still Life", "Tactile"],
    heroImage:
      "https://images.unsplash.com/photo-1775563655673-c28ac3802166?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0",
    gallery: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    ],
    wideImage:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=1600&auto=format&fit=crop",
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const parsedId = parseInt(id, 10);

  const isValidId = !isNaN(parsedId) && parsedId >= 0 && parsedId < PROJECTS.length;
  const detail = isValidId ? PROJECTS[parsedId] : null;
  const next = isValidId ? PROJECTS[(parsedId + 1) % PROJECTS.length] : PROJECTS[0];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  if (!detail) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 text-center">
        <h2 className="text-4xl instrument font-normal mb-4">Project Not Found</h2>
        <p className="text-neutral-600 mb-8 max-w-md outfit">
          The requested project piece could not be located in the current collection.
        </p>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-sm outfit font-medium hover:bg-neutral-800 transition-colors"
        >
          Return to 3D Gallery
        </Link>
      </div>
    );
  }

  const formattedIndex = String(detail.id + 1).padStart(2, "0");
  const totalCount = String(PROJECTS.length).padStart(2, "0");

  return (
    <article className="pt-24 md:pt-32 pb-16 px-[3vw] w-full">
      {/* Top Breadcrumb and Index */}
      <div className="flex items-center justify-between pb-6 border-b border-black/[0.06]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
        >
          <span>←</span>
          <span>Back to Gallery</span>
        </Link>
        <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
          {formattedIndex} / {totalCount}
        </span>
      </div>

      {/* Project Header */}
      <header className="my-10 md:my-14">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl instrument font-normal leading-[1.05] text-neutral-950 mb-6">
          {detail.title}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-neutral-700 font-light outfit leading-relaxed max-w-4xl text-pretty">
          {detail.description}
        </p>
      </header>

      {/* Metadata Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 border-y border-black/[0.08] my-10">
        <div>
          <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-1.5">
            Category
          </h3>
          <p className="text-base md:text-lg outfit font-medium text-neutral-900">
            {detail.category}
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-1.5">
            Discipline
          </h3>
          <p className="text-base md:text-lg outfit font-medium text-neutral-900">
            {detail.role}
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-1.5">
            Year
          </h3>
          <p className="text-base md:text-lg outfit font-medium text-neutral-900">
            {detail.year}
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-1.5">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {detail.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full bg-white border border-black/[0.08] text-neutral-700 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mockups */}
      <div className="mockups my-[2vw]">
        <div className="firstImage h-screen w-full rounded-2xl overflow-hidden">
          <img
            className="h-full w-full object-cover rounded-2xl"
            src={detail.heroImage || detail.image}
            alt={detail.title}
          />
        </div>
        <div className="secondImage h-[120vh] w-full flex gap-[1.4rem] mt-[1.5rem]">
          <div className="leftImage h-full w-[50%] rounded-2xl overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-2xl"
              src={detail.gallery?.[0]}
              alt={`${detail.title} Detail 1`}
            />
          </div>
          <div className="rightImage h-full w-[50%] rounded-2xl overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-2xl"
              src={detail.gallery?.[1]}
              alt={`${detail.title} Detail 2`}
            />
          </div>
        </div>
        <div className="thirdImage h-[140vh] w-full mt-[1.5rem] rounded-2xl overflow-hidden">
          <img
            className="h-full w-full object-cover rounded-2xl"
            src={detail.wideImage}
            alt={`${detail.title} Panorama`}
          />
        </div>
      </div>

      {/* Next Project Teaser */}
      <section className="mt-20 pt-12">
        <Link
          to={`/project/${next.id}`}
          className="group block p-8 md:p-12 rounded-3xl bg-white transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                  Next Project
                </span>
                <span className="text-xs font-mono text-neutral-300">
                  0{(next.id + 1)} / {totalCount}
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl instrument font-normal text-neutral-900 group-hover:translate-x-2 transition-transform duration-300">
                {next.title} →
              </h2>
              <p className="text-sm md:text-base outfit text-neutral-500 font-normal">
                {next.category} • {next.year}
              </p>
            </div>

            {/* Cinematic Next Preview Window */}
            <div className="relative shrink-0 w-full sm:w-72 md:w-96 lg:w-[420px] aspect-[16/10] mt-3 sm:mt-0">

              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <img
                  src={next.heroImage}
                  alt={next.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Link>
      </section>
    </article>
  );
};

export default ProjectDetail;