/**
 * Background component
 *
 * @returns Background component
 */
export const Background = ({
  backgroundImageUrl,
}: {
  backgroundImageUrl: string;
}) => {
  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
};
