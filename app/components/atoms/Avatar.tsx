export const Avatar = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="h-40 w-40 overflow-hidden rounded-full sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-52 lg:w-52 xl:h-56 xl:w-56 2xl:h-64 2xl:w-64">
        <img
          src="/avatar.jpg"
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};
