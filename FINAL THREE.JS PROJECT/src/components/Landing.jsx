const Landing = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 px-4">
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="text-[2.75rem] sm:text-[3.75rem] md:text-[5rem] lg:text-[7.5rem] leading-[0.92] instrument font-normal text-neutral-500 tracking-normal">
         I'M
        </h1>
        <h1 className="text-[2.75rem] sm:text-[3.75rem] md:text-[5rem] lg:text-[7.5rem] leading-[0.92] instrument font-normal text-neutral-500 tracking-normal">
        DEVELOPER
        </h1>
        <h1 className="text-[2.75rem] sm:text-[3.75rem] md:text-[5rem] lg:text-[7.5rem] leading-[0.92] instrument font-normal text-neutral-500 tracking-normal">
          DESIGNER
        </h1>
      </div>
    </div>
  )
}

export default Landing