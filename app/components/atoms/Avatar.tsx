/**
 * Avatar component
 *
 * @returns Avatar component
 */
export const Avatar = () => {
  return (
    <div className="h-48 w-48 overflow-hidden rounded-full sm:h-72 sm:w-72">
      <img
        src="/avatar.webp"
        alt="Avatar"
        className="h-full w-full object-cover"
      />
    </div>
  );
};
